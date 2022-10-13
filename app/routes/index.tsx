import { Box, Container, Heading } from "@chakra-ui/react"
import TrendGraph from "~/features/graphs/components/TrendGraph"
import dayjs from "~/libs/dayjs"

export default function Index() {
  if (typeof document !== "undefined") {
    console.log(dayjs().format())
  }
  return (
    <Box>
      <Container>
        <Heading>Remix dashboard example</Heading>
        <TrendGraph></TrendGraph>
      </Container>
    </Box>
  )
}
