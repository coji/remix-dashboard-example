import { faker } from "@faker-js/faker"
import { type LoaderArgs, json } from "@remix-run/node"
import { setTimeout } from "node:timers/promises"

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const loader = async (args: LoaderArgs) => {
  const timeout = Math.random() * 3000
  await setTimeout(timeout)

  return json({
    labels,
    datasets: [
      labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      labels.map(() => faker.datatype.number({ min: 0, max: 1000 }))
    ],
    axisLabels: {
      y1: "Review Time",
      y2: "Pulls"
    }
  })
}
