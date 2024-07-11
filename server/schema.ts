import { drizzle } from 'drizzle-orm/vercel-postgres';
import { db, sql } from '@vercel/postgres';
import {
    index,
  integer,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `podcaster_${name}`);

export const Users = createTable(
    'users',
    {
      id: serial('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').notNull(),
      image: text('image').notNull(),
      clerkId: text('clerkId').notNull(),
      createdAt: timestamp('createdAt').defaultNow().notNull(),
      podcastCount: integer('podcastCount').default(0).notNull(),
    },
    (users) => {
      return {
        uniqueIdx: uniqueIndex('unique_idx').on(users.email),
      };
    },
  );

export const podcast = createTable(
  'podcast',
  {
    title: text('title').notNull(),
    description: text('description').notNull(),
    audioURL : text('audioURL').notNull().primaryKey(),
    userId: text('userId').references(()=>Users.id),
    imageURL: text('imageURL'),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    views: integer('views').default(0).notNull(),


  },
  (example) => ({
    titleIndex: index("titleId").on(example.title),
  })
);

export const images = createTable(
  'images',
  {
    id: text('id').primaryKey(),
    name: text('title').notNull(),
    podcast : text('audioStorageId').notNull(),
    audioURL : text('audioURL').notNull(),
    userId: integer('userId').references(()=>Users.id),
    imageURL: text('imageURL').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),


  },
  (example) => ({
    titleIndex: index("titleInd").on(example.name),
  })
);


  