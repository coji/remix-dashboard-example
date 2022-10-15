import {
  Box,
  Container,
  Heading,
  Stack,
  Button,
  Progress
} from "@chakra-ui/react"
import { useData } from "~/features/data/hooks/useData"
import { useQueryClient } from "@tanstack/react-query"
import { useTrendGraph } from "~/features/graphs/hooks/useTrendGraph"

export default function Index() {
  const queryClient = useQueryClient()
  const { data, isFetching } = useData()
  const { TrendGraph } = useTrendGraph({
    labels: data?.labels,
    datasets: data?.datasets,
    isFetching
  })

  return (
    <Box>
      <Progress size="xs" bgColor="white" isIndeterminate={isFetching} />
      <Container>
        <Stack>
          <Heading>Remix dashboard example</Heading>

          <TrendGraph />

          <Button
            width="full"
            onClick={() => queryClient.invalidateQueries()}
            isLoading={isFetching}
          >
            Randomize
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
