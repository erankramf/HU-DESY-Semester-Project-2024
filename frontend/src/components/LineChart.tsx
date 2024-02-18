import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

export const LineChart = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'], 
    datasets: [
      {
        label: 'Example Data', 
        data: [65, 59, 80, 81, 56, 55, 40], 
        fill: false, // Не заполнять область под графиком
        backgroundColor: 'rgba(75,192,192,0.2)', 
        borderColor: 'rgba(75,192,192,1)', 
      },
    ],
  };
  

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
