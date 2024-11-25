import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Typography } from '@mui/material';

const ChartForTodayData = ({ dateWaterLable, dataWaterList, prevWaterLabel, prevWaterdataList }) => {
  // Sample data for the line chart
  console.log('prevWaterdataList123++++==>prev', prevWaterdataList)
  console.log('dataWaterList123.....>', dataWaterList)

  const data = {
    labels: dateWaterLable,
    datasets: [
      {
        label: 'Water Consumption Current',
        data: dataWaterList,
        fill: false,
        borderColor: '#02316a',
      },
      {
        label: 'Water Consumption Comparison',
        data: prevWaterdataList,
        fill: false,
        borderColor: '#36b1e2', // Different color for the second line
      },
    ],
  };

  return (
    <div>
      <Typography style={{ display: 'flex', fontSize: '18px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginLeft: '25px', display: 'flex' }}>
        WATER USE
      </Typography>
      <Line data={data} height={80} />
    </div>
  );
};

export default ChartForTodayData;
