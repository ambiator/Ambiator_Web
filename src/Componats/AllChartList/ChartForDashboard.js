import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { EnergyGraphShowData } from '../ApiService/LoginPageService';

const ChartForDashboard = ({ filterId }) => {
  const [dateLable, setDateLable] = useState([]);
  const [dataList, setDataList] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    EnergyGraphShowData({
      sortDataType: "today",
      type: filterId === "All" ? "" : filterId
    }, handleGraphSuccess, handleGraphException);
  }, [filterId]);

  const TodayData = (duration) => {
    EnergyGraphShowData({
      sortDataType: duration,
      type: filterId === "All" ? "" : filterId,
    }, handleGraphSuccess, handleGraphException);
  };
  const handleGraphSuccess = (dataObject) => {
    const splitDate = dataObject?.data.map((data) => {
      return data.date
    })

    const splitEnergy = dataObject?.data.map((data) => {
      return data.energyConsum
    })
    setDateLable(splitDate);
    setDataList(splitEnergy);
  };
  const handleGraphException = (errorObject, errorMessage) => {
    // setOpenNotification({
    //   status: true,
    //   type: 'error',
    //   message: errorMessage
    // });
    // setTimeout(() => {
    //   // handleCloseNotification();
    // }, 3000);
  };
  const data = {
    labels: dateLable,
    datasets: [
      {
        label: 'Sample Data',
        data: dataList,
        fill: false,
        borderColor: '#AECEE4',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ position: 'relative', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
      <Line data={data} options={chartOptions} height={80} style={{ borderRadius: '8px' }} />

      <Grid
        container
        spacing={2}
        sm={12}
        style={{
          marginTop: theme.spacing(2),
          borderRadius: '8px',
          marginLeft: '5px'
          // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}
      >
        <Button variant="outlined" style={{ fontSize: '10pt', fontFamily: 'Readex Pro', fontWeight: 'bold', borderRadius: '15px', backgroundColor: '#36b1e2', border: 'none', marginLeft: '2%', width: '125px', marginTop: '10px', color: 'white' }}
          onClick={() => { TodayData('today') }}>TODAY
        </Button>
        <Button variant="outlined" style={{ fontSize: '10pt', fontFamily: 'Readex Pro', fontWeight: 'bold', borderRadius: '15px', backgroundColor: '#36b1e2', border: 'none', marginLeft: '2%', width: '125px', marginTop: '10px', color: 'white' }}
          onClick={() => { TodayData("week") }}>
          THIS WEEK
        </Button>
        <Button variant="outlined" style={{ fontSize: '10pt', fontFamily: 'Readex Pro', fontWeight: 'bold', borderRadius: '15px', backgroundColor: '#36b1e2', border: 'none', marginLeft: '2%', width: '125px', marginTop: '10px', color: 'white' }}
          onClick={() => { TodayData("month") }}>
          THIS MONTH
        </Button>
        <Button variant="outlined" style={{ fontSize: '10pt', fontFamily: 'Readex Pro', fontWeight: 'bold', borderRadius: '15px', backgroundColor: '#36b1e2', border: 'none', marginLeft: '2%', width: '125px', marginTop: '10px', color: 'white' }}
          onClick={() => { TodayData("year") }}>
          THIS YEAR
        </Button>
        <Button variant="outlined" style={{ fontSize: '10pt', fontFamily: 'Readex Pro', fontWeight: 'bold', borderRadius: '15px', backgroundColor: '#36b1e2', border: 'none', marginLeft: '2%', width: '125px', marginTop: '10px', color: 'white' }}
          onClick={() => { TodayData("untilNow") }}>
          UNTIL NOW
        </Button>
      </Grid>
    </div>
  );
};

export default ChartForDashboard;
