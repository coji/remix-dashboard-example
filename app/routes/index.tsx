import { Box, Container, Heading } from "@chakra-ui/react"
import TrendGraph from "~/features/graphs/components/TrendGraph"

export default function Index() {
  return (
    <Box>
      <Container>
        <Heading>Remix dashboard example</Heading>
        <TrendGraph></TrendGraph>
      </Container>
    </Box>
  )
}
