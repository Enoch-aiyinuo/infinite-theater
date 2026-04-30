import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  upsertGameProgress,
  getGameProgress,
  getAllGameProgress,
  addEndingCollected,
  getEndingsCollected,
  addAchievement,
  getAchievements,
} from "../db";

export const gameRouter = router({
  // 保存/更新游戏进度
  saveProgress: protectedProcedure
    .input(z.object({
      gameId: z.string(),
      currentNodeId: z.number(),
      stats: z.record(z.string(), z.number()),
      history: z.array(z.number()),
      isCompleted: z.boolean(),
      completedAt: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await upsertGameProgress({
        userId: ctx.user.id,
        gameId: input.gameId,
        currentNodeId: input.currentNodeId,
        stats: input.stats,
        history: input.history,
        isCompleted: input.isCompleted,
        completedAt: input.completedAt ? new Date(input.completedAt) : undefined,
      });
      return { success: true };
    }),

  // 获取单个游戏进度
  getProgress: protectedProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, input }) => {
      return getGameProgress(ctx.user.id, input.gameId);
    }),

  // 获取所有游戏进度
  getAllProgress: protectedProcedure
    .query(async ({ ctx }) => {
      return getAllGameProgress(ctx.user.id);
    }),

  // 记录收集结局
  collectEnding: protectedProcedure
    .input(z.object({
      gameId: z.string(),
      endingId: z.string(),
      endingName: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await addEndingCollected({
        userId: ctx.user.id,
        gameId: input.gameId,
        endingId: input.endingId,
        endingName: input.endingName,
      });
      return { success: true };
    }),

  // 获取已收集结局
  getEndings: protectedProcedure
    .input(z.object({ gameId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return getEndingsCollected(ctx.user.id, input.gameId);
    }),

  // 解锁成就
  unlockAchievement: protectedProcedure
    .input(z.object({ achievementId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await addAchievement({
        userId: ctx.user.id,
        achievementId: input.achievementId,
      });
      return { success: true };
    }),

  // 获取所有成就
  getAchievements: protectedProcedure
    .query(async ({ ctx }) => {
      return getAchievements(ctx.user.id);
    }),

  // 获取完整游戏数据（进度 + 结局 + 成就）
  getFullData: protectedProcedure
    .query(async ({ ctx }) => {
      const [progress, endings, userAchievements] = await Promise.all([
        getAllGameProgress(ctx.user.id),
        getEndingsCollected(ctx.user.id),
        getAchievements(ctx.user.id),
      ]);
      return { progress, endings, achievements: userAchievements };
    }),
});
