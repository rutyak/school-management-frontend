import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const AnalyticsChart = ({ teacherData, totalIncome }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (teacherData && teacherData.length > 0) {
      const totalSalaries = teacherData.reduce((acc, teacher) => acc + teacher.salary, 0);

      setChartData({
        labels: ["Total Salary Expenses", "Total Income from Students"],
        datasets: [
          {
            label: "Amount (INR)",
            data: [totalSalaries, totalIncome],
            backgroundColor: ["#FF6384", "#36A2EB"], 
            borderWidth: 1,
          },
        ],
      });
    }
  }, [teacherData, totalIncome]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ₹${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (INR)",
        },
      },
    },
  };

  if (!teacherData || teacherData.length === 0) {
    return <div className="text-center">No data available</div>;
  }

  return (
      <div className="w-full !h-[520px] bg-white p-6 rounded-lg shadow-md mt-14 lg:p-6 lg:w-full lg:h-[520px]">
        <h2 className="text-center text-xl font-bold mb-4 lg:text-xl">Total Salary Expenses vs Total Income</h2>
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
  );
};

export default AnalyticsChart;
