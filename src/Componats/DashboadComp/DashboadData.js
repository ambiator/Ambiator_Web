import { Card, CardActions, Grid, Textarea } from '@mui/joy'
import React, { useEffect } from 'react'
import '../DashboadComp/DashoadDtaCss.css';
import { CardContent, Chip, TextField, Typography } from '@mui/material';
import ChartForDashboard from '../AllChartList/ChartForDashboard';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
// import GoogleMapReactModule from '../GoogleMap/GoogleMapReactModule';
import GoogleMapAPIModule from '../GoogleMap/GoogleMapAPIModule';
import { DeviceTypeShow, InfoDeviceShow } from '../ApiService/LoginPageService';
import { useState } from 'react';
import AmazonMap from '../GoogleMap/AmazonMap';
import MapChart from '../GoogleMap/AmazonMap';
import GoogleMapReactModule from '../GoogleMap/GoogleMapReactModule';
import WorldMap from '../GoogleMap/WorldMap';
import StreetMap from '../GoogleMap/StreetMap';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#02316a' : '#308fe8',
    },
}));

const DashboadData = ({ setIsDashboard, setFilterId, filterId, isId, setSelectedData }) => {

    const [installedCount, setInstalledCount] = useState('');
    const [activeCount, setActiveCount] = useState('');
    const [alertsCount, setAlertsCount] = useState('');
    const [todayInputEnergy, setTodayInputEnergy] = useState('');
    const [TodayGhgAvoidedTonsCo2e, setTodayGhgAvoidedTonsCo2e] = useState('');
    const [todayAvoidedEnergy, setTodayAvoidedEnergy] = useState('');
    const [untilAvoidedEnergy, setUntilAvoidedEnergy] = useState('');
    const [untilGhgAvoidedTonsCo2e, setUntilGhgAvoidedTonsCo2e] = useState('');
    const [untilInputEnergy, setUntilInputEnergy] = useState('');
    const [locations, setLocations] = useState([]);
    const [Device, SetDevice] = useState('');
    const [Devicelist, SetDeviceList] = useState([]);


    useEffect(() => {
        const storedDevice = localStorage.getItem('selectedDevice') || 'All';
        SetDevice(storedDevice);
        setFilterId(storedDevice);
        InfoDeviceShow({
            type: storedDevice === 'All' ? "" : storedDevice,
            // deviceId:
        }, handleInfoDeviceShowSuccess, handleInfoDeviceShowException);

        DeviceTypeShow(handleDeviceTypesucess, handleDeviceTypeException)
    }, [Device]);


    const handleInfoDeviceShowSuccess = (dataObject) => {
        setInstalledCount(dataObject?.installedCount || '0');
        setActiveCount(dataObject?.activeCount || '0');
        setAlertsCount(dataObject?.alertsCount || '0');
        setTodayInputEnergy(dataObject?.todayInputEnergy || '0');
        setTodayGhgAvoidedTonsCo2e(dataObject?.TodayGhgAvoidedTonsCo2e || '0');
        setTodayAvoidedEnergy(dataObject?.todayAvoidedEnergy || '0');
        setUntilAvoidedEnergy(dataObject?.untilAvoidedEnergy || '0');
        setUntilGhgAvoidedTonsCo2e(dataObject?.untilGhgAvoidedTonsCo2e || '0');
        setUntilInputEnergy(dataObject?.untilInputEnergy || '0');
        setLocations(dataObject?.locations || []);
    }

    const handleInfoDeviceShowException = () => {

    };

    const handleDeviceTypesucess = (dataObject) => {
        SetDeviceList(dataObject.data)
    };
    const handleDeviceTypeException = () => {

    };
    // const formatNumber = (num) => {
    //     const numStr = num.toString();
    //     return numStr.length > 5 ? numStr.slice(0, 7) + '...' : numStr;
    // };

    // const formatNumber = (num) => {
    //     // Format the number to 2 decimal places
    //     const formattedNum = num.toFixed(2);
    //     // Convert the formatted number to a string
    //     const numStr = formattedNum.toString();
    //     // Check the length of the string
    //     return numStr.length > 5 ? numStr.slice(0, 7) + '...' : numStr;
    // };

    const formatNumber = (num) => {
        console.log('Input value:', num);

        const numericValue = parseFloat(num);

        if (isNaN(numericValue)) {
            console.error('Invalid number provided:', num);
            return '';
        }

        // if (numericValue === 0) {
        //     return '0';
        // }

        // Convert to string to check decimal places
        const numStr = numericValue.toString();

        // Determine if the number has a decimal part
        const hasDecimal = numStr.includes('.');

        // If it has a decimal part, format accordingly
        let formattedNum;
        if (hasDecimal) {
            const decimalPart = numStr.split('.')[1];
            if (decimalPart.length === 1) {
                formattedNum = numericValue.toFixed(1); // One decimal place
            } else if (decimalPart.length === 2) {
                formattedNum = numericValue.toFixed(2); // Two decimal places
            } else {
                formattedNum = numericValue.toFixed(2); // Default to two decimal places if more than 2 decimals
            }
        } else {
            formattedNum = numStr; // No decimal part, show as is
        }

        // Check the length of the formatted number string
        return formattedNum.length > 7 ? formattedNum.slice(0, 7) + '...' : formattedNum;
    };

    const formattedNumberUnit = formatNumber(untilInputEnergy);
    const formattedNumber = formatNumber(untilAvoidedEnergy);
    const formattedNumberGHG = formatNumber(untilGhgAvoidedTonsCo2e);
    const formattedTodayInput = formatNumber(todayInputEnergy);
    const formattedTodayAvoided = formatNumber(todayAvoidedEnergy);
    const formattedTodayGHG = formatNumber(TodayGhgAvoidedTonsCo2e);



    return (
        <Grid container spacing={2} style={{ width: '90%', height: '100%', marginTop: '-5px', marginLeft: '4%' }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    {/* <InputLabel id="demo-simple-select-standard-label">All</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={Device}
                        onChange={(e) => {
                            // SetDevice(e.target.value)
                            // setFilterId(e.target.value)
                            const selectedValue = e.target.value;
                            SetDevice(selectedValue);
                            setFilterId(selectedValue);
                            localStorage.setItem('selectedDevice', selectedValue);
                            InfoDeviceShow({ type: selectedValue === 'All' ? "" : selectedValue }, handleInfoDeviceShowSuccess, handleInfoDeviceShowException);

                        }}
                        label="Device"
                        style={{ fontSize: '18px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}

                    >
                        <MenuItem value="All">ALL</MenuItem>
                        {Devicelist.map((data) => {
                            return (
                                <MenuItem value={data.id}> {data.deviceType}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid container >
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Card className="card" style={{ borderRadius: "25px", cursor: "pointer" }}
                        onClick={() => {
                            setIsDashboard(3);
                        }
                        }>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                    INSTALLED
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro' }}>
                                    {installedCount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderTop: 'solid', borderColor: '#dbdbdb' }}>

                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                    <Card className="card" style={{ borderRadius: "25px", cursor: "pointer" }}
                        onClick={() => {
                            setIsDashboard(6);
                        }
                        }
                    >
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                    ACTIVE
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro' }}>
                                    {activeCount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderTop: 'solid', borderColor: '#dbdbdb', padding: '10px' }}>
                                <BorderLinearProgress style={{ height: '7px' }} variant="determinate" value={activeCount} />
                                <Typography style={{ display: 'flex', fontSize: '12pt', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                    Active vs Installed : {activeCount}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                    <Card className="card" style={{ borderRadius: "25px", cursor: "pointer" }} onClick={() => {
                        setIsDashboard(7);
                    }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                    ALERTS
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', color: "#8E0808" }}>
                                    {alertsCount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderTop: 'solid', borderColor: '#dbdbdb', padding: '10px' }}>
                                <BorderLinearProgress style={{ height: '7px' }} variant="determinate" value={alertsCount} />
                                <Typography style={{ display: 'flex', fontSize: '12pt', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                    Challenges vs Active :  {alertsCount}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} lx={12}
                    style={{ backgroundColor: "#D9D9D9", borderRadius: '20px', marginTop: '9px' }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <Typography style={{
                            display: 'flex',
                            fontSize: '12pt',
                            fontWeight: 'bold',
                            fontFamily: 'Readex Pro ',
                            marginBottom: '-15px',
                            padding: '5px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginLeft: '15px'
                        }}>
                            TODAY
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4}  >
                        <Card className="card" style={{ borderRadius: "25px" }} >
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        INPUT ENERGY
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star' }}>
                                        {formattedTodayInput}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        kWh
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                        <Card className="card" style={{ borderRadius: "25px" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        AVOIDED ENERGY
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star' }}>
                                        {formattedTodayAvoided}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        KWh
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                        <Card className="card" style={{ borderRadius: "25px" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        GHG AVOIDED
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star' }}>
                                        {formattedTodayGHG}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        Tons CO2e
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} lx={12}
                    style={{ backgroundColor: "#D9D9D9", borderRadius: '20px', marginTop: '25px' }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <Typography style={{
                            display: 'flex',
                            fontSize: '12pt',
                            fontWeight: 'bold',
                            fontFamily: 'Readex Pro ',
                            marginBottom: '-15px',
                            padding: '5px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginLeft: '15px'
                        }}>
                            UNTIL NOW
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                        <Card className="card" style={{ borderRadius: "25px" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        INPUT ENERGY
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star' }}>
                                        {formattedNumberUnit}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        kWh
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                        <Card className="card" style={{ borderRadius: "25px" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        AVOIDED ENERGY
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{
                                        fontSize: '40pt',
                                        fontWeight: 'bold',
                                        fontFamily: 'Readex Pro',
                                        display: 'flex',
                                        alignItems: 'flex-star',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {formattedNumber}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        kWh
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} lx={4} >
                        <Card className="card" style={{ borderRadius: "25px" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                        GHG AVOIDED
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <Typography style={{ fontSize: '40pt', fontWeight: 'bold', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', maxWidth: '100%' }}>
                                        {formattedNumberGHG}
                                    </Typography>
                                    <Typography style={{ fontSize: '14pt', fontFamily: 'Readex Pro', display: 'flex', alignItems: 'flex-star', marginTop: '-20px' }}>
                                        Tons CO2e
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={'19px'} style={{ width: '100%', }}>
                <ChartForDashboard
                    filterId={filterId}

                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card className="card3" style={{ height: '60vh' }} >
                    <CardActions >
                        {/* <p>map </p> */}
                        {/* <GoogleMapAPIModule locations={locations} /> */}
                        <StreetMap
                            filterId={filterId}
                            setIsDashboard={setIsDashboard}
                            setSelectedData={setSelectedData}
                        />
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default DashboadData