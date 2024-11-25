import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { weekDaySchedular } from '../../ApiService/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { type } from '@testing-library/user-event/dist/type';
import { Message } from '@mui/icons-material';

const TimeSet = ({ isId, open, setOpen, dayTopCheck, dayBotCheck, setDayBotCheck, setDayTopCheck,
    data, mondayStat, tuesdayStat, wednesdayStat, thursdayStat, fridayStat, saturdayStat, sundayStat, setRefreshData, WeekSchedularhandleSucess,
    WeekSchedularhandleException
}) => {
    const [timeSet, setTimeSet] = useState('');
    // const [schedule] = true
    const [mday, setMday] = useState(data?.Mon?.startTime);
    const [Tday, setTday] = useState(data?.Tue?.startTime);
    const [Wday, setWday] = useState(data?.Wed?.startTime);
    const [thday, setThday] = useState(data?.Thu?.startTime);
    const [frday, setFrday] = useState(data?.Fri?.startTime);
    const [saday, setSaday] = useState(data?.Sat?.startTime);
    const [suday, setSuday] = useState(data?.Sun?.startTime);
    const [mdayb, setMdayb] = useState(data?.Mon?.endTime);
    const [Tdayb, setTdayb] = useState(data?.Tue?.endTime);
    const [Wdayb, setWdayb] = useState(data?.Wed?.endTime);
    const [thdayb, setThdayb] = useState(data?.Thu?.endTime);
    const [frdayb, setFrdayb] = useState(data?.Fri?.endTime);
    const [sadayb, setSadayb] = useState(data?.Sat?.endTime);
    const [sudayb, setSudayb] = useState(data?.Sun?.endTime);
    // const [openNotification, setNotification] = useState({
    //     status: false,
    //     type: 'error',
    //     message: '',

    // });

    console.log('datadatadata==>', data?.Sun?.endTime);
    useEffect(() => {
        setMday(data?.Mon?.startTime);
        setTday(data?.Tue?.startTime);
        setWday(data?.Wed?.startTime);
        setThday(data?.Thu?.startTime);
        setFrday(data?.Fri?.startTime);
        setSaday(data?.Sat?.startTime);
        setSuday(data?.Sun?.startTime);
        setMdayb(data?.Mon?.endTime);
        setTdayb(data?.Tue?.endTime);
        setWdayb(data?.Wed?.endTime);
        setThdayb(data?.Thu?.endTime);
        setFrdayb(data?.Fri?.endTime);
        setSadayb(data?.Sat?.endTime);
        setSudayb(data?.Sun?.endTime);
    }, [data]);


    const handleAdd = (e) => {
        weekDaySchedular({
            deviceId: isId,
            MonSchedule: mondayStat,
            MonStartTime: mday,
            MonEndTime: mdayb,
            TueSchedule: tuesdayStat,
            TueStartTime: Tday,
            TueEndTime: Tdayb,
            WedSchedule: wednesdayStat,
            WedStartTime: Wday,
            WedEndTime: Wdayb,
            ThuSchedule: thursdayStat,
            ThuStartTime: thday,
            ThuEndTime: thdayb,
            FriSchedule: fridayStat,
            FriStartTime: frday,
            FriEndTime: frdayb,
            SatSchedule: saturdayStat,
            SatStartTime: saday,
            SatEndTime: sadayb,
            SunSchedule: sundayStat,
            SunStartTime: suday,
            SunEndTime: sudayb,
        }, WeekSchedularhandleSucess, WeekSchedularhandleException);

    }

    const setTimeDay = (e) => {
        setTimeSet(e.target.value)
        if (dayTopCheck) {
            if (dayTopCheck === 'Mon') {
                setMday(e.target.value);
            } else if (dayTopCheck === 'Tue') {
                setTday(e.target.value || data?.Tue?.startTime);
            } else if (dayTopCheck === 'Wed') {
                setWday(e.target.value);
            } else if (dayTopCheck === 'Thu') {
                setThday(e.target.value);
            } else if (dayTopCheck === 'Fri') {
                setFrday(e.target.value)
            } else if (dayTopCheck === 'Sat') {
                setSaday(e.target.value)
            } else if (dayTopCheck === 'Sun') {
                setSuday(e.target.value)
            }

        }
        else if (dayBotCheck) {
            if (dayBotCheck === 'Mon') {
                setMdayb(e.target.value);
            }
            else if (dayBotCheck === 'Tue') {
                setTdayb(e.target.value);
            }
            else if (dayBotCheck === 'Wed') {
                setWdayb(e.target.value);
            }
            else if (dayBotCheck === 'Thu') {
                setThdayb(e.target.value);
            }
            else if (dayBotCheck === 'Fri') {
                setFrdayb(e.target.value);
            }
            else if (dayBotCheck === 'Sat') {
                setSadayb(e.target.value);
            }
            else if (dayBotCheck === 'Sun') {
                setSudayb(e.target.value);
            }

        }

    };


    return (
        <Dialog open={open} >
            <DialogTitle>
                Set Time
            </DialogTitle>
            <DialogContent>
                <Grid style={{ width: '250px' }}>
                    <TextField fullWidth type='time'
                        onChange={(e) => {
                            setTimeDay(e);

                        }}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAdd}>
                    Set Time
                </Button>
                <Button onClick={() => {
                    setOpen(false);
                    setDayBotCheck('');
                    setDayTopCheck('');
                }}>
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>

    )
}

export default TimeSet