import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttendanceLineGraph = ({ type, name, percentage }) => {
  const classAverage = type === "teacher" ? 40 : 65;

  const labels = [type === "teacher"? 'Classes': 'Attendance', 'Class Average'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: type === 'teacher' ? `${name}'s Conducted Classes` : `${name}'s Attendance Percentage (%)`,
        data: [percentage, classAverage], 
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 7,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 10,
      },
      {
        label: type === 'teacher' ? 'Average Classes Conducted' : 'Class Average Attendance (%)',
        data: [classAverage, classAverage],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 7,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Attendance Percentage',
          font: {
            size: 14,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Status',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 lg:h-96 lg:w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default AttendanceLineGraph;
