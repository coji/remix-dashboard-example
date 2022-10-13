import { faker } from "@faker-js/faker"
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
const labels = ["January", "February", "March", "April", "May", "June", "July"]

export default function TrendGraph() {
  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Review Time",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255,99,132)",
        borderWidth: 2,
        fill: false,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        lineTension: 0.25,
        yAxisID: "y1",
      },
      {
        type: "bar" as const,
        label: "Pulls",
        backgroundColor: "rgb(53, 162, 235)",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
        yAxisID: "y2",
      },
    ],
  }

  const maxY1 =
    (Math.floor((maxBy(data.datasets[0].data, (y) => y) || 1) / 5) + 1) * 5
  const maxY2 =
    (Math.floor((maxBy(data.datasets[1].data, (y) => y) || 1) / 100) + 1) * 100

  return (
    <Chart
      type="bar"
      data={data}
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
  )
}
