import { useGameStore } from '@/hooks/useGameStore';
import { GAMES } from '@/data/games';
import { Trophy, Lock, Star, BookOpen, Zap } from 'lucide-react';

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (store: ReturnType<typeof useGameStore>['store']) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first_step',
    name: '初入剧场',
    description: '完成任意一个故事的第一个选择',
    icon: '🎭',
    condition: (store) => Object.keys(store.saves).length > 0,
    rarity: 'common',
  },
  {
    id: 'first_ending',
    name: '命运初探',
    description: '收集到第一个结局',
    icon: '📖',
    condition: (store) => store.endings.length >= 1,
    rarity: 'common',
  },
  {
    id: 'rainy_complete',
    name: '雨夜侦探',
    description: '完成《雨夜来电》任意结局',
    icon: '🌧️',
    condition: (store) => store.endings.some(e => e.gameId === 'rainy-night'),
    rarity: 'rare',
  },
  {
    id: 'branch_hunter',
    name: '分支猎手',
    description: '累计收集 5 个不同结局',
    icon: '🧭',
    condition: (store) => store.endings.length >= 5,
    rarity: 'rare',
  },
  {
    id: 'secret_finder',
    name: '暗门发现者',
    description: '收集任意一个隐藏结局',
    icon: '🔮',
    condition: (store) => store.endings.some(ending => {
      const game = GAMES.find(item => item.id === ending.gameId);
      return game?.endings.some(item => item.id === ending.endingId && item.type === 'secret');
    }),
    rarity: 'rare',
  },
  {
    id: 'deep_sea_complete',
    name: '深海幸存者',
    description: '完成《深海余烬》任意结局',
    icon: '🌊',
    condition: (store) => store.endings.some(e => e.gameId === 'deep-sea'),
    rarity: 'rare',
  },
  {
    id: 'all_games',
    name: '剧场常客',
    description: '完成所有已发布的故事',
    icon: '🏆',
    condition: (store) => GAMES.every(g => store.endings.some(e => e.gameId === g.id)),
    rarity: 'epic',
  },
  {
    id: 'ten_endings',
    name: '命运收藏家',
    description: '累计收集 10 个不同结局',
    icon: '🌟',
    condition: (store) => store.endings.length >= 10,
    rarity: 'epic',
  },
  {
    id: 'rainy_all_endings',
    name: '雨夜全解',
    description: '收集《雨夜来电》所有结局',
    icon: '⚡',
    condition: (store) => {
      const game = GAMES.find(g => g.id === 'rainy-night');
      if (!game) return false;
      return game.endings.every(e => store.endings.some(se => se.gameId === 'rainy-night' && se.endingId === e.id));
    },
    rarity: 'epic',
  },
  {
    id: 'deep_sea_all_endings',
    name: '深渊探索者',
    description: '收集《深海余烬》所有结局',
    icon: '🔬',
    condition: (store) => {
      const game = GAMES.find(g => g.id === 'deep-sea');
      if (!game) return false;
      return game.endings.every(e => store.endings.some(se => se.gameId === 'deep-sea' && se.endingId === e.id));
    },
    rarity: 'epic',
  },
  {
    id: 'all_endings',
    name: '命运编织者',
    description: '收集所有故事的全部结局',
    icon: '✨',
    condition: (store) => {
      return GAMES.every(game =>
        game.endings.every(e => store.endings.some(se => se.gameId === game.id && se.endingId === e.id))
      );
    },
    rarity: 'legendary',
  },
];

const rarityConfig = {
  common: { label: '普通', color: 'oklch(0.65 0.02 80)', bg: 'oklch(0.14 0.015 260)' },
  rare: { label: '稀有', color: 'oklch(0.55 0.18 220)', bg: 'oklch(0.12 0.02 220)' },
  epic: { label: '史诗', color: 'oklch(0.55 0.18 290)', bg: 'oklch(0.12 0.02 290)' },
  legendary: { label: '传说', color: 'oklch(0.72 0.12 75)', bg: 'oklch(0.12 0.02 75)' },
};

export default function Achievements() {
  const { store } = useGameStore();

  const unlockedCount = ACHIEVEMENT_DEFS.filter(a => a.condition(store)).length;
  const totalCount = ACHIEVEMENT_DEFS.length;

  return (
    <div className="min-h-screen container py-10">
      {/* 标题 */}
      <div className="mb-10">
        <h1 className="font-serif-sc text-3xl font-bold text-foreground mb-2">成就系统</h1>
        <p className="text-muted-foreground text-sm">追踪你的探索足迹与特殊成就</p>
        <div className="divider-gold max-w-xs mt-4" />
      </div>

      {/* 总览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Trophy, label: '已解锁成就', value: `${unlockedCount}/${totalCount}`, color: 'oklch(0.72 0.12 75)' },
          { icon: BookOpen, label: '完成故事', value: `${GAMES.filter(g => store.endings.some(e => e.gameId === g.id)).length}/${GAMES.length}`, color: 'oklch(0.60 0.15 145)' },
          { icon: Star, label: '收集结局', value: `${store.endings.length}/${GAMES.reduce((a, g) => a + g.endings.length, 0)}`, color: 'oklch(0.55 0.18 220)' },
          { icon: Zap, label: '游玩次数', value: Object.keys(store.saves).length, color: 'oklch(0.55 0.18 290)' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-xl font-bold text-foreground font-cinzel">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* 进度条 */}
      <div className="bg-card border border-border rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">总体进度</span>
          <span className="text-sm text-primary font-cinzel">{Math.round(unlockedCount / totalCount * 100)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${unlockedCount / totalCount * 100}%`,
              background: 'linear-gradient(90deg, oklch(0.72 0.12 75), oklch(0.82 0.10 80))',
            }}
          />
        </div>
      </div>

      {/* 成就列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENT_DEFS.map((achievement, index) => {
          const unlocked = achievement.condition(store);
          const rarity = rarityConfig[achievement.rarity];

          return (
            <div
              key={achievement.id}
              className="bg-card border rounded-xl p-5 transition-all animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.05}s`,
                borderColor: unlocked ? `${rarity.color}40` : 'oklch(0.22 0.02 260)',
                background: unlocked ? rarity.bg : 'oklch(0.11 0.015 260)',
              }}
            >
              <div className="flex items-start gap-4">
                {/* 图标 */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 relative"
                  style={{
                    background: unlocked ? `${rarity.color}20` : 'oklch(0.14 0.015 260)',
                    border: `1px solid ${unlocked ? rarity.color + '40' : 'oklch(0.22 0.02 260)'}`,
                    filter: unlocked ? 'none' : 'grayscale(1) opacity(0.4)',
                  }}
                >
                  {unlocked ? achievement.icon : <Lock size={18} className="text-muted-foreground/40" />}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-medium text-sm"
                      style={{ color: unlocked ? rarity.color : 'oklch(0.45 0.015 80)' }}
                    >
                      {achievement.name}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        color: rarity.color,
                        background: `${rarity.color}15`,
                        opacity: unlocked ? 1 : 0.5,
                      }}
                    >
                      {rarity.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {unlocked ? achievement.description : '???'}
                  </p>
                  {unlocked && store.achievements.find(a => a.achievementId === achievement.id) && (
                    <p className="text-[10px] text-muted-foreground/60 mt-1.5">
                      {new Date(store.achievements.find(a => a.achievementId === achievement.id)!.unlockedAt).toLocaleDateString('zh-CN')} 解锁
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
