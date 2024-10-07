import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const StudentChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const maleCount = data.filter((item) => item.gender === "male").length;
      const femaleCount = data.filter((item) => item.gender === "female").length;
      const otherCount = data.filter((item) => item.gender === "other").length;

      setChartData({
        labels: ["Male", "Female", "Other"],
        datasets: [
          {
            label: "Gender Distribution",
            data: [maleCount, femaleCount, otherCount],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],  
            hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"], 
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full md:w-[450px] bg-white p-6 rounded-lg shadow-md"> 
        <h2 className="text-center text-xl font-bold mb-4">Gender Distribution</h2>
        {chartData ? (
          <Pie data={chartData} options={options} />
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default StudentChart;
