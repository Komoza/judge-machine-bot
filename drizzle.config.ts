export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg' as const,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};