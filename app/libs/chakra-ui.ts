// createEmotionCache.ts
import createCache from "@emotion/cache"

// context.tsx
import { createContext } from "react"

export const createEmotionCache = () => {
  return createCache({ key: "css" })
}

export interface ServerStyleContextData {
  key: string
  ids: Array<string>
  css: string
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null)

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
)
