import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { GAMES, type GameData } from "../../client/src/data/games";
import { getStoryNodes } from "../../client/src/data/story-registry";
import { protectedProcedure, router } from "../_core/trpc";
import {
  upsertGameProgress,
  getGameProgress,
  getAllGameProgress,
  addEndingCollected,
  getEndingsCollected,
  addAchievement,
  getAchievements,
} from "../db";

const STATIC_ACHIEVEMENT_IDS = new Set([
  "first_step",
  "first_ending",
  "rainy_complete",
  "branch_hunter",
  "secret_finder",
  "deep_sea_complete",
  "all_games",
  "ten_endings",
  "rainy_all_endings",
  "deep_sea_all_endings",
  "all_endings",
]);

const gameById = new Map(GAMES.map(game => [game.id, game]));
const DEDUCTION_GATE_BASE_ID = 900000;
const DEDUCTION_GATE_STAGES = new Set([1, 2, 3]);

function badRequest(message: string): never {
  throw new TRPCError({ code: "BAD_REQUEST", message });
}

function getValidGame(gameId: string) {
  const game = gameById.get(gameId);
  if (!game) badRequest("Unknown game");
  return game;
}

function parseDeductionGateId(nodeId: number) {
  if (nodeId <= DEDUCTION_GATE_BASE_ID) return null;
  const offset = nodeId - DEDUCTION_GATE_BASE_ID;
  const stage = offset % 10;
  const endingNodeId = Math.floor(offset / 10);
  if (!DEDUCTION_GATE_STAGES.has(stage)) return null;
  return { endingNodeId, stage };
}

function isValidStoryNodeId(story: ReturnType<typeof getStoryNodes>, nodeId: number) {
  if (story.some(item => item.id === nodeId)) return true;

  const gate = parseDeductionGateId(nodeId);
  if (!gate) return false;
  return story.some(item => item.id === gate.endingNodeId && item.end && item.endType !== "bad");
}

function getValidStoryNode(gameId: string, nodeId: number) {
  const story = getStoryNodes(gameId);
  const node = story.find(item => item.id === nodeId);
  if (!node && !isValidStoryNodeId(story, nodeId)) badRequest("Unknown story node");
  return { story, node };
}

function getValidEnding(game: GameData, endingId: string) {
  const ending = game.endings.find(item => item.id === endingId);
  if (!ending) badRequest("Unknown ending");
  return ending;
}

function validateProgressInput(input: {
  gameId: string;
  currentNodeId: number;
  stats: Record<string, number>;
  history: number[];
  isCompleted: boolean;
  completedAt?: string;
}) {
  const game = getValidGame(input.gameId);
  const { story, node } = getValidStoryNode(input.gameId, input.currentNodeId);
  const statKeys = new Set(game.stats.map(stat => stat.key));

  for (const [key, value] of Object.entries(input.stats)) {
    if (!statKeys.has(key)) badRequest("Unknown stat key");
    if (!Number.isFinite(value) || value < 0 || value > 100) badRequest("Invalid stat value");
  }

  if (input.history.length > 500) badRequest("History is too long");
  for (const nodeId of input.history) {
    if (!isValidStoryNodeId(story, nodeId)) badRequest("History contains unknown node");
  }

  if (input.isCompleted && !node?.end) badRequest("Completed progress must point to an ending node");
  if (!input.isCompleted && input.completedAt) badRequest("Incomplete progress cannot include completedAt");
  if (input.completedAt && Number.isNaN(new Date(input.completedAt).getTime())) badRequest("Invalid completedAt");
}

function isValidAchievementId(achievementId: string) {
  if (STATIC_ACHIEVEMENT_IDS.has(achievementId)) return true;
  return GAMES.some(game =>
    game.endings.some(ending => achievementId === `${game.id}_ending_${ending.id}`),
  );
}

export const gameRouter = router({
  // 保存/更新游戏进度
  saveProgress: protectedProcedure
    .input(z.object({
      gameId: z.string().min(1).max(64),
      currentNodeId: z.number().int().positive(),
      stats: z.record(z.string(), z.number()),
      history: z.array(z.number().int().positive()),
      isCompleted: z.boolean(),
      completedAt: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      validateProgressInput(input);
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
    .input(z.object({ gameId: z.string().min(1).max(64) }))
    .query(async ({ ctx, input }) => {
      getValidGame(input.gameId);
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
      gameId: z.string().min(1).max(64),
      endingId: z.string().min(1).max(64),
      endingName: z.string().max(128),
    }))
    .mutation(async ({ ctx, input }) => {
      const game = getValidGame(input.gameId);
      const ending = getValidEnding(game, input.endingId);
      await addEndingCollected({
        userId: ctx.user.id,
        gameId: input.gameId,
        endingId: input.endingId,
        endingName: ending.name,
      });
      return { success: true };
    }),

  // 获取已收集结局
  getEndings: protectedProcedure
    .input(z.object({ gameId: z.string().min(1).max(64).optional() }))
    .query(async ({ ctx, input }) => {
      if (input.gameId) getValidGame(input.gameId);
      return getEndingsCollected(ctx.user.id, input.gameId);
    }),

  // 解锁成就
  unlockAchievement: protectedProcedure
    .input(z.object({ achievementId: z.string().min(1).max(64) }))
    .mutation(async ({ ctx, input }) => {
      if (!isValidAchievementId(input.achievementId)) badRequest("Unknown achievement");
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
