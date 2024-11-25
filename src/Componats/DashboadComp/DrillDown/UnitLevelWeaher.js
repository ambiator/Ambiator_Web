import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChartForTodayData from '../../AllChartList/ChartForTodayData'
import OutsideTempSupplyTemp from '../../AllChartList/OutsideTempSupplyTemp'
import SupplyTempSetPointTemp from '../../AllChartList/SupplyTempSetPointTemp'
import { OutSideVsSupTemp } from '../../ApiService/LoginPageService'
import NotificationBar from '../../notification/ServiceNotificationBar'

const UnitLevelWeaher = ({ isId }) => {
    const [chartData, setChartData] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    })
    const ClickOutSideVsSupTemp = (duration, previousDuration = '') => {
        OutSideVsSupTemp({
            deviceId: isId,
            sortDataType: duration,
            previous: previousDuration
        }, handleOutSideSuccess, handleOutSideException);
    };
    // const handleOutSideSuccess = () => {

    // };

    const handleOutSideSuccess = (dataObject) => {
        const transformedData = dataObject.data.map((data) => {
            return { time: data.dateTime, outTemp: data.outTemp, supply: data.supply };
        });

        const transformedData2 = dataObject.data.map((data) => {
            return { time: data.dateTime, supply: data.supply, setPoint: data.setPoint };
        });

        const transformedPreviousData = dataObject.previousData.map((data) => ({
            time: data.dateTime,
            prevOutTemp: data.outTemp,
            prevSupply: data.supply,
        }));
        const combinedData = transformedData.map((data, index) => ({
            ...data,
            prevOutTemp: transformedPreviousData[index]?.prevOutTemp,
            prevSupply: transformedPreviousData[index]?.prevSupply,
        }));
        setChartData(combinedData);

        const transformedPreviousData2 = dataObject.previousData.map((data) => ({
            time: data.dateTime,
            prevSetPoint: data.setPoint,
            prevSupply: data.supply,
        }));
        const combinedData2 = transformedData2.map((data, index) => ({
            ...data,
            prevSetPoint: transformedPreviousData2[index]?.prevSetPoint,
            prevSupply: transformedPreviousData2[index]?.prevSupply,
        }));
        setChartData2(combinedData2);
        // setChartData2(combinedData);
        console.log('transformedData=>', transformedData);
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);

    };


    const handleOutSideException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);
    };
    useEffect(() => {
        OutSideVsSupTemp({
            deviceId: isId,
            sortDataType: "today"
        }, handleOutSideSuccess, handleOutSideException);
    }, []);

    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    };
    return (
        <div>
            <Grid container spacing={2} style={{ marginTop: '20px', padding: '10px' }}>
                <Grid item md={12} style={{ display: 'flex' }}>
                    <Typography
                        style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                        OUTSIDE TEMP vs SUPPLY TEMP
                    </Typography>

                </Grid>
                <Grid item sm={12} md={12}>
                    <OutsideTempSupplyTemp
                        chartData={chartData} />
                </Grid>

                {/* </Grid>
            <Grid container spacing={2}> */}
                <Grid item md={12} style={{ display: 'flex', }}>
                    <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                        SUPPLY TEMP vs SET POINT TEMP
                    </Typography>

                </Grid>
                <Grid item sm={12} md={12}>
                    <SupplyTempSetPointTemp
                        chartData2={chartData2}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px', paddingLeft: '15px' }}>
                {/* <Grid item style={{ display: 'flex', flexDirection: 'row' }}> */}

                <Button style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#36b1e2', color: 'white', border: 'none', borderRadius: '20px', width: '130px', marginLeft: '20px', marginBottom: '6PX' }} variant="contained" onClick={() => { ClickOutSideVsSupTemp('today') }}>TODAY</Button>

                <Button
                    style={{
                        marginLeft: '20px',
                        display: 'flex',
                        fontSize: '14px',
                        fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                        backgroundColor: '#36b1e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        width: '130px',
                        marginBottom: '6PX'
                    }} variant="contained" onClick={() => { ClickOutSideVsSupTemp('week') }}>THIS WEEK</Button>

                <Button
                    style={{
                        marginLeft: '20px',
                        display: 'flex',
                        fontSize: '14px',
                        fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                        backgroundColor: '#36b1e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        width: '130px',
                        marginBottom: '6PX'
                    }} variant="contained" onClick={() => { ClickOutSideVsSupTemp('month') }}>THIS MONTH</Button>

                <Button
                    style={{
                        marginLeft: '20px',
                        display: 'flex',
                        fontSize: '14px',
                        fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                        backgroundColor: '#36b1e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        width: '130px',
                        marginBottom: '6PX'
                    }} variant="contained" onClick={() => { ClickOutSideVsSupTemp('year') }}>THIS YEAR</Button>

                <Button
                    style={{
                        marginLeft: '20px',
                        display: 'flex',
                        fontSize: '14px',
                        fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                        backgroundColor: '#36b1e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        width: '130px',
                        marginBottom: '6PX'
                    }} variant="contained" onClick={() => { ClickOutSideVsSupTemp('untilNow') }}  >UNITL NOW</Button>

                {/* </Grid> */}

            </Grid>
            <Grid container spacing={2} style={{ display: 'flex', marginTop: '20px', flexDirection: 'column' }}>

                <Typography style={{ padding: "10px", paddingLeft: '35px', display: 'flex', fontSize: '18px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex' }}>
                    COMPARE
                </Typography>


                {/* <Grid container style={{ display: 'flex', }}> */}
                <Grid item style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Button
                        style={{
                            marginLeft: '20px',
                            display: 'flex',
                            fontSize: '14px',
                            fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                            backgroundColor: '#36b1e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            width: '130px',
                            marginBottom: '6PX'// Adjust padding for button size
                        }}
                        variant="contained" onClick={() => { ClickOutSideVsSupTemp('week', 'previousWeek') }}>PREV WEEK</Button>

                    <Button
                        style={{
                            marginLeft: '20px',
                            display: 'flex',
                            fontSize: '14px',
                            fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                            backgroundColor: '#36b1e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            width: '130px',
                            marginBottom: '6PX'// Adjust padding for button size
                        }}
                        variant="contained" onClick={() => { ClickOutSideVsSupTemp('month', 'previousMonth') }}>PREV MONTH</Button>
                    <Button
                        style={{
                            marginLeft: '20px',
                            display: 'flex',
                            fontSize: '14px',
                            fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                            backgroundColor: '#36b1e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            width: '130px',
                            marginBottom: '6PX'// Adjust padding for button size
                        }}
                        variant="contained" onClick={() => { ClickOutSideVsSupTemp('year', 'previousYear') }}>PREV YEAR</Button>
                </Grid>

            </Grid>

            {/* </Grid> */}
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div>
    )
}

export default UnitLevelWeaher