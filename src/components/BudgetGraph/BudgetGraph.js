import React, { useState, useEffect } from "react";
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

function BudgetGraph({ graphData, compareSpending }) {
  let keys = [];
  let spendingKeys = [];
  let values = [];
  let spendingValues = [];

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  Object.keys(graphData).forEach((key) => {
    if (key !== "id" && key !== "name" && key !== "length") {
      if (graphData[key] !== 0 && graphData[key] !== "0") {
        keys.push(key.charAt(0).toUpperCase() + key.slice(1));
        values.push(parseFloat(graphData[key]).toFixed(2));
        console.log(values);
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
      spendingValues.push(parseFloat(compareSpending[key]).toFixed(2));
      console.log(spendingValues);
    }
  });

  let fontSize;
  if (windowSize.innerWidth > 420) {
    fontSize = 11;
  } else {
    fontSize = 9;
  }

  const options = {
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
            size: fontSize,
            family: "Raleway",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
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

  const data = {
    labels: keys,
    datasets: [
      {
        label: "Your Budget",
        data: values,
        backgroundColor: ["#305375"],
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
