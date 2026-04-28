import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

// --- Better Auth Tables ---

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

// --- Marketplace Tables ---

export const skills = pgTable(
	"skills",
	{
		id: text("id").primaryKey(),
		title: text("title").notNull(),
		description: text("description"),
		payload: text("payload").notNull(),
		targetAgent: text("target_agent").notNull(),
		authorId: text("author_id")
			.notNull()
			.references(() => user.id),
		parentId: text("parent_id").references(() => skills.id),
		version: text("version").default("v1"),
		isPublic: boolean("is_public").default(true),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("title_idx").on(t.title),
		index("target_agent_idx").on(t.targetAgent),
	],
);

export const tags = pgTable("tags", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
});

export const skillsToTags = pgTable(
	"skills_to_tags",
	{
		skillId: text("skill_id")
			.notNull()
			.references(() => skills.id),
		tagId: text("tag_id")
			.notNull()
			.references(() => tags.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.skillId, t.tagId] }),
	}),
);

export const votes = pgTable("votes", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	skillId: text("skill_id")
		.notNull()
		.references(() => skills.id),
	value: integer("value").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favorites = pgTable(
	"favorites",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id),
		skillId: text("skill_id")
			.notNull()
			.references(() => skills.id),
	},
	(t) => [primaryKey({ columns: [t.userId, t.skillId] })],
);

export const comments = pgTable("comments", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	skillId: text("skill_id")
		.notNull()
		.references(() => skills.id),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionsToSkills = pgTable(
	"collections_to_skills",
	{
		collectionId: text("collection_id")
			.notNull()
			.references(() => collections.id),
		skillId: text("skill_id")
			.notNull()
			.references(() => skills.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.collectionId, t.skillId] }),
	}),
);

// --- Relations ---

export const userRelations = relations(user, ({ many }) => ({
	skills: many(skills),
	votes: many(votes),
	favorites: many(favorites),
	comments: many(comments),
	collections: many(collections),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
	author: one(user, {
		fields: [skills.authorId],
		references: [user.id],
	}),
	parent: one(skills, {
		fields: [skills.parentId],
		references: [skills.id],
		relationName: "forks",
	}),
	forks: many(skills, { relationName: "forks" }),
	tags: many(skillsToTags),
	votes: many(votes),
	favorites: many(favorites),
	comments: many(comments),
	collections: many(collectionsToSkills),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	skills: many(skillsToTags),
}));

export const skillsToTagsRelations = relations(skillsToTags, ({ one }) => ({
	skill: one(skills, {
		fields: [skillsToTags.skillId],
		references: [skills.id],
	}),
	tag: one(tags, {
		fields: [skillsToTags.tagId],
		references: [tags.id],
	}),
}));

export const votesRelations = relations(votes, ({ one }) => ({
	user: one(user, {
		fields: [votes.userId],
		references: [user.id],
	}),
	skill: one(skills, {
		fields: [votes.skillId],
		references: [skills.id],
	}),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
	user: one(user, {
		fields: [favorites.userId],
		references: [user.id],
	}),
	skill: one(skills, {
		fields: [favorites.skillId],
		references: [skills.id],
	}),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	user: one(user, {
		fields: [comments.userId],
		references: [user.id],
	}),
	skill: one(skills, {
		fields: [comments.skillId],
		references: [skills.id],
	}),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
	user: one(user, {
		fields: [collections.userId],
		references: [user.id],
	}),
	skills: many(collectionsToSkills),
}));

export const collectionsToSkillsRelations = relations(
	collectionsToSkills,
	({ one }) => ({
		collection: one(collections, {
			fields: [collectionsToSkills.collectionId],
			references: [collections.id],
		}),
		skill: one(skills, {
			fields: [collectionsToSkills.skillId],
			references: [skills.id],
		}),
	}),
);
