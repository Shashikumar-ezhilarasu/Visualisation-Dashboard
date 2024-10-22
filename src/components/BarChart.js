import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: 'Bar Chart Example', display: true },
        }}
      />
    </div>
  );
};

export default BarChart;
