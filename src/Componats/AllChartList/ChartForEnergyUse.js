import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Typography } from '@mui/material';


const ChartForEnergyUse = ({ dateLable, dataList, pervdateLabel, pervdataList }) => {

  console.log("dataList===>", dateLable)
  const data = {
    labels: dateLable,
    datasets: [
      {
        label: 'Energy Consumption Current',
        data: dataList,
        fill: false,
        borderColor: '#02316a',
      },
      {
        label: 'Energy Consumption Comparison',
        data: pervdataList,
        fill: false,
        borderColor: '#36b1e2', // Different color for the second line
      },
    ],
  };
  return (
    <div>
      <Typography style={{ display: 'flex', fontSize: '18px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginLeft: '25px', display: 'flex' }}>
        ENERGY USE
      </Typography>
      <Line data={data} height={80} />
    </div>
  )
}

export default ChartForEnergyUse