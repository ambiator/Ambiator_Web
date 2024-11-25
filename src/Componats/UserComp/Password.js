import { Dialog, DialogContent, Grid, TextField, DialogTitle, Button, DialogActions, InputAdornment, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { ChangePassword } from '../ApiService/LoginPageService'
import NotificationBar from '../notification/ServiceNotificationBar'
import { Text } from 'recharts'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Password = ({ open, setOpen }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentshowPassword, currentsetShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    })

    const handleClose = () => {
        setOpen(false);
        setCurrentPassword('')
        setNewPassword('')
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === currentPassword) {
            setPasswordError('Old Password and new password cannot be same');
            return;
        } else {
            setPasswordError('');
        }
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        } else {
            setPasswordError('');
        }
        ChangePassword({
            oldPassword: currentPassword,
            newPassword: newPassword,

        }, handlePasswordSucess, handlePasswordException)

    };
    const handlePasswordSucess = (dataObject) => {
        setOpen(false);
        setCurrentPassword('')
        setPasswordError('')
        setNewPassword('')
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handlePasswordException = (errorObject, errorMessage) => {
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
                open={open} >
                <form onSubmit={handleSubmit}>
                    <DialogTitle  >
                        Change Password
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ marginTop: '1px' }}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    placeholder='Current Password'
                                    type={currentshowPassword ? 'text' : 'password'}
                                    variant="filled"
                                    required
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                    }
                                    }
                                    value={currentPassword}
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
                                    label="New Password"
                                    placeholder='New Password'
                                    variant="filled"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);

                                    }
                                    }
                                    value={newPassword}
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
        </div >
    )
}

export default Password