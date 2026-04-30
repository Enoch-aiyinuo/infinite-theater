CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` varchar(64) NOT NULL,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `endings_collected` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameId` varchar(64) NOT NULL,
	`endingId` varchar(64) NOT NULL,
	`endingName` varchar(128),
	`collectedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `endings_collected_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `game_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameId` varchar(64) NOT NULL,
	`currentNodeId` int NOT NULL DEFAULT 1,
	`stats` json,
	`history` json,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `game_progress_id` PRIMARY KEY(`id`)
);
