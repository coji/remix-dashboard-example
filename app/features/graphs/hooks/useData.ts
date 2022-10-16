import { useQuery } from "@tanstack/react-query"
import ky from "ky"
import type { loader } from "~/routes/api/data"
import type { SerializeFrom } from "@remix-run/node"

export const useData = (apiEndpoint: string) => {
  return useQuery(
    ["data", apiEndpoint],
    async () =>
      (await ky.get(apiEndpoint).json()) as SerializeFrom<typeof loader>
  )
}
