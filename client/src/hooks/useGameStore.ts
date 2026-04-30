import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { getResolvedEndingId } from '@/data/story-registry';

export interface GameSaveData {
  gameId: string;
  currentNodeId: number;
  stats: Record<string, number>;
  history: number[];
  isCompleted: boolean;
  completedAt?: string;
  lastPlayedAt: string;
}

export interface CollectedEnding {
  gameId: string;
  endingId: string;
  endingName: string;
  collectedAt: string;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}

export interface GameStore {
  saves: Record<string, GameSaveData>;
  endings: CollectedEnding[];
  achievements: UnlockedAchievement[];
}

const STORE_KEY = 'infinite_theater_store';

function loadStore(): GameStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GameStore;
      const normalizedEndings = parsed.endings.map(ending => ({
        ...ending,
        endingId: getResolvedEndingId(ending.gameId, ending.endingId),
      }));
      const dedupedEndings = normalizedEndings.filter((ending, index, list) =>
        list.findIndex(item => item.gameId === ending.gameId && item.endingId === ending.endingId) === index,
      );
      return { ...parsed, endings: dedupedEndings };
    }
  } catch {}
  return { saves: {}, endings: [], achievements: [] };
}

function persistStore(store: GameStore) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {}
}

export function useGameStore() {
  const [store, setStore] = useState<GameStore>(loadStore);
  const { isAuthenticated } = useAuth();

  // 从数据库加载数据（登录后同步）
  const fullDataQuery = trpc.game.getFullData.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 30_000,
  });

  // 将数据库数据合并到本地 store
  useEffect(() => {
    if (!fullDataQuery.data) return;
    const { progress, endings, achievements: dbAchievements } = fullDataQuery.data;

    setStore(prev => {
      const merged: GameStore = { ...prev };

      // 合并进度（数据库优先）
      for (const p of progress) {
        const dbSave: GameSaveData = {
          gameId: p.gameId,
          currentNodeId: p.currentNodeId,
          stats: (p.stats as Record<string, number>) || {},
          history: (p.history as number[]) || [],
          isCompleted: p.isCompleted,
          completedAt: p.completedAt?.toISOString(),
          lastPlayedAt: p.updatedAt.toISOString(),
        };
        merged.saves = { ...merged.saves, [p.gameId]: dbSave };
      }

      // 合并结局（去重）
      const endingSet = new Set(prev.endings.map(e => `${e.gameId}:${e.endingId}`));
      const newEndings = [...prev.endings];
      for (const e of endings) {
        const resolvedEndingId = getResolvedEndingId(e.gameId, e.endingId);
        const key = `${e.gameId}:${resolvedEndingId}`;
        if (!endingSet.has(key)) {
          endingSet.add(key);
          newEndings.push({
            gameId: e.gameId,
            endingId: resolvedEndingId,
            endingName: e.endingName || '',
            collectedAt: e.collectedAt.toISOString(),
          });
        }
      }
      merged.endings = newEndings;

      // 合并成就（去重）
      const achSet = new Set(prev.achievements.map(a => a.achievementId));
      const newAchs = [...prev.achievements];
      for (const a of dbAchievements) {
        if (!achSet.has(a.achievementId)) {
          achSet.add(a.achievementId);
          newAchs.push({
            achievementId: a.achievementId,
            unlockedAt: a.unlockedAt.toISOString(),
          });
        }
      }
      merged.achievements = newAchs;

      persistStore(merged);
      return merged;
    });
  }, [fullDataQuery.data]);

  // tRPC mutations
  const saveProgressMutation = trpc.game.saveProgress.useMutation();
  const collectEndingMutation = trpc.game.collectEnding.useMutation();
  const unlockAchievementMutation = trpc.game.unlockAchievement.useMutation();

  const updateStore = useCallback((updater: (prev: GameStore) => GameStore) => {
    setStore(prev => {
      const next = updater(prev);
      persistStore(next);
      return next;
    });
  }, []);

  // 保存游戏进度
  const saveProgress = useCallback((data: GameSaveData) => {
    updateStore(prev => ({
      ...prev,
      saves: { ...prev.saves, [data.gameId]: { ...data, lastPlayedAt: new Date().toISOString() } },
    }));
    // 同步到数据库
    if (isAuthenticated) {
      saveProgressMutation.mutate({
        gameId: data.gameId,
        currentNodeId: data.currentNodeId,
        stats: data.stats,
        history: data.history,
        isCompleted: data.isCompleted,
        completedAt: data.completedAt,
      });
    }
  }, [updateStore, isAuthenticated, saveProgressMutation]);

  // 获取游戏进度
  const getProgress = useCallback((gameId: string): GameSaveData | null => {
    return store.saves[gameId] ?? null;
  }, [store.saves]);

  // 清除游戏进度
  const clearProgress = useCallback((gameId: string) => {
    updateStore(prev => {
      const saves = { ...prev.saves };
      delete saves[gameId];
      return { ...prev, saves };
    });
  }, [updateStore]);

  // 记录收集结局
  const collectEnding = useCallback((gameId: string, endingId: string, endingName: string) => {
    updateStore(prev => {
      const exists = prev.endings.some(e => e.gameId === gameId && e.endingId === endingId);
      if (exists) return prev;
      return {
        ...prev,
        endings: [...prev.endings, { gameId, endingId, endingName, collectedAt: new Date().toISOString() }],
      };
    });
    // 同步到数据库
    if (isAuthenticated) {
      collectEndingMutation.mutate({ gameId, endingId, endingName });
    }
  }, [updateStore, isAuthenticated, collectEndingMutation]);

  // 获取游戏已收集结局
  const getCollectedEndings = useCallback((gameId: string): CollectedEnding[] => {
    return store.endings.filter(e => e.gameId === gameId);
  }, [store.endings]);

  // 解锁成就
  const unlockAchievement = useCallback((achievementId: string) => {
    updateStore(prev => {
      const exists = prev.achievements.some(a => a.achievementId === achievementId);
      if (exists) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, { achievementId, unlockedAt: new Date().toISOString() }],
      };
    });
    // 同步到数据库
    if (isAuthenticated) {
      unlockAchievementMutation.mutate({ achievementId });
    }
  }, [updateStore, isAuthenticated, unlockAchievementMutation]);

  // 检查游戏是否已完成（任意结局）
  const isGameCompleted = useCallback((gameId: string): boolean => {
    return store.endings.some(e => e.gameId === gameId);
  }, [store.endings]);

  // 检查游戏是否已解锁
  const isGameUnlocked = useCallback((gameId: string, unlockRequirement: string | null): boolean => {
    if (!unlockRequirement) return true;
    return isGameCompleted(unlockRequirement);
  }, [isGameCompleted]);

  return {
    store,
    saveProgress,
    getProgress,
    clearProgress,
    collectEnding,
    getCollectedEndings,
    unlockAchievement,
    isGameCompleted,
    isGameUnlocked,
  };
}
