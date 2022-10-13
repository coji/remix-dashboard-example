import { useState } from "react"
import { Box, Container, Heading, Stack, Button } from "@chakra-ui/react"
import TrendGraph from "~/features/graphs/components/TrendGraph"

export default function Index() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Container>
        <Stack>
          <Heading>Remix dashboard example</Heading>

          <TrendGraph></TrendGraph>
          <Button
            width="full"
            onClick={() => setCount((current) => current + 1)}
          >
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
