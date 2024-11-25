import { Alert, Button, Card, CardContent, Checkbox, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChartForTodayData from '../../AllChartList/ChartForTodayData';
import ChartForEnergyUse from '../../AllChartList/ChartForEnergyUse';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { DeviceStatisticsService, GraphData, InfoDeviceShow, InfoDeviceStatus, InfoDeviceTemp, WaterGarphData } from '../../ApiService/LoginPageService';
import ischeck from '../../../Images/CheckBox.png'
import isNotcheck from '../../../Images/Exp.png'
import ApplicationStore from '../../Utility/localStorageUtil';
import NotificationBar from '../../notification/ServiceNotificationBar';

const DrillDownUnitLevel = ({ setIsDashboard, isId, selectedData, deviceStatu, }) => {
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [outTemp, setOutTemp] = useState("");
    const [outHum, setOutHum] = useState("");
    const [supply, setSupply] = useState("");
    const [setPoint, isSetPoint] = useState("");
    const [fan, setFan] = useState("");
    const [filterClean, setFilterClean] = useState("");
    const [pump, setPump] = useState("");
    const [waterSupply, setwaterSupply] = useState("");
    const [water, setWater] = useState("");
    const [comm, setComm] = useState("");
    const [filterPresent, setFilterPresent] = useState("")
    const [unitType, setUnitType] = useState('');
    const [invNo, setInvNo] = useState('');
    const [invDate, setInvDate] = useState('');
    const [device_type, Setdevice_type] = useState('');
    const [afiliateCode, SetafiliateCode] = useState('');
    const [dateLable, setDateLable] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [pervdateLabel, setPrevdateLabel] = useState([])
    const [pervdataList, setPrevdataList] = useState([])
    const [dateWaterLable, setWaterDateLable] = useState([]);
    const [dataWaterList, setdataWaterList] = useState([]);
    const [prevWaterLabel, setPrevWaterLabel] = useState([])
    const [prevWaterdataList, setPrevWaterdataList] = useState([])
    console.log('prevWaterdataList>>>>>>usestate', prevWaterdataList)
    const [untilinputEnergy, setuntilinputEnergy] = useState('');
    const [untilavoidedEnergy, setuntilavoidedEnergy] = useState('');
    const [untilGhgavoidedEnergy, setuntilGhgavoidedEnergy] = useState('');
    const [inputEnergy, setInputEnergy] = useState('');
    const [avoidEnergy, setAvoidEnergy] = useState('');
    const [inputGhgEnergy, setInputGhgEnergy] = useState('');
    const [performanceList, setPerformanceList] = useState([]);
    const [totalRunHours, setTotalRunHours] = useState('');
    const [totalEnergyUse, setTotalEnergyUse] = useState('');
    const [totalWaterUsed, setTotalWaterUsed] = useState('');

    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    })
    console.log('isId====>', isId);
    console.log('deviceStatu====>', deviceStatu);

    useEffect(() => {
        InfoDeviceTemp({
            deviceId: isId
        }, handleDeviceTempSuccess, handleDeviceTempException);
        InfoDeviceStatus({
            deviceId: isId
        }, handleDeviceStatusSuccess, handleDeviceStatusException);

        DeviceStatisticsService({
            deviceId: isId
        }, handleDeviceStatisticsServiceSuccess, handleDeviceStatisticsServiceException);

        if (selectedData) {
            WaterGarphData({
                sortDataType: 'today',
                deviceId: selectedData?.deviceId,
                // previous: 'previousWeek'
            }, handlewaterSuccess, handlewaterException);
            GraphData({
                sortDataType: 'today',
                deviceId: selectedData?.deviceId,
            }, handleGraphSuccess, handleGraphException);
        }

        setUnitType(selectedData?.deviceId || '');
        Setdevice_type(selectedData?.deviceType || '')
        SetafiliateCode(selectedData?.afiliateCode || '')
        setInvNo(selectedData?.invNo || '')
        setInvDate(selectedData?.invDate || '')

        InfoDeviceShow({
            type: selectedData?.device_type,
            deviceId: selectedData?.deviceId
        }, handleDeviceShowSuccess, handleDeviceShowException);

    }, []);

    const handleDeviceStatisticsServiceSuccess = (dataObject) => {
        // setPerformanceList(dataObject?.data || []);
        const runHours = parseFloat(dataObject?.data[0]?.value);
        const energyUse = parseFloat(dataObject?.data[1]?.value);
        const waterUsed = parseFloat(dataObject?.data[2]?.value);
        setTotalRunHours(runHours);
        setTotalEnergyUse(energyUse);
        setTotalWaterUsed(waterUsed);
    }
    const handleDeviceStatisticsServiceException = (error, errorMessage) => {
        console.log(errorMessage)
    }

    const handleDeviceTempSuccess = (dataObject) => {
        setOutTemp(dataObject?.data?.outTemp || '0');
        setOutHum(dataObject?.data?.outHum || '0');
        setSupply(dataObject?.data?.supply || '0');
        isSetPoint(dataObject?.data?.setPoint || '0');
    };

    const handleDeviceTempException = (error, errorMessage) => {
        console.log(errorMessage)
    };

    const handleDeviceStatusSuccess = (dataObject) => {
        setFan(dataObject?.data?.fan || '0');
        setFilterClean(dataObject?.data?.filterClean || '0');
        setPump(dataObject?.data?.pump || '0');
        setwaterSupply(dataObject?.data?.waterSupply || '0');
        setWater(dataObject?.data?.water || '0');
        setComm(dataObject?.data?.comm || '0');
        setFilterPresent(dataObject?.data?.filterPresent || "0");

    };

    const handleDeviceStatusException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
    };
    const TodayData = (duration, previousDuration = '') => {
        WaterGarphData({
            sortDataType: duration,
            deviceId: isId,
            previous: previousDuration
        }, handlewaterSuccess, handlewaterException);
        GraphData({
            sortDataType: duration,
            deviceId: isId,
            previous: previousDuration
        }, handleGraphSuccess, handleGraphException);
    };
    const handleGraphSuccess = (dataObject) => {
        const splitDate = dataObject?.data.map((data) => {
            return data.date
        })

        const splitEnergy = dataObject?.data.map((data) => {
            return data.energyConsum
        })

        const prevsplitDate = dataObject?.previousData.map((data) => {
            return data.date
        })

        const prevsplitEnergy = dataObject?.previousData.map((data) => {
            return data.energyConsum
        })



        setDateLable(splitDate);
        setDataList(splitEnergy);
        setPrevdateLabel(prevsplitDate);
        setPrevdataList(prevsplitEnergy)

        // console.log("splitEnergydata===>", splitEnergy);
        // console.log("tsetPrevdataList===>", prevsplitEnergy);

        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);
    };
    const handleGraphException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);
    };

    const handlewaterSuccess = (dataObject) => {
        const splitWaterDate = dataObject?.data.map((data) => {
            return data.date
        })
        const splitWaterConsum = dataObject?.data.map((data) => {
            return data.waterConsum
        })
        const prevWaterDate = dataObject?.previousData.map((data) => {
            return data.date
        })

        const prevWaterEnergy = dataObject?.previousData.map((data) => {
            return data.waterConsum
        })

        setWaterDateLable(splitWaterDate);
        setdataWaterList(splitWaterConsum);
        setPrevWaterLabel(prevWaterDate);
        setPrevWaterdataList(prevWaterEnergy);

        console.log("splitWaterConsum===>", splitWaterConsum);
        console.log("prevWaterEnergy===>prev", prevWaterEnergy);


        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);
    };
    const handlewaterException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotification();
        }, 3000);
    };
    useEffect(() => {
        WaterGarphData({
            sortDataType: 'today',
            deviceId: isId
        }, handlewaterSuccess, handlewaterException);
        GraphData({
            sortDataType: 'today',
            deviceId: isId,
        }, handleGraphSuccess, handleGraphException);
    }, []);

    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    };
    const handleDeviceShowSuccess = (dataObject) => {
        setuntilinputEnergy(dataObject?.untilInputEnergy || '0')
        setuntilavoidedEnergy(dataObject?.untilAvoidedEnergy || '0')
        setuntilGhgavoidedEnergy(dataObject?.untilGhgAvoidedTonsCo2e || '0')
        setInputEnergy(dataObject?.todayInputEnergy || '0')
        setAvoidEnergy(dataObject?.todayAvoidedEnergy || '0')
        setInputGhgEnergy(dataObject?.TodayGhgAvoidedTonsCo2e || '0')

    };
    const handleDeviceShowException = () => {

    };
    const formatNumber = (num) => {
        console.log('Input value:', num);

        const numericValue = parseFloat(num);

        if (isNaN(numericValue)) {
            console.error('Invalid number provided:', num);
            return 'Invalid number';
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

    const formattedNumberUnit = formatNumber(untilinputEnergy);
    const formattedNumber = formatNumber(untilavoidedEnergy);
    const formattedNumberGHG = formatNumber(untilGhgavoidedEnergy);
    const formattedTodayInput = formatNumber(inputEnergy);
    const formattedTodayAvoided = formatNumber(avoidEnergy);
    const formattedTodayGHG = formatNumber(inputGhgEnergy);



    return (
        <div style={{ margin: '30px 25px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6.3}>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Unit Serial No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {unitType}
                        </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Unit Type.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {device_type}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Customer Name.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.userName}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Company Name.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.companyName}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Contact No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.phoneNo}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Customer Address.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.address}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            City.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.city}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Affiliate Code.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {afiliateCode}
                        </Typography>
                    </div>


                </Grid>
                <Grid item xs={12} md={5.3}>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Invoice No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            {invNo}
                        </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Invoice Date.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            {invDate}
                        </Typography>

                    </div>
                    <div>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            First Start Date.
                        </Typography>
                    </div>
                    <div>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                            Last Used Date.
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: "center", }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Challenge History.
                        </Typography>
                        <div>

                            <Button
                                onClick={() => {
                                    setIsDashboard(5);
                                }}
                                style={{
                                    borderRadius: '20px',
                                    color: 'white',
                                    backgroundColor: '#023469',
                                    fontWeight: 'bold',
                                    marginBottom: '2px',
                                    marginLeft: '10px',
                                    fontSize: '20px',
                                    padding: '2px',
                                    textAlign: 'center'
                                }}
                                variant="contained"
                            >
                                <div style={{ marginTop: '-10px' }}>
                                    ...
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Button
                            style={{
                                backgroundColor: '#023469',
                                color: 'white',
                                fontSize: '14px',
                                fontFamily: 'Readex Pro',
                                fontWeight: 'bold', borderRadius: '20px',
                            }}
                            onClick={() => {
                                setIsDashboard(4);
                            }}
                        >
                            VIEW & MANAGE
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Typography style={{ display: 'flex', fontSize: '18px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                            Device Status
                        </Typography>

                    </Grid>
                    <Card
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            width: '100%',
                            // height: '34vh',
                            height: '87%',
                            marginTop: '3px'
                        }}
                    >
                        <CardContent >
                            <Grid container spacing={2} >
                                <Grid item xs={6} md={6} >
                                    <Grid container spacing={2}>
                                        <Grid item sm={7} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Fan
                                            </Typography>
                                        </Grid>
                                        {fan === '0' ? (
                                            <Grid item md={6}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px' }} />
                                            </Grid>) : (
                                            <Grid item md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px' }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={11} md={7.8} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Filter Clean
                                            </Typography>
                                        </Grid>
                                        {filterClean == '0' ? (
                                            <Grid item md={4}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>) : (
                                            <Grid item md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={7} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Pump
                                            </Typography>
                                        </Grid>
                                        {pump == '0' ? (
                                            <Grid item md={6}>

                                                <img src={ischeck} style={{ width: '25px', height: '25px' }} />
                                            </Grid>) : (
                                            <Grid item md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px' }} />

                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={11} md={7.8} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Water Supply
                                            </Typography>
                                        </Grid>
                                        {waterSupply == '0' ? (
                                            <Grid item md={4}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>) : (
                                            <Grid item md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={7} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Water Flow
                                            </Typography>
                                        </Grid>
                                        {water == '0' ? (
                                            <Grid item md={6}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px' }} />
                                            </Grid>) : (
                                            <Grid item md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px' }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                                    <Grid container spacing={2}>
                                        <Grid item sm={11} md={7.8} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Comm
                                            </Typography>
                                        </Grid>
                                        {comm == '0' ? (
                                            <Grid item md={4}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>) : (
                                            <Grid item md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', height: '25px', marginLeft: '-50px' }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={7} md={8} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                Filter present
                                            </Typography>
                                        </Grid>
                                        {filterPresent == '0' ? (
                                            <Grid item md={2}>
                                                <img src={ischeck} style={{ width: '25px', height: '25px', }} />
                                            </Grid>) : (
                                            <Grid item md={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={isNotcheck} style={{ width: '25px', }} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={5} xl={5} style={{ display: 'flex', alignItems: 'flex-end', marginTop: '32px' }}>
                    <Grid container spacing={1} style={{}}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '12vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <Grid md={12}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                OUTSIDE
                                            </Typography>
                                        </Grid>

                                        <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <DeviceThermostatIcon style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }} />
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }}>
                                                {outTemp}
                                            </Typography>
                                            <Typography style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }}>
                                                <sup style={{ fontSize: '9px' }}>o</sup>c
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '12vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <Grid md={12}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                OUTSIDE
                                            </Typography>
                                        </Grid>
                                        <Grid md={11} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <WaterDropIcon style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }} />
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }}>
                                                {outHum}
                                            </Typography>
                                            <Typography style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#DB7210' }}>
                                                %
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '12vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <Grid md={12}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                SUPPLY
                                            </Typography>
                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <DeviceThermostatIcon style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#34b0e2' }} />
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#34b0e2' }}>
                                                {supply}
                                            </Typography>
                                            <Typography style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#34b0e2' }}>
                                                <sup style={{ fontSize: '9px' }}>o</sup>c
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '12vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <Grid md={12}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                SET POINT
                                            </Typography>

                                        </Grid>

                                        <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <DeviceThermostatIcon style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', fontWeight: 'bold', color: '#34b0e2' }} />
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#34b0e2' }}>
                                                {setPoint}
                                            </Typography>
                                            <Typography style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Readex Pro', color: '#34b0e2' }} >
                                                <sup style={{ fontSize: '9px' }}>o</sup>c
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container spacing={2} style={{ padding: '2px', marginTop: '10px' }}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '80%',
                                    height: '22vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent style={{ display: 'contents' }}>
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '5px' }}>
                                        <Grid md={12} style={{ display: 'flex', }}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                RUN HOURS
                                            </Typography>

                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px' }}>
                                            <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                {totalRunHours}
                                            </Typography>
                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                            <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                Hours
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '80%',
                                    height: '22vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent style={{ display: 'contents' }}>
                                    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '6px' }}>
                                        <Grid md={12} style={{ display: 'flex', }}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                ENERGY USE
                                            </Typography>

                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                            <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                {totalEnergyUse}
                                            </Typography>

                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                            <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                kWh
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '80%',
                                    height: '22vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardContent style={{ display: 'contents' }}>
                                    <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                        <Grid md={12} style={{ display: 'flex', }}>
                                            <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', }}>
                                                WATER USED
                                            </Typography>
                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                            <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                {totalWaterUsed}
                                            </Typography>
                                        </Grid>
                                        <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                            <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                Liters
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card style={{
                        borderRadius: '20px',
                        transition: 'transform 0.2s',
                        width: '100%',
                        height: '30vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D9D9D9'
                    }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} >
                                <div>
                                    <Typography style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', marginLeft: '15px' }}>
                                        TODAY
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro' }}>
                                                    INPUT ENERGY
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedTodayInput}
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    kWh
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                    AVOIDED ENERGY
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedTodayAvoided}
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    kWh
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                    GHG AVOIDED
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedTodayGHG}
                                                </Typography>
                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    Tons CO2e
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </Grid>

                        </Grid>
                    </Card>
                </Grid >

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card style={{
                        borderRadius: '20px',
                        transition: 'transform 0.2s',
                        width: '100%',
                        height: '30vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D9D9D9'
                    }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div>
                                    <Typography style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', marginLeft: '15px' }}>
                                        UNTIL NOW
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                    INPUT ENERGY
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedNumberUnit}
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    kWh
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                                    AVOIDED ENERGY
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedNumber}
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    kWh
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '-10px' }}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '80%',
                                        height: '22vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent style={{ display: 'contents' }}>
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px', marginLeft: '10px' }}>
                                            <Grid md={12} style={{ display: 'flex', }}>
                                                <Typography style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Readex Pro', fontWeight: 'bold', marginTop: '0px' }}>
                                                    GHG AVOIDED
                                                </Typography>
                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '40px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                                                    {formattedNumberGHG}
                                                </Typography>
                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', marginLeft: '5px', flexdirection: 'column', alignitems: 'flex-start' }}>
                                                <Typography style={{ fontSize: '14px', fontFamily: 'Readex Pro', fontWeight: 'bold', fontWeight: 'bold', marginTop: '-10px' }}>
                                                    Tons CO2e
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid >

                <Grid container spacing={2} style={{ width: '100%', marginTop: '20px' }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <ChartForEnergyUse
                            dateLable={dateLable}
                            dataList={dataList}
                            pervdateLabel={pervdateLabel}
                            pervdataList={pervdataList}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ width: '100%', marginTop: '20px' }}>

                    <Grid item xs={12} sm={12} md={12}>
                        <ChartForTodayData
                            dateWaterLable={dateWaterLable}
                            dataWaterList={dataWaterList}
                            prevWaterLabel={prevWaterLabel}
                            prevWaterdataList={prevWaterdataList}

                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '20px', }}>
                    <Button
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                            backgroundColor: '#36b1e2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            width: '130px',
                            marginLeft: '20px',
                            marginBottom: '6PX'
                        }}
                        variant="contained"
                        onClick={() => { TodayData('today') }}>TODAY
                    </Button>

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
                        }}
                        variant="contained"
                        onClick={() => { TodayData('week') }}>THIS WEEK
                    </Button>

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
                            width: '129.6px',
                            marginBottom: '6PX'
                        }} variant="contained" onClick={() => { TodayData('month') }} >THIS MONTH
                    </Button>

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
                        }} variant="contained" onClick={() => { TodayData('year') }}>THIS YEAR
                    </Button>

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
                        }} variant="contained" onClick={() => { TodayData('untilNow') }}>UNITL NOW
                    </Button>

                </Grid>

                <Grid container spacing={2} style={{ display: 'flex', marginTop: '20px', flexDirection: 'column' }}>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', marginLeft: '20px', marginTop: '2px' }}>
                        COMPARE
                    </Typography>
                    <Grid container style={{ marginTop: '10px' }}>
                        <Grid item sm={12} md={8} lg={8} style={{ display: 'flex', marginTop: '7px', flexWrap: 'wrap', rowGap: '7px' }}>
                            <Button
                                style={{
                                    backgroundColor: '#36b1e2',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontFamily: 'Readex Pro',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    marginLeft: '20px',
                                    border: 'none',
                                    width: '130px',
                                    height: '40px'
                                }} variant="contained" onClick={() => { TodayData('week', 'previousWeek') }}>PREV WEEK</Button>

                            <Button
                                style={{
                                    display: 'flex',
                                    backgroundColor: '#36b1e2',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontFamily: 'Readex Pro',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    marginLeft: '20px',
                                    border: 'none',
                                    width: '130px',
                                    height: '40px',
                                }} variant="contained" onClick={() => { TodayData('month', 'previousMonth') }}>PREV MONTH</Button>

                            <Button
                                style={{
                                    backgroundColor: '#36b1e2',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontFamily: 'Readex Pro',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    marginLeft: '20px',
                                    border: 'none',
                                    width: '130px',
                                    height: '40px'
                                }} variant="contained" onClick={() => { TodayData('year', 'previousYear') }}>PREV YEAR</Button>

                        </Grid>

                        <Grid item md={4} >
                            <Button
                                style={{
                                    backgroundColor: '#023469',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontFamily: 'Readex Pro',
                                    fontWeight: 'bold', borderRadius: '20px', margin: '10px'
                                }}
                                onClick={() => {
                                    setIsDashboard(2);
                                }} variant="contained">More on Weather</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div >
    );
};

export default DrillDownUnitLevel;
