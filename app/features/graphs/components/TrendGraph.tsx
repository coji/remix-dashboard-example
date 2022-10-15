import { Box } from "@chakra-ui/react"
import type { ScriptableContext } from "chart.js"
import { Chart } from "react-chartjs-2"
import { maxBy } from "remeda"

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y1: {
      type: "linear" as const,
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
      min: 0,
      max: 20,
    },
    y2: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        drawOnChartArea: false,
      },
      min: 0,
      max: 100,
    },
  },
}

interface TrendGraphProps {
  labels?: string[]
  datasets?: number[][]
  isFetching: boolean
}
export default function TrendGraph({
  labels = ["Loading..."],
  datasets = [[], []],
  isFetching,
}: TrendGraphProps) {
  const maxY1 = (Math.floor((maxBy(datasets[0], (y) => y) || 1) / 5) + 1) * 5
  const maxY2 =
    (Math.floor((maxBy(datasets[1], (y) => y) || 1) / 100) + 1) * 100

  return (
    <Box>
      <Chart
        type="bar"
        data={{
          labels,
          datasets: [
            {
              type: "line",
              label: "Review Time",
              borderColor: (ctx: ScriptableContext<"line">) =>
                isFetching ? "rgba(255, 99, 132, .2)" : "rgb(255, 99, 132)",
              backgroundColor: (ctx: ScriptableContext<"line">) =>
                isFetching
                  ? "rgba(255,99,132, .2)"
                  : ctx.active
                  ? "rgb(255,0,0)"
                  : "rgb(255,99,132)",
              borderWidth: 2,
              tension: 0.25,
              fill: false,
              data: datasets[0],
              yAxisID: "y1",
            },
            {
              type: "bar",
              label: "Pulls",
              backgroundColor: (ctx: ScriptableContext<"bar">) =>
                isFetching
                  ? "rgba(53, 162, 235, .2)"
                  : ctx.active
                  ? "rgb(84,193,255)"
                  : "rgb(53, 162, 235)",
              data: datasets[1],
              yAxisID: "y2",
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: "Chart.js Line Chart - Multi Axis",
            },
          },
          scales: {
            y1: {
              type: "linear" as const,
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
              min: 0,
              max: maxY1,
            },
            y2: {
              type: "linear",
              display: true,
              position: "left",
              grid: {
                drawOnChartArea: false,
              },
              min: 0,
              max: maxY2,
            },
          },
        }}
      />
    </Box>
  )
}
