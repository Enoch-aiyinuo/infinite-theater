import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, gameProgress, endingsCollected, achievements } from "../drizzle/schema";
import type { InsertGameProgress, InsertEndingCollected, InsertAchievement } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ========== 游戏进度 ==========

export async function upsertGameProgress(data: InsertGameProgress & { userId: number; gameId: string }) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(gameProgress)
    .where(and(eq(gameProgress.userId, data.userId), eq(gameProgress.gameId, data.gameId)))
    .limit(1);

  if (existing.length > 0) {
    await db.update(gameProgress)
      .set({
        currentNodeId: data.currentNodeId,
        stats: data.stats,
        history: data.history,
        isCompleted: data.isCompleted,
        completedAt: data.completedAt,
      })
      .where(and(eq(gameProgress.userId, data.userId), eq(gameProgress.gameId, data.gameId)));
  } else {
    await db.insert(gameProgress).values(data);
  }
}

export async function getGameProgress(userId: number, gameId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(gameProgress)
    .where(and(eq(gameProgress.userId, userId), eq(gameProgress.gameId, gameId)))
    .limit(1);
  return result[0] ?? null;
}

export async function getAllGameProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gameProgress).where(eq(gameProgress.userId, userId));
}

// ========== 结局收集 ==========

export async function addEndingCollected(data: InsertEndingCollected & { userId: number }) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(endingsCollected)
    .where(and(
      eq(endingsCollected.userId, data.userId),
      eq(endingsCollected.gameId, data.gameId),
      eq(endingsCollected.endingId, data.endingId),
    ))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(endingsCollected).values(data);
  }
}

export async function getEndingsCollected(userId: number, gameId?: string) {
  const db = await getDb();
  if (!db) return [];
  if (gameId) {
    return db.select().from(endingsCollected)
      .where(and(eq(endingsCollected.userId, userId), eq(endingsCollected.gameId, gameId)));
  }
  return db.select().from(endingsCollected).where(eq(endingsCollected.userId, userId));
}

// ========== 成就 ==========

export async function addAchievement(data: InsertAchievement & { userId: number }) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(achievements)
    .where(and(eq(achievements.userId, data.userId), eq(achievements.achievementId, data.achievementId)))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(achievements).values(data);
  }
}

export async function getAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(achievements).where(eq(achievements.userId, userId));
}
