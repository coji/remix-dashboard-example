import { Suspense } from "react"
import {
  Box,
  Container,
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
  const { TrendGraph, isFetching } = useTrendGraph("/api/data")

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto" height="100vh">
      <Progress size="xs" bgColor="white" isIndeterminate={isFetching} />
      <Container>
        <Stack>
          <Heading>Remix dashboard example</Heading>

          <Suspense fallback={<div>Loading...</div>}>
            <TrendGraph />
          </Suspense>

          <Button
            width="full"
            onClick={() => queryClient.invalidateQueries()}
            isLoading={isFetching}
          >
            Load
          </Button>
        </Stack>
      </Container>

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
