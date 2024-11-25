import { Dialog, TextField, DialogContent, DialogActions, Button } from '@mui/material'
// import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react'
import { Grid, DialogTitle } from '@mui/joy'
import ConfigurationAffliate from './ConfigurationAffliate';
import { affiliateCASS } from '../../ApiService/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';


const PasswordAffliate = ({ open, setOpen }) => {
    const [password, setPassword] = useState('');
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    });
    const [open1, setOpen1] = useState(false);

    //  useEffect(()=>{

    //  },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        affiliateCASS({
            email: "689789",
            password: password
        }, handlePasswordSuccess, handlePasswordException)

    };
    const handlePasswordSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        // setRefreshData((oldvalue) => !oldvalue)
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
        setOpen1(true);
        setOpen(false)
        setPassword('');
    };
    const handlePasswordException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
        // setOpen(false)
        setPassword('');
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };

    const handleClose = () => {
        setOpen(false);
        setPassword('');

    };
    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    }
    return (
        <div>
            <Dialog sx={{ '& .MuiDialog-paper': { width: '32%', maxHeight: '100%' } }}
                maxWidth='lg'
                open={open}
            >
                <form onSubmit={handleSubmit} >
                    <DialogTitle sx={{ paddingLeft: '18px', paddingTop: '6px', textAlign: 'center', marginBottom: '6px' }}>
                        Password
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} marginTop={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <TextField
                                    fullWidth
                                    label='Password'
                                    placeholder='Password'
                                    type='password'
                                    variant='filled'
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}

                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'
                            style={{ color: 'black', backgroundColor: '#EBEBEB' }}>
                            Submit
                        </Button>
                        <Button style={{ color: 'black', backgroundColor: '#EBEBEB' }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ConfigurationAffliate
                open1={open1}
                setOpen1={setOpen1}
            />
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}


            />
        </div>
    )
}

export default PasswordAffliate