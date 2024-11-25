import { DialogTitle, Grid } from '@mui/joy'
import { DialogActions, Button, Dialog, DialogContent, Fab } from '@mui/material'
import React, { useState } from 'react'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { CASSAffliateControl } from '../../ApiService/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';

const ConfigurationAffliate = ({ open1, setOpen1 }) => {
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    });
    const handleClose = () => {
        setOpen1(false)
    };
    const handleStartButton = () => {
        CASSAffliateControl({
            statusFlag: 0
        }, handleCAASSuccess, handleCASSException);
    };
    const handleStopButton = () => {
        CASSAffliateControl({
            statusFlag: 1
        }, handleStopCAASSuccess, handleStopCASSException);
    };
    const handleCAASSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        // setRefreshData((oldvalue) => !oldvalue)
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };
    const handleCASSException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };
    const handleStopCAASSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        // setRefreshData((oldvalue) => !oldvalue)
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };
    const handleStopCASSException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
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
                open={open1}
            >
                <form>
                    <DialogTitle sx={{ paddingLeft: '18px', paddingTop: '6px', textAlign: 'center', marginBottom: '6px', fontSize: '18px', /*fontFamily: 'readex pro'*/ }}>
                        Configuration
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} marginTop={1}>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Fab variant="extended" style={{ height: '39px', color: 'white', backgroundColor: '#04AA6D', width: '70%' }}
                                    onClick={
                                        handleStartButton
                                    }
                                >
                                    <PlayCircleFilledWhiteOutlinedIcon sx={{ mr: 1, color: 'white' }} />
                                    Start
                                </Fab>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Fab variant="extended" style={{ height: '39px', color: 'white', backgroundColor: '#FF0000', width: '70%' }}
                                    onClick={
                                        handleStopButton
                                    }
                                >
                                    <StopCircleOutlinedIcon sx={{ mr: 1, color: 'white' }} />
                                    Stop
                                </Fab>
                                {/* </div> */}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: 'black', fontFamily: 'readex pro', /*backgroundColor: '#EBEBEB' */ }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}


            />
        </div>
    )
}

export default ConfigurationAffliate