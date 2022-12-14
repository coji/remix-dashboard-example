// root.tsx
import React, { useContext, useEffect } from "react"
import { withEmotionCache } from "@emotion/react"
import { ChakraProvider } from "@chakra-ui/react"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"
import type { MetaFunction, LinksFunction } from "@remix-run/node" // Depends on the runtime you choose
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ServerStyleContext, ClientStyleContext } from "./libs/chakra-ui"

import { initChartJs } from "~/libs/chart"
initChartJs()

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Dashboard Example",
  viewport: "width=device-width,initial-scale=1"
})

export let links: LinksFunction = () => {
  return []
}

interface DocumentProps {
  children: React.ReactNode
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext)
    const clientStyleData = useContext(ClientStyleContext)

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head
      // re-inject tags
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach((tag) => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      // reset cache to reapply global styles
      clientStyleData?.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false
    }
  }
})

export default function App() {
  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Outlet />
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Document>
  )
}
