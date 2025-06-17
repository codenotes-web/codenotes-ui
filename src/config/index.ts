const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
  }
} as const

export type Config = typeof config

const requiredEnvVars = ['VITE_API_BASE_URL'] as const

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${ envVar }`)
  }
}

export default config
