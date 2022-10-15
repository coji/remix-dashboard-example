import {
  Box,
  Container,
  Heading,
  Stack,
  Button,
  Progress,
} from "@chakra-ui/react"
import { useData } from "~/features/data/hooks/useData"
import TrendGraph from "~/features/graphs/components/TrendGraph"
import { useQueryClient } from "@tanstack/react-query"

export default function Index() {
  const queryClient = useQueryClient()
  const { data, isFetching } = useData()

  return (
    <Box>
      <Progress size="xs" bgColor="white" isIndeterminate={isFetching} />
      <Container>
        <Stack>
          <Heading>Remix dashboard example</Heading>

          <TrendGraph
            isFetching={isFetching}
            labels={data?.labels}
            datasets={data?.datasets}
          ></TrendGraph>

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
