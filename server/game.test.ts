import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock database functions
vi.mock("./db", () => ({
  upsertGameProgress: vi.fn().mockResolvedValue(undefined),
  getGameProgress: vi.fn().mockResolvedValue(null),
  getAllGameProgress: vi.fn().mockResolvedValue([]),
  addEndingCollected: vi.fn().mockResolvedValue(undefined),
  getEndingsCollected: vi.fn().mockResolvedValue([]),
  addAchievement: vi.fn().mockResolvedValue(undefined),
  getAchievements: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user-001",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("game.saveProgress", () => {
  it("saves game progress successfully", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.saveProgress({
      gameId: "rainy-night",
      currentNodeId: 5,
      stats: { trust: 60, clues: 15, stress: 20 },
      history: [1, 2, 3],
      isCompleted: false,
    });

    expect(result).toEqual({ success: true });
  });

  it("saves completed game progress with completedAt", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const completedAt = new Date().toISOString();
    const result = await caller.game.saveProgress({
      gameId: "deep-sea",
      currentNodeId: 30,
      stats: { oxygen: 20, power: 50, sanity: 30 },
      history: [1, 2, 5, 10, 20, 30],
      isCompleted: true,
      completedAt,
    });

    expect(result).toEqual({ success: true });
  });
});

describe("game.collectEnding", () => {
  it("records a collected ending", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.collectEnding({
      gameId: "rainy-night",
      endingId: "truth",
      endingName: "真相大白",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("game.unlockAchievement", () => {
  it("unlocks an achievement", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.unlockAchievement({
      achievementId: "first_ending",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("game.getProgress", () => {
  it("returns null when no progress exists", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.getProgress({ gameId: "rainy-night" });
    expect(result).toBeNull();
  });
});

describe("game.getEndings", () => {
  it("returns empty array when no endings collected", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.getEndings({});
    expect(result).toEqual([]);
  });
});

describe("game.getAchievements", () => {
  it("returns empty array when no achievements unlocked", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.getAchievements();
    expect(result).toEqual([]);
  });
});

describe("game.getFullData", () => {
  it("returns combined progress, endings, and achievements", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.getFullData();
    expect(result).toHaveProperty("progress");
    expect(result).toHaveProperty("endings");
    expect(result).toHaveProperty("achievements");
    expect(Array.isArray(result.progress)).toBe(true);
    expect(Array.isArray(result.endings)).toBe(true);
    expect(Array.isArray(result.achievements)).toBe(true);
  });
});
