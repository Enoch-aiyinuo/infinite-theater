import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// 游戏进度存档表
export const gameProgress = mysqlTable("game_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(), // e.g. "rainy-night", "deep-sea"
  currentNodeId: int("currentNodeId").notNull().default(1),
  stats: json("stats"), // 游戏内属性值 JSON
  history: json("history"), // 选择历史 JSON
  isCompleted: boolean("isCompleted").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GameProgress = typeof gameProgress.$inferSelect;
export type InsertGameProgress = typeof gameProgress.$inferInsert;

// 结局收集表
export const endingsCollected = mysqlTable("endings_collected", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: varchar("gameId", { length: 64 }).notNull(),
  endingId: varchar("endingId", { length: 64 }).notNull(), // e.g. "safe", "danger", "truth"
  endingName: varchar("endingName", { length: 128 }),
  collectedAt: timestamp("collectedAt").defaultNow().notNull(),
});

export type EndingCollected = typeof endingsCollected.$inferSelect;
export type InsertEndingCollected = typeof endingsCollected.$inferInsert;

// 成就表
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: varchar("achievementId", { length: 64 }).notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;
