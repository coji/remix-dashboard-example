import { Box, Container, Heading, Stack, Button } from "@chakra-ui/react"
import { useData } from "~/features/data/hooks/useData"
import TrendGraph from "~/features/graphs/components/TrendGraph"
import { useQueryClient } from "@tanstack/react-query"

export default function Index() {
  const queryClient = useQueryClient()

  const { data, isFetching } = useData()

  return (
    <Box>
      <Container>
        <Stack>
          <Heading>Remix dashboard example</Heading>

          <TrendGraph
            isLoading={isFetching}
            labels={data?.labels}
            datasets={data?.datasets}
          ></TrendGraph>

          <Button width="full" onClick={() => queryClient.invalidateQueries()}>
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
