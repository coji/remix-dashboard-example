import {
  Box,
  Heading,
  Stack,
  Button,
  Progress,
  Link,
  Icon
} from "@chakra-ui/react"
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai"
import { useQueryClient } from "@tanstack/react-query"
import { useTrendGraph } from "~/features/graphs/hooks/useTrendGraph"

export default function Index() {
  const queryClient = useQueryClient()
  const { TrendGraph } = useTrendGraph("/api/data")
  const { TrendGraph: Graph2 } = useTrendGraph("/api/data?id=2")
  const { TrendGraph: Graph3 } = useTrendGraph("/api/data?id=3")
  const { TrendGraph: Graph4 } = useTrendGraph("/api/data?id=4")

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto" height="100vh">
      <Progress
        size="xs"
        bgColor="white"
        isIndeterminate={queryClient.isFetching() > 0}
      />

      <Box>
        <Heading>Remix dashboard example</Heading>

        <Box
          display="grid"
          gridTemplateRows="1fr 1fr"
          gridTemplateColumns="1fr 1fr"
          gap="4"
          w="100vw"
        >
          <Box>
            <TrendGraph />
          </Box>
          <Box>
            <Graph2 />
          </Box>
          <Box>
            <Graph3 />
          </Box>
          <Box>
            <Graph4 />
          </Box>
        </Box>

        <Button
          width="full"
          onClick={() => queryClient.invalidateQueries()}
          isLoading={queryClient.isFetching() > 0}
        >
          Load
        </Button>
      </Box>

      <Box textAlign="center" py="2">
        <Stack direction="row" justify="center">
          <Link isExternal href="https://twitter.com/techtalkjp">
            <Icon
              as={AiOutlineTwitter}
              color="gray.500"
              _hover={{ color: "black" }}
              w={6}
              h={6}
            />
          </Link>
          <Link
            isExternal
            href="https://github.com/coji/remix-dashboard-example"
          >
            <Icon
              as={AiOutlineGithub}
              color="gray.500"
              _hover={{ color: "black" }}
              w={6}
              h={6}
            />
          </Link>
        </Stack>
      </Box>
    </Box>
  )
}
