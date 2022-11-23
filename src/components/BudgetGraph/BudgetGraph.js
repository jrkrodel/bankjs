import React from "react";
import styles from "./BudgetGraph.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
      ticks: {
        color: "white",
        beginAtZero: true,
        font: {
          size: 11,
          family: "Raleway",
        },
      },
    },
    x: {
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
      ticks: {
        color: "white",
        beginAtZero: true,
        font: {
          size: 11,
          family: "Raleway",
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",

        font: {
          size: 14,
          family: "Raleway",
        },
      },
    },
  },
};

export const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: [23, 45],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [23, 99],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function BudgetGraph({ graphData, compareSpending }) {
  let keys = [];
  let spendingKeys = [];
  let values = [];
  let spendingValues = [];
  console.log(compareSpending);

  Object.keys(graphData).forEach((key) => {
    if (key !== "id" && key !== "name" && key !== "length") {
      if (graphData[key] !== 0 && graphData[key] !== "0") {
        keys.push(key.charAt(0).toUpperCase() + key.slice(1));
        values.push(Number(graphData[key]));
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

  Object.keys(compareSpending).forEach((key) => {
    if (keys.includes(key.charAt(0).toUpperCase() + key.slice(1))) {
      spendingKeys.push(key.charAt(0).toUpperCase() + key.slice(1));
      spendingValues.push(Number(compareSpending[key]));
    }
  });

  const data = {
    labels: keys,
    datasets: [
      {
        label: "Your Budget",
        data: values,
        backgroundColor: ["#162636"],
        borderWidth: 0.5,
      },
      {
        label: "Spending",
        data: spendingValues,
        backgroundColor: ["#c43333"],
        borderWidth: 0.5,
      },
    ],
  };
  return (
    <div className={styles.graph}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BudgetGraph;
