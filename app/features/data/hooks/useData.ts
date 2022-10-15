import { useQuery } from "@tanstack/react-query"
import ky from "ky"
import type { loader } from "~/routes/api/data"
import type { SerializeFrom } from "@remix-run/node"

export const useData = () => {
  return useQuery(
    ["data"],
    async () =>
      (await ky.get("/api/data").json()) as SerializeFrom<typeof loader>,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
}
