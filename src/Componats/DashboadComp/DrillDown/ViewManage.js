import { Card, CardContent, Grid, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Switch from '@mui/material/Switch';
import UtilityForManage from '../UtilityForManage';
import CircularSliderControler from '../../CircularSlider/CircularSliderControler';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeSetPoint, Changemachine, DayHealShow, DeviceStatisticsService, InStallerShedule, InfoDayTime, InfoDeviceId, InfoDeviceTemp, InfoModeShedule, InfoShedule, OtaUpgradeService, ScheduleDayScheduleState, ScheduleWebDevSchedList, SelfHealState, StateAutomode, StateFan, StateHumadity, UserSheduleState, WIFIUpgradeService } from '../../ApiService/LoginPageService';
import TimeSet from '../TimeSet/TimeSet';
import powerOn from '../../../Images/powerOn.jpg'
import powerOff from '../../../Images/powerOff.jpg'
import LocationIcon from '../../../Images/location.jpg'
import { Schedule } from '@mui/icons-material';
import ApplicationStore from '../../Utility/localStorageUtil';
import CircularProgress from '@mui/material/CircularProgress';
import NotificationBar from '../../notification/ServiceNotificationBar';
import SettingsIcon from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import { useData } from '../../GlobleDataSet/GlobleDataSet';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import UpdateWifi from './UpdateWifi';

const convertTo12HourFormat = (time24hr) => {
    const [hours, minutes, seconds] = time24hr.split(':');
    let period = 'A';
    let hours12 = parseInt(hours, 10);
    if (hours12 === 12) {
        period = 'P';
    }
    if (hours12 > 12) {
        hours12 -= 12;
        period = 'P';
    }
    if (hours12 === 0) {
        hours12 = 12;
    }

    return `${hours12}:${minutes} ${period}`;
};
const ViewManage = ({ isId, deviceStatu, selectedData }) => {
    console.log("selectedData788787878787878787878", selectedData.device_state)
    const [ssid, setSSID] = useState("");
    const [wifipassword, setwifiPassword] = useState("");
    const [loadingbutton, Setloadingbutton] = useState(false);
    const [loadingbuttonoff, Setloadingbuttonoff] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingOta, setLoadingOta] = useState(false);
    const [loadingwifi, setLoadingwifi] = useState(false);
    const [week, SetWeek] = useState('');
    const [time, SetTime] = useState('');
    const [installerState, SetInstallerState] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [MonSchedule, SetMonSchedule] = useState(true);
    const [TueSchedule, SetTueSchedule] = useState(true);
    const [WedSchedule, SetWedSchedule] = useState(true);
    const [ThuSchedule, SetThuSchedule] = useState(true);
    const [FriSchedule, SetFriSchedule] = useState(true);
    const [SatSchedule, SetSatSchedule] = useState(true);
    const [SunSchedule, SetSunSchedule] = useState(true);
    const [useSchedulerState, SetuseSchedulerState] = useState(false);
    const [installerOverrideModeState, SetinstallerOverrideModeState] = useState(false);
    const [autoModeState, SetautoModeState] = useState(false);
    const [outTemp, setOutTemp] = useState("");
    const [outHum, setOutHum] = useState("");
    const [supply, setSupply] = useState("");
    const [setPoint, isSetPoint] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [selfHealTime, setSelfHealTime] = useState("");
    const [MonStartTime, SetMonStartTime] = useState("");
    const [MonEndTime, SetMonEndTime] = useState("");
    const [TueStartTime, SetTueStartTime] = useState("");
    const [TueEndTime, SetTueEndTime] = useState("");
    const [WedStartTime, SetWedStartTime] = useState("");
    const [WedEndTime, SetWedEndTime] = useState("");
    const [ThuStartTime, SetThuStartTime] = useState("");
    const [ThuEndTime, SetThuEndTime] = useState("");
    const [FriStartTime, SetFriStartTime] = useState("");
    const [FriEndTime, SetFriEndTime] = useState("");
    const [SatStartTime, SetSatStartTime] = useState("");
    const [SatEndTime, SetSatEndTime] = useState("");
    const [SunStartTime, SetSunStartTime] = useState("");
    const [SunEndTime, SetSunEndTime] = useState("");
    const [manualFanSpeed, setManualFanSpeed] = useState("");
    const [iosFanSpeed, SetIosFanSpeed] = useState("");
    const [manualHum, SetManualHum] = useState(false);
    const [iosHum, SetIosHum] = useState(false);
    const [open, setOpen] = useState(false);
    const [dayTopCheck, setDayTopCheck] = useState('');
    const [dayBotCheck, setDayBotCheck] = useState('');
    const [data, setData] = useState('');
    const [mondayStat, setMondayStat] = useState(false);
    const [tuesdayStat, setTuesdaystat] = useState(false);
    const [wednesdayStat, setWednesdayStat] = useState(false);
    const [thursdayStat, setThursdayStat] = useState(false);
    const [fridayStat, setFridayStat] = useState(false);
    const [saturdayStat, setSaturdayStat] = useState(false);
    const [sundayStat, setSundayStat] = useState(false);
    const [open1, setOpen1] = useState(false);
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const { deviceSelectStatus, setDeviceSelectStatus } = useData();
    const [localStatus, setLocalStatus] = useState(selectedData.device_state);
    const [deviceStatics, setDeviceStatics] = useState([]);
    console.log("123deviceStatics", deviceStatics)
    const [location, SetLocation] = useState("");


    useEffect(() => {
        console.log('deviceSelectStatus==>', deviceSelectStatus?.device_state);
        if (deviceSelectStatus?.device_state) {
            setLocalStatus(deviceSelectStatus?.device_state);
        } else {
            setLocalStatus(deviceSelectStatus);
            console.log('deviceSelectStatuselse==>', deviceSelectStatus)
        }
    }, [deviceSelectStatus]);

    const handleCloseNotify = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    useEffect(() => {
        InfoDeviceTemp({
            deviceId: isId
        }, handleDeviceTempSuccess, handleDeviceTempException);
        InfoDayTime({
            deviceId: isId
        }, handleDayTimeSuccess, handleDayTimeException);

        InfoModeShedule({
            deviceId: isId
        }, handleModeSuccess, handleModeException);
        InfoShedule({
            deviceId: isId
        }, handleSheduleSuccess, handleSheduleException);
        DayHealShow({
            deviceId: isId,
        }, handleGDayHealSucess, handleGDayHealException);


    }, [deviceStatu]);

    useEffect(() => {

        ScheduleWebDevSchedList({
            deviceId: isId
        }, handleWebDevSchedListSucess, handleWebDevSchedListException);

        DayHealShow({
            deviceId: isId,
        }, handleGDayHealSucess, handleGDayHealException);

        DeviceStatisticsService({
            deviceId: isId,
        }, handleStatisticsSuccess, handleStatisticsException);

    }, [refreshData]);

    const handleWebDevSchedListSucess = (dataObject) => {
        setData(dataObject.data || '');

        setMondayStat(dataObject?.data?.Mon?.schedule);
        setTuesdaystat(dataObject?.data?.Tue?.schedule);
        setWednesdayStat(dataObject?.data?.Wed?.schedule);
        setThursdayStat(dataObject?.data?.Thu?.schedule);
        setFridayStat(dataObject?.data?.Fri?.schedule);
        setSaturdayStat(dataObject?.data?.Sat?.schedule);
        setSundayStat(dataObject?.data?.Sun?.schedule);

    }
    const handleWebDevSchedListException = (errorObject, errorMessage) => {

    };

    const handleDeviceTempSuccess = (dataObject) => {
        setOutTemp(dataObject?.data?.outTemp || '0');
        setOutHum(dataObject?.data?.outHum || '0');
        setSupply(dataObject?.data?.supply || '0');
        isSetPoint(dataObject?.data?.setPoint || '0');
        // setRefreshData((oldValue) => !oldValue);

    };
    const handleDeviceTempException = () => {

    };

    const handleDayTimeSuccess = (dataObject) => {
        setDayOfWeek(dataObject?.data[0]?.dayOfWeek || "");
        setSelfHealTime(dataObject?.data[0]?.selfHealTime || "");
    };
    const handleDayTimeException = () => {

    };

    const handleSheduleSuccess = (dataObject) => {
        SetuseSchedulerState(dataObject?.useSchedulerState || "")
        SetMonStartTime(dataObject?.data?.MonStartTime || "");
        SetMonEndTime(dataObject?.data?.MonEndTime || "");
        SetTueStartTime(dataObject?.data?.TueStartTime || "");
        SetTueEndTime(dataObject?.data?.TueEndTime || "");
        SetWedStartTime(dataObject?.data?.WedStartTime || "");
        SetWedEndTime(dataObject?.data?.WedEndTime || "");
        SetThuStartTime(dataObject?.data?.ThuStartTime || "");
        SetThuEndTime(dataObject?.data?.ThuEndTime || "");
        SetFriStartTime(dataObject?.data?.FriStartTime || "");
        SetFriEndTime(dataObject?.data?.FriEndTime || "");
        SetSatStartTime(dataObject?.data?.SatStartTime || "");
        SetSatEndTime(dataObject?.data?.SatEndTime || "");
        SetSunStartTime(dataObject?.data?.SunStartTime || "");
        SetSunEndTime(dataObject?.data?.SunEndTime || "");
        SetMonSchedule(dataObject?.data?.MonSchedule || "");
        SetTueSchedule(dataObject?.data?.SetTueSchedule || "");
        SetWedSchedule(dataObject?.data?.WedSchedule || "");
        SetThuSchedule(dataObject?.data?.ThuSchedule || "");
        SetFriSchedule(dataObject?.data?.FriSchedule || "");
        SetSatSchedule(dataObject?.data?.SatSchedule || "");
        SetSunSchedule(dataObject?.data?.SunSchedule || "");

    };

    const handleSheduleException = () => {

    };

    const handleModeSuccess = (dataObject) => {
        setManualFanSpeed(dataObject?.data?.manualFanSpeed || "")
        SetIosFanSpeed(dataObject?.data?.iosFanSpeed || "")
        SetManualHum(dataObject?.data?.manualHum || "")
        SetIosHum(dataObject?.data?.iosHum || "")
        SetautoModeState(dataObject?.data?.autoModeState || "")
        setSSID(dataObject?.data?.ssId || "")
        console.log("dataObject?.data?.ssId || ", dataObject?.data?.ssId || "")
        setwifiPassword(dataObject?.data?.wifiPassword || "")
        SetinstallerOverrideModeState(dataObject?.data?.installerOverrideModeState || "")
        // const locationData = dataObject?.data?.location ? JSON.parse(dataObject.data.location) : {};
        // const { latitude, longitude } = locationData;
        // SetLocation(` ${latitude || ""},${longitude || ""}`);
        const locationData = dataObject?.data?.location ? JSON.parse(dataObject.data.location) : null;
        const locationString = locationData ? `${locationData.latitude}, ${locationData.longitude}` : "Location not available";
        SetLocation(locationString);

    };

    const handleModeException = () => {

    }
    const handleChangeSheduler = (e) => {
        SetuseSchedulerState(e.target.checked);

        UserSheduleState({
            deviceId: isId,
            useSchedulerState: e.target.checked
        }, handleSheduleStateSuccess, handleSheduleStateException6)
    };
    const handleSheduleStateSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotify()
        }, 2000)
        setLoading(false)
    };
    const handleSheduleStateException6 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: "error",
            message: errorMessage

        })
    };


    const Changeinstall = () => {
        SetInstallerState(!installerState);
        InStallerShedule({
            deviceId: isId,
            installerState: !installerState
        }, handleInStallerSheduleSuccess, handleInStallerSheduleException1)
    };
    const handleInStallerSheduleSuccess = () => {
        InfoModeShedule({
            deviceId: isId
        }, handleInfoModeSheduleSuccess, handelException12)

    };
    const handleInStallerSheduleException1 = () => {

    };
    const handleInfoModeSheduleSuccess = (dataObject) => {
        setManualFanSpeed(dataObject?.data?.manualFanSpeed || "")
        SetIosFanSpeed(dataObject?.data?.iosFanSpeed || "")
        SetautoModeState(dataObject?.data?.autoModeState || "")
    };
    const handelException12 = () => {

    };

    const handleTimeSet = (day, schedule) => {
        if (useSchedulerState) {
            if (schedule.schedule) {
                setOpen(true);
                setDayTopCheck(day);
            }
        }
    };
    const handleTimeSetBot = (day, schedule) => {
        if (useSchedulerState) {

            if (schedule.schedule) {
                setOpen(true);
                setDayBotCheck(day);
            }
        }
    };

    const handleChange = (value) => {
        setManualFanSpeed(value);
    };
    const handleChangeCommit = (value) => {

        StateFan({
            deviceId: isId,
            FS: manualFanSpeed,
            MODE: 'MM'
        }, handlSucess5, handelException5);

    };
    const handlSucess5 = (dataObject) => {
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotify()
        }, 2000)
        setLoading(false)
    };
    const handelException5 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: "error",
            message: errorMessage


        })
    };

    const handleChanges = (value) => {
        SetIosFanSpeed(value)
    };
    const handleChangeCommits = (value) => {
        StateFan({
            deviceId: isId,
            FS: iosFanSpeed,
            MODE: 'IOS'
        }, handlSucess7, handelException7);

    };
    const handlSucess7 = (dataObject) => {
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message
        });
        setTimeout(() => {
            handleCloseNotify()
        }, 2000)
    };
    const handelException7 = () => {

    };

    const handleScheduleChange = (day, newValue) => {

        console.log('newValue=====>', day);
        setData(prevData => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                schedule: newValue
            }
        }));
        if (day === 'Mon') {
            setMondayStat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: newValue,
                TueSchedule: tuesdayStat,
                WedSchedule: wednesdayStat,
                ThuSchedule: thursdayStat,
                FriSchedule: fridayStat,
                SatSchedule: saturdayStat,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Tue') {
            setTuesdaystat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: newValue,
                WedSchedule: wednesdayStat,
                ThuSchedule: thursdayStat,
                FriSchedule: fridayStat,
                SatSchedule: saturdayStat,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Wed') {
            setWednesdayStat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: tuesdayStat,
                WedSchedule: newValue,
                ThuSchedule: thursdayStat,
                FriSchedule: fridayStat,
                SatSchedule: saturdayStat,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Thu') {
            setThursdayStat(newValue);
            console.log("ThuScheduleThuSchedule", newValue)
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: tuesdayStat,
                WedSchedule: wednesdayStat,
                ThuSchedule: newValue,
                FriSchedule: fridayStat,
                SatSchedule: saturdayStat,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Fri') {

            setFridayStat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: tuesdayStat,
                WedSchedule: wednesdayStat,
                ThuSchedule: thursdayStat,
                FriSchedule: newValue,
                SatSchedule: saturdayStat,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Sat') {
            setSaturdayStat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: tuesdayStat,
                WedSchedule: wednesdayStat,
                ThuSchedule: thursdayStat,
                FriSchedule: fridayStat,
                SatSchedule: newValue,
                SunSchedule: sundayStat
            }, handleSucess, handelException);
        } else if (day === 'Sun') {
            setSundayStat(newValue);
            ScheduleDayScheduleState({
                deviceId: isId,
                MonSchedule: mondayStat,
                TueSchedule: tuesdayStat,
                WedSchedule: wednesdayStat,
                ThuSchedule: thursdayStat,
                FriSchedule: fridayStat,
                SatSchedule: saturdayStat,
                SunSchedule: newValue
            }, handleSucess, handelException);
        }
    };


    const handleSucess = (dataObject) => {
        InfoShedule({
            deviceId: isId
        }, handleSheduleSuccess, handleSheduleException);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000)
    };

    const handelException = (errorObject, errorMessage) => {
        setNotification({
            status: false,
            type: 'error',
            message: errorMessage
        })
    };

    const handleAutoModeChange = () => {
        setLoading(true);
        SetautoModeState(!autoModeState);
        StateAutomode({
            deviceId: isId,
            autoModeState: !autoModeState
        }, handleSucess2, handelException2)
    };

    const handleSucess2 = (dataObject) => {
        InfoModeShedule({
            deviceId: isId
        }, handleInfoModeSheduleSuccess, handelException12)
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoading(false);
    };

    const handelException2 = (errorObject, errorMessage) => {
        InfoModeShedule({
            deviceId: isId
        }, handleInfoModeSheduleSuccess, handelException12)
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoading(false);
    };

    const installChange = (event) => {
        SetIosHum(!iosHum)
        StateHumadity({
            deviceId: isId,
            hum: !iosHum,
            MODE: 'IOS'
        }, handleSucess3, handelException3)

    };
    const handleSucess3 = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    const handelException3 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handleManualHumChange = (event) => {
        SetManualHum(!manualHum);
        StateHumadity({
            deviceId: isId,
            hum: !manualHum,
            MODE: 'MM'
        }, handleSucess4, handelException4)

    };
    const handleSucess4 = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handelException4 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const onWeekChange = (e) => {
        SetWeek(e.target.value)
        SelfHealState({
            deviceId: isId,
            dayOfWeek: e.target.value,
            selfHealTime: time
        }, handleSelfSucess, handleSelfException)

    };
    const handleSelfSucess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000)
    };

    const handleSelfException = (errorObject, errorMessage) => {
        setNotification({
            status: false,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000)
    };

    const handleGDayHealSucess = (dataObject) => {
        SetWeek(dataObject?.data[0]?.dayOfWeek)
        SetTime(dataObject?.data[0]?.selfHealTime)
    };

    const handleGDayHealException = () => {

    };

    const onTimeChange = (e) => {
        SetTime(e.target.value)
        SelfHealState({
            deviceId: isId,
            dayOfWeek: week,
            selfHealTime: e.target.value
        }, handleTimeSucess, handleTimeException)

    };
    const handleTimeSucess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000)
    };

    const handleTimeException = (errorObject, errorMessage) => {
        setNotification({
            status: false,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000)
    };

    const handleStatisticsSuccess = (dataObject) => {
        setDeviceStatics(dataObject?.data || []);
        console.log("123setDeviceStatics", setDeviceStatics)

        // setNotification({
        //     status: true,
        //     type: 'success',
        //     message: dataObject.message
        // });
        // setTimeout(() => {
        //     handleCloseNotify();
        // }, 2000)
    };

    const handleStatisticsException = (errorObject, errorMessage) => {
        // setNotification({
        //     status: false,
        //     type: 'error',
        //     message: errorMessage
        // });
        // setTimeout(() => {
        //     handleCloseNotify();
        // }, 2000)
    };


    const handleChangeSetPoint = (value) => {
        console.log("handleChangeSetPoin", value);
        ChangeSetPoint({
            deviceId: isId,
            setPointValue: Math.floor(value)
        }, handleSetpointSuccess, handleSetpointException);
    };

    const handleSetpointSuccess = (dataObject) => {
        InfoDeviceTemp({
            deviceId: isId
        }, handleDeviceTempSuccess, handleDeviceTempException);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);

    };

    const handleSetpointException = (errorObject, errorMessage) => {
        InfoDeviceTemp({
            deviceId: isId
        }, handleDeviceTempSuccess, handleDeviceTempException);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);

    };

    const otaHandle = () => {
        setLoadingOta(true);
        OtaUpgradeService({
            deviceId: isId
        }, OtaHandleSuccess, OtaHandlExcception)
    };

    const OtaHandleSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoadingOta(false);
    };

    const OtaHandlExcception = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoadingOta(false);
    };

    const wifiHandle = () => {
        setLoadingwifi(true)
        WIFIUpgradeService({
            deviceId: isId
        }, wifiHandlesucess, wifiHandleException)
    };

    const wifiHandlesucess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoadingwifi(false);
    };

    const wifiHandleException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLoadingwifi(false);
    };

    const handlePowerOff = () => {
        Setloadingbuttonoff(true)
        Changemachine({
            deviceId: isId,
            switchValue: "START"
        }, handlePowerOffSuccess, handlePowerOffException);
    };

    const handlePowerOffSuccess = (dataObject) => {
        Setloadingbuttonoff(false)
        setDeviceSelectStatus(dataObject?.deviceStatus);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handlePowerOffException = (errorObject, errorMessage) => {
        Setloadingbuttonoff(false)
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handlePowerOn = () => {
        Setloadingbutton(true)
        Changemachine({
            deviceId: isId,
            switchValue: "STOP"
        }, handlePowerOnSuccess, handlePowerOnException);
    };

    const handlePowerOnSuccess = (dataObject) => {
        Setloadingbutton(false)
        setDeviceSelectStatus(dataObject?.deviceStatus);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handlePowerOnException = (errorObject, errorMessage) => {
        Setloadingbutton(false)
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const WeekSchedularhandleSucess = (dataObject) => {
        setRefreshData((oldValue) => !oldValue);
        // setOpen(false);
        setOpen(false);
        setDayBotCheck('');
        setDayTopCheck('');
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    const WeekSchedularhandleException = (errorObject, errorMessage) => {

    };


    return (
        <div style={{ margin: '30px 25px' }}>
            <UtilityForManage
                selectedData={selectedData}
            />

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' }}>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    fontFamily: 'Readex Pro',
                                    fontWeight: 'bold'
                                }}>
                                Manage Device
                            </Typography>

                        </Grid>

                        <Grid item xs={12} md={12} style={{ width: '100%', height: '10vh' }}>
                            <Card
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '96%',
                                    height: '100%',
                                    display: "flex",
                                    alignItems: "stretch",
                                    justifyContent: "center",
                                    flexWrap: "nowrap",
                                    flexDirection: "column-reverse",

                                }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={10} md={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                }}>
                                                {selectedData.device_state === 0 ? "AMBIATOR::Ground Floor is off" : "AMBIATOR::Ground Floor is on"}
                                            </Typography>

                                        </Grid>
                                        <Grid item md={2} style={{ display: 'flex' }}>
                                            {selectedData.device_state === 0 ? (
                                                <>
                                                    <SettingsPowerIcon
                                                        onClick={userDetails?.userRole === 'affiliate' ? null : handlePowerOff}
                                                        style={{
                                                            fontSize: '30px',
                                                            fontFamily: 'Readex Pro',
                                                            fontWeight: 'bold',
                                                            color: 'gray',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                    {loadingbuttonoff && (
                                                        <p style={{ fontSize: '5px' }}>
                                                            <CircularProgress style={{ width: '20px', height: '20px', color: "#1bc4e9" }} />
                                                        </p>
                                                    )}
                                                </>

                                            ) : (
                                                <SettingsPowerIcon
                                                    onClick={userDetails?.userRole === 'affiliate' ? null : handlePowerOn}
                                                    style={{
                                                        fontSize: '30px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                        color: '#1BC4E9',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            )}
                                            {loadingbutton &&
                                                <p style={{ fontSize: '5px' }}>
                                                    <CircularProgress style={{ width: '20px', height: '20px', color: "#1bc4e9" }} />
                                                </p>}
                                        </Grid>


                                    </Grid>
                                </CardContent>
                            </Card>

                        </Grid>


                        <Grid container spacing={2} padding={"15px"}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '100%',
                                        height: '11vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // padding: '2px'
                                    }}
                                >
                                    <CardContent >
                                        <Grid container spacing={2} style={{ marginTop: '11px', display: 'flex', flexDirection: 'column', }}>
                                            <Grid md={12}>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    OUTSIDE
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <DeviceThermostatIcon style={{ fontSize: '18pt', fontWeight: 'bold', fontFamily: 'Readex Pro - Light', color: '#DB7210' }} />
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#DB7210'
                                                    }}>
                                                    {outTemp}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#DB7210'
                                                    }}>
                                                    ℃
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                        <Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '100%',
                                        height: '11vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent >
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                            <Grid md={12}>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    OUTSIDE
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <WaterDropIcon
                                                    style={{
                                                        fontSize: '24px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#DB7210'
                                                    }} />
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#DB7210'
                                                    }}>
                                                    {outHum}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#DB7210'
                                                    }}>
                                                    %
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '100%',
                                        height: '11vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent >
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                            <Grid md={12}>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    SUPPLY
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <DeviceThermostatIcon
                                                    style={{
                                                        fontSize: '25px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                        color: '#34b0e2'
                                                    }} />
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#34b0e2'
                                                    }}>
                                                    {supply}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#34b0e2'
                                                    }}>
                                                    {/* <sup>o</sup>c */}℃
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card
                                    style={{
                                        borderRadius: '20px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s',
                                        width: '100%',
                                        height: '11vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CardContent >
                                        <Grid container spacing={2} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                            <Grid md={12}>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontFamily: 'Readex Pro',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    SET POINT
                                                </Typography>

                                            </Grid>
                                            <Grid md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <DeviceThermostatIcon
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#34b0e2'
                                                    }} />
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#34b0e2'
                                                    }}>
                                                    {setPoint}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Readex Pro',
                                                        color: '#34b0e2'
                                                    }}>
                                                    {/* <sup>o</sup>c */}
                                                    ℃
                                                </Typography>
                                            </Grid>

                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={8} sm={12} md={12} >
                            <CircularSliderControler
                                setpoint={setPoint}
                                handleChangeSetPoint={handleChangeSetPoint}
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item sm={6} md={6}>
                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Readex Pro',
                                        color: '#1BC4E9'
                                    }}>
                                    Cooler
                                </Typography>

                            </Grid>
                            <Grid item md={6} >
                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Readex Pro',
                                        color: '#DB7210'
                                    }}>
                                    Warmer
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Grid container spacing={2} >
                        <Grid item md={12}>
                            <Grid style={{ display: 'flex' }}>
                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        padding: '6px'
                                    }}>
                                    Self Heal Schedule
                                </Typography>
                            </Grid>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '15vh'
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={2} style={{ marginTop: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Grid xs={6} md={5} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                                            <select
                                                disabled={userDetails?.userRole === 'affiliate'}
                                                style={{
                                                    width: '130px',
                                                    height: '32px',
                                                    borderRadius: '5px',
                                                    textAlign: 'center',
                                                    borderColor: 'Black',
                                                    fontFamily: 'Readex Pro',
                                                    cursor: 'pointer'
                                                }}
                                                value={week}
                                                onChange={(e) => {
                                                    onWeekChange(e)
                                                }}
                                            >
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                        </Grid>
                                        <Grid md={5} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                                            <input
                                                type='time'
                                                value={time}
                                                disabled={userDetails?.userRole === 'affiliate'}
                                                onChange={(e) => onTimeChange(e)}
                                                style={{
                                                    width: '130px',
                                                    height: '30px',
                                                    borderRadius: '5px',
                                                    textAlign: 'center',
                                                    fontFamily: 'Readex Pro',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </Grid>
                                        <Grid md={12} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "3px"
                                        }}>
                                            <Typography
                                                style={{
                                                    fontSize: '15px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',

                                                }}>
                                                Ambiator must be powered on to Self Heal
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item md={12}>
                            <Grid style={{ display: 'flex' }}>
                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        padding: "6px"
                                    }}>
                                    Device Statistics
                                </Typography>
                            </Grid>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s',
                                    width: '100%',
                                    height: '22.5vh',
                                    // overflow: "auto"
                                    marginBottom: '2px'
                                }}
                            >
                                <CardContent >

                                    {/* <Grid container spacing={2} style={{ marginTop: '0px', marginLeft: '1px' }}>

                                        <Grid xs={3.5} md={4.9} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-star", marginTop: '2px', marginLeft: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }}>
                                                Total Hours Run
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", backgroundColor: '#d7d8d9', marginTop: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {deviceStatics.value}
                                            </Typography>
                                        </Grid>

                                        <Grid xs={3} md={4.9}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-star", marginTop: '5px', marginLeft: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    justifyContent: 'flex-start'
                                                }}>
                                                Total kW Used
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", backgroundColor: '#d7d8d9', marginTop: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {deviceStatics.value}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={3.5} md={4.9} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-star", marginTop: '5px', marginLeft: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {deviceStatics.value}
                                            </Typography>
                                        </Grid>
                                        <Grid md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", backgroundColor: '#d7d8d9', marginTop: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {deviceStatics.value}
                                            </Typography>
                                        </Grid>

                                        <Grid xs={3.5} md={4.9} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-star", marginTop: '5px', marginLeft: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                GHG Avoided
                                            </Typography>
                                        </Grid>
                                        <Grid md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", backgroundColor: '#d7d8d9', marginTop: '5px' }}>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {deviceStatics.value}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-star", marginTop: '0px', }}>
                                            <Typography
                                                style={{
                                                    fontSize: '13px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                    padding: "5px"
                                                }}>
                                                CO2 Equivalent
                                            </Typography>
                                        </Grid>
                                    </Grid> */}
                                    <Grid container spacing={2} style={{ marginTop: '0px', marginLeft: '1px' }}>

                                        {deviceStatics.map((stat, index) => (
                                            <React.Fragment key={index}>
                                                <Grid xs={3.5} md={4.9} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start", marginTop: '2px', marginLeft: '5px' }}>
                                                    <Typography
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: 'Readex Pro',
                                                            fontWeight: 'bold',
                                                            display: 'flex',
                                                            justifyContent: 'flex-start'
                                                        }}>
                                                        {stat.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={2} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around", backgroundColor: '#d7d8d9', marginTop: '5px' }}>
                                                    <Typography
                                                        style={{
                                                            fontSize: '14px',
                                                            fontFamily: 'Readex Pro',
                                                            fontWeight: 'bold',
                                                        }}>
                                                        {stat.value}
                                                    </Typography>
                                                </Grid>
                                                {stat.message && (
                                                    <Grid xs={12} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start", marginTop: '0px' }}>
                                                        <Typography
                                                            style={{
                                                                fontSize: '13px',
                                                                fontFamily: 'Readex Pro',
                                                                fontWeight: 'bold',
                                                                padding: "5px"
                                                            }}>
                                                            {stat.message}
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                    <Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={12} md={12} margin={1}>
                            <Grid container spacing={0} >
                                <Grid item xs={10} sm={4} md={2.2} style={{ display: 'flex', marginTop: '2px' }}>
                                    <Typography
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Readex Pro',
                                            fontWeight: 'bold'
                                        }}>
                                        Location
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} sm={2} md={1.5} style={{ display: 'flex', marginTop: '3px' }}>
                                    <img src={LocationIcon} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={5.9} style={{ display: 'flex', backgroundColor: '#d7d8d9', marginTop: '1px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', }}>
                                        {location}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={12} margin={1}>
                            <Grid container spacing={2} >
                                <Grid item md={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Readex Pro',
                                            fontWeight: 'bold'
                                        }}>
                                        Use Scheduler
                                    </Typography>
                                    <Switch
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        checked={useSchedulerState}
                                        onChange={handleChangeSheduler}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item sm={0.4} md={0.6}>
                                <Grid container spacing={1} style={{ display: 'flex' }}>
                                    <Grid item sm={1} md={12} style={{ marginTop: '40px' }}>
                                        <img src={powerOn} />
                                    </Grid>
                                    <Grid item sm={1} md={12} style={{ marginTop: '30px' }} >
                                        <img src={powerOff} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {Object.entries(data).map(([day, schedule], index) => (
                                <Grid item sm={1.6} md={1.6} key={index}> {/* Changed from 1.6 to 1 */}
                                    <Card style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)', height: '125px', width: '65px' }}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item md={12} style={{ marginLeft: '-10px', marginTop: '-20px' }}>
                                                    <Switch
                                                        disabled={userDetails?.userRole === 'affiliate' || !useSchedulerState}
                                                        checked={schedule.schedule}
                                                        onChange={(e) => handleScheduleChange(day, e.target.checked)} // Pass day and new value
                                                    />
                                                </Grid>
                                                <Grid item md={12} style={{ marginTop: '-10px', marginLeft: '-15px' }}>
                                                    <Typography onClick={() => handleTimeSet(day, schedule)}

                                                        disabled={userDetails?.userRole === 'affiliate' || !useSchedulerState}
                                                        style={{
                                                            marginRight: schedule.schedule === false ? '-30px' : '',
                                                            width: '63px', cursor: 'pointer'
                                                        }}>
                                                        {schedule?.schedule === false ? 'Skip' : convertTo12HourFormat(schedule.startTime)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={12} style={{ marginTop: '-10px', fontWeight: 'bold' }}>
                                                    {day}
                                                </Grid>
                                                <Grid item md={12} style={{ marginTop: '-10px', marginLeft: '-15px' }}>
                                                    <Typography onClick={() => handleTimeSetBot(day, schedule)}
                                                        disabled={userDetails?.userRole === 'affiliate' || !useSchedulerState}

                                                        style={{
                                                            marginRight: schedule.schedule === false ? '-30px' : '',
                                                            width: '63px', cursor: 'pointer'
                                                        }}>
                                                        {schedule.schedule === false ? 'Skip' : convertTo12HourFormat(schedule.endTime)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item md={12} margin={1}>
                            <Grid container spacing={2} >
                                <Grid item md={12} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Readex Pro',
                                            fontWeight: 'bold'
                                        }}>
                                        Auto Mode
                                    </Typography>
                                    <Switch
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        checked={autoModeState}
                                        onChange={handleAutoModeChange}
                                    />
                                    {loading && <p><CircularProgress style={{ width: '30px', height: '30px' }} /></p>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid style={{ display: 'flex' }}>
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                    }}>
                                    Manual Mode
                                </Typography>
                            </Grid>
                            <Card
                                style={{
                                    borderRadius: '20px',
                                    width: '100%',
                                    height: '15.5vh',
                                    border: 'solid',
                                    borderColor: '#bbbcbd',
                                    backgroundColor: autoModeState ? '#e0e0e0' : 'white',
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={1} >
                                        <Grid md={2}
                                            style={{
                                                fontSize: '16px',
                                                fontFamily: 'Readex Pro',
                                                fontWeight: 'bold',
                                            }}>
                                            <Switch checked={manualHum}
                                                disabled={userDetails?.userRole === 'affiliate' || autoModeState}
                                                onChange={handleManualHumChange}
                                                style={{
                                                }}
                                            />

                                        </Grid>
                                        <Grid md={7} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                Don't Add Humidity
                                            </Typography>
                                        </Grid>
                                        <Grid sm={12} md={12} style={{ display: 'flex', marginLeft: '20px', justifyContent: 'space-evenly', alignItems: "center" }}>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                Fan Speed
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {manualFanSpeed}
                                            </Typography>

                                            <Slider
                                                disabled={userDetails?.userRole === 'affiliate' || autoModeState}
                                                // disabled={autoModeState}
                                                value={manualFanSpeed}
                                                onChange={(e) => handleChange(e.target.value)}
                                                onChangeCommitted={(e) => handleChangeCommit(e.target.value)}
                                                min={30}
                                                max={100}
                                                style={{
                                                    width: 200,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item md={12}>
                            <Grid style={{ display: 'flex' }}>
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                    }}>
                                    Installer Override Settings
                                    <Switch checked={installerState}
                                        onChange={Changeinstall}
                                        disabled={userDetails?.userRole === 'affiliate' || !autoModeState}
                                    />
                                </Typography>
                            </Grid>

                            <Card
                                style={{
                                    borderRadius: '20px',
                                    width: '100%',
                                    height: '15.5vh',
                                    border: 'solid',
                                    borderColor: '#bbbcbd',
                                    backgroundColor: autoModeState ? 'white' : '#e0e0e0'
                                    // backgroundColor: "white"
                                }}
                            >
                                <CardContent >
                                    <Grid container spacing={1} >
                                        <Grid md={2}
                                            style={{
                                                fontSize: '16px',
                                                fontFamily: 'Readex Pro',
                                                fontWeight: 'bold',
                                            }}>
                                            <Switch checked={iosHum}
                                                disabled={userDetails?.userRole === 'affiliate' || !autoModeState}
                                                onChange={installChange}
                                                style={{
                                                }}
                                            />

                                        </Grid>
                                        <Grid md={7} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                Don't Add Humidity
                                            </Typography>
                                        </Grid>
                                        <Grid sm={12} md={12} style={{ display: 'flex', marginLeft: '20px', justifyContent: 'space-evenly', alignItems: "center" }}>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                Fan Speed
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontSize: '16px',
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: 'bold',
                                                }}>
                                                {iosFanSpeed}
                                            </Typography>
                                            <Slider
                                                disabled={userDetails?.userRole === 'affiliate' || !autoModeState}
                                                // disabled={!autoModeState}
                                                value={iosFanSpeed}
                                                onChange={(e) => handleChanges(e.target.value)}
                                                onChangeCommitted={(e) => handleChangeCommits(e.target.value)}
                                                min={30}
                                                max={installerState ? 115 : 100}
                                                style={{ width: 200 }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '30px', display: 'flex', alignItems: "center", justifyContent: 'flex-start' }}>
                        {/* {userDetails?.userRole === 'affiliate' ? null : */}
                        <Grid item md={6} sm={6}>
                            <Fab variant="extended"
                                onClick={otaHandle}
                            >
                                <SettingsIcon sx={{ mr: 1 }} />
                                OTA MODULE
                                {loadingOta && (
                                    <p style={{ fontSize: '5px' }}>
                                        <CircularProgress style={{ width: '20px', height: '20px' }} />
                                    </p>
                                )}
                            </Fab>

                        </Grid>

                        <Grid item md={6} sm={6}>
                            {/* {userDetails?.userRole === 'affiliate' ? null : */}
                            <Fab variant="extended"
                                onClick={() => {
                                    setOpen1(true)
                                }}
                            >
                                <WifiRoundedIcon sx={{ mr: 1 }} />
                                WIFI UPDATE
                                {loadingwifi && (
                                    <p style={{ fontSize: '5px' }}>
                                        <CircularProgress style={{ width: '20px', height: '20px' }} />
                                    </p>
                                )}
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TimeSet
                isId={isId}
                setOpen={setOpen}
                open={open}
                // mday={mday}
                dayTopCheck={dayTopCheck}
                setDayTopCheck={setDayTopCheck}
                dayBotCheck={dayBotCheck}
                setDayBotCheck={setDayBotCheck}
                mondayStat={mondayStat}
                tuesdayStat={tuesdayStat}
                wednesdayStat={wednesdayStat}
                thursdayStat={thursdayStat}
                fridayStat={fridayStat}
                saturdayStat={saturdayStat}
                sundayStat={sundayStat}
                setRefreshData={setRefreshData}
                data={data}
                WeekSchedularhandleSucess={WeekSchedularhandleSucess}
                WeekSchedularhandleException={WeekSchedularhandleException}
            />
            <UpdateWifi
                open1={open1}
                setOpen1={setOpen1}
                isId={isId}
                ssid={ssid}
                setSSID={setSSID}
                setwifiPassword={setwifiPassword}
                wifipassword={wifipassword}
            />
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div >
    )
}

export default ViewManage