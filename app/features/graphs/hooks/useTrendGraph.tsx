import { useRef, useMemo, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import type { Chart as ChartJS, ScriptableContext } from "chart.js"
import type { ChartProps } from "react-chartjs-2"
import { Chart, getElementsAtEvent } from "react-chartjs-2"

interface TrendGraphProps {
  labels?: string[]
  datasets?: number[][]
  isFetching: boolean
}
export const useTrendGraph = ({
  labels = ["Loading..."],
  datasets = [[], []],
  isFetching
}: TrendGraphProps) => {
  // データ定義
  const data: ChartProps<"line" | "bar", number[], string>["data"] = useMemo(
    () => ({
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
          data: datasets[0],
          yAxisID: "y1"
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
          yAxisID: "y2"
        }
      ]
    }),
    [labels, datasets, isFetching]
  )

  // オプション定義
  const options: ChartProps<"line" | "bar", number[], string>["options"] =
    useMemo(
      () => ({
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false
        },
        scales: {
          y1: {
            type: "linear" as const,
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false
            },
            min: 0,
            max: (Math.floor(Math.max(...(datasets[0] || [1])) / 5) + 1) * 5 // 5の倍数にする
          },
          y2: {
            type: "linear",
            display: true,
            position: "left",
            grid: {
              drawOnChartArea: false
            },
            min: 0,
            max: (Math.floor(Math.max(...(datasets[1] || [1])) / 100) + 1) * 100 // 100の倍数にする
          }
        }
      }),
      [datasets]
    )

  const chartRef = useRef<ChartJS<"line" | "bar", number[], string>>()
  const TrendGraph = useCallback(
    () => (
      <Box>
        <Chart
          ref={chartRef}
          type="bar"
          data={data}
          options={options}
          onClick={(e) => {
            if (!chartRef.current) return
            const elements = getElementsAtEvent(chartRef.current, e)
            console.log("clicked elements:", elements)
          }}
        />
      </Box>
    ),
    [data, options]
  )

  return {
    TrendGraph
  }
}
