// entry.client.tsx
import React, { useState } from "react"
import { hydrateRoot } from "react-dom/client"
import { CacheProvider } from "@emotion/react"
import { RemixBrowser } from "@remix-run/react"
import { ClientStyleContext, createEmotionCache } from "./libs/chakra-ui"

interface ClientCacheProviderProps {
  children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
)
