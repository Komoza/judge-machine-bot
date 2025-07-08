import {bigint, boolean, pgTable, text, varchar, primaryKey, date} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(),
  username: text('username').notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  is_bot: boolean('is_bot').default(false).notNull(),
  language_code: text('language_code'),
  is_premium: boolean('is_premium').default(false).notNull(),
});

export const chatUsers = pgTable(
  'chat_users',
  {
    chat_id: bigint('chat_id', { mode: 'number' }).notNull(),
    user_id: varchar('user_id', { length: 64 }).notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.chat_id, t.user_id] }),
  ]
);

export const dailyPidor = pgTable('daily_pidor', {
  chat_id: varchar('chat_id', { length: 64 }).notNull(),
  pidor_id: varchar('pidor_id', { length: 64 }).notNull(),
  author_id: varchar('author_id', { length: 64 }).notNull(),
  date: date('date').notNull()
});