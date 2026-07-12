const trimTrailingSlash = (value: string) => value.replace(/\/$/, '')

export const apiBaseUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
)

export const buildDatabaseUrl = (host = process.env.POSTGRES_HOST) => {
  const user = process.env.POSTGRES_USER ?? 'todo'
  const password = process.env.POSTGRES_PASSWORD ?? 'todo'
  const database = process.env.POSTGRES_DB ?? 'todo'
  const port = process.env.POSTGRES_PORT ?? '5432'
  const resolvedHost = host ?? 'localhost'

  return `postgresql://${user}:${password}@${resolvedHost}:${port}/${database}?schema=public`
}

export const databaseUrl =
  process.env.DATABASE_URL ?? buildDatabaseUrl()
