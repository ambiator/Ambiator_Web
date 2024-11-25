import { DialogTitle, Grid, IconButton } from '@mui/joy'
import { Button, Dialog, DialogActions, DialogContent, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import NotificationBar from '../../notification/ServiceNotificationBar'
import { Text } from 'recharts'
import { DeviceWifiUpdate, InfoModeShedule } from '../../ApiService/LoginPageService'

const UpdateWifi = ({ open1, setOpen1, isId, ssid, wifipassword, setSSID, setwifiPassword }) => {
    console.log("12333", ssid);
    console.log("wifipassword12345", wifipassword)

    const [showPassword, setShowPassword] = useState(false);
    const [currentshowPassword, currentsetShowPassword] = useState(false);
    const [currentSSIDPassword, setCurrentSSIDPassword] = useState('');
    const [newWifiPassword, setNewWifiPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    useEffect(() => {
        setCurrentSSIDPassword(ssid);
        setNewWifiPassword(wifipassword);
    }, [open1, ssid, wifipassword])

    const handleClose = () => {
        setOpen1(false);
        setCurrentSSIDPassword('')
        setNewWifiPassword('')
        setPasswordError('')
        // ClearData();
    };
    const handleCloseNotify = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    }

    // useEffect(() => {
    //     if (open1) {
    //         InfoModeShedule({
    //             deviceId: isId
    //         }, handleModeSuccess, handleModeException);
    //     };
    //     const handleModeSuccess = (dataObject) => {
    //         setSSID(dataObject?.data?.ssId || "");
    //         setWifiPassword(dataObject?.data?.wifiPassword || "");
    //     };
    //     const handleModeException = () => {

    //     };
    // }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newWifiPassword === currentSSIDPassword) {
            setPasswordError('Old Password and new password cannot be same');
            return;
        } else {
            setPasswordError('');
        }
        if (newWifiPassword.length < 6 || currentSSIDPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        } else {
            setPasswordError('');
        }
        DeviceWifiUpdate({
            deviceId: isId,
            ssid: currentSSIDPassword,
            password: newWifiPassword,


        }, handleWifiUpdateSuccess, handleWifiUpdateException)

    };
    const handleWifiUpdateSuccess = (dataObject) => {
        setOpen1(false);
        setCurrentSSIDPassword('')
        setPasswordError('')
        setNewWifiPassword('')
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        InfoModeShedule({
            deviceId: isId
        }, handleModeSuccess, handleModeException);
    };
    const handleModeSuccess = (dataObject) => {
        setSSID(dataObject?.data?.ssId || "")
        console.log("dataObject?.data?.ssId || ", dataObject?.data?.ssId || "")
        setwifiPassword(dataObject?.data?.wifiPassword || "")
    };
    const handleModeException = () => {

    };

    const handleWifiUpdateException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    return (
        <div>
            <Dialog sx={{ '& .MuiDialog-paper': { width: '32%', maxHeight: '100%' } }}
                maxWidth='lg'
                open={open1}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ paddingLeft: '18px', paddingTop: '6px', textAlign: 'center', marginBottom: '6px' }} >
                        Set Up WIFI
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ marginTop: '1px' }}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    fullWidth
                                    label="SSID"
                                    placeholder='SSID'
                                    type={currentshowPassword ? 'text' : 'password'}
                                    variant="filled"
                                    required
                                    onChange={(e) => {
                                        setCurrentSSIDPassword(e.target.value);
                                    }
                                    }
                                    value={currentSSIDPassword}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => {
                                                    currentsetShowPassword(!currentshowPassword);
                                                }}
                                                onMouseDown={(e) => { e.preventDefault(); }}
                                                edge="end"
                                            >
                                                {currentshowPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                                {passwordError !== '' && <Text style={{ color: 'red', marginTop: -15 }}>{passwordError}</Text>}
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    fullWidth
                                    label="WIFI Password"
                                    placeholder='WIFI Password'
                                    variant="filled"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => {
                                        setNewWifiPassword(e.target.value);

                                    }
                                    }
                                    value={newWifiPassword}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => {
                                                    setShowPassword(!showPassword);
                                                }}
                                                onMouseDown={(e) => { e.preventDefault(); }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />


                            </Grid>

                        </Grid>

                    </DialogContent>

                    <DialogActions>

                        <Button
                            style={{ color: 'black', backgroundColor: '#EBEBEB', }}
                            type='submit'
                        >
                            Submit
                        </Button>
                        <Button style={{ color: 'black', backgroundColor: '#EBEBEB', }}
                            onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />

        </div>
    )
}

export default UpdateWifi