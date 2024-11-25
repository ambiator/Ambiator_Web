import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { RpmenergyAddService, RpmenergyAEditService } from '../../../ApiService/LoginPageService';
const RpmModel = ({ open, setOpen, isAddButton, RpmFactor, setRefreshData }) => {
    const [id, setId] = useState('')
    const [startDate, setStartDate] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [motorType, setMotorType] = useState('');
    const [Rpmdata, setRpmData] = useState('');
    const [watts, setWatts] = useState('');
    // const [deviceTypeList, setDeviceTypeList] = useState([]);
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''

    });
    const handleGHGeSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            RpmenergyAddService({
                rpm: Rpmdata,
                watts: watts,
            }, handleRpmdataSuccess, handleRpmdataException);
        } else {
            RpmenergyAEditService({
                id: id,
                rpm: Rpmdata,
                watts: watts,
            }, handleRpmdataSuccess, handleRpmdataException)
        }

    };
    const handleRpmdataSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: "success",
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
        setRefreshData((oldvalue) => !oldvalue)
        // setOpen(false);
    };

    const handleRpmdataException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)

    };
    useEffect(() => {
        setOpen(open)
        loadData();
    }, [open]);

    const loadData = () => {
        setId(RpmFactor.id || '');
        setRpmData(RpmFactor.rpm || '');
        setWatts(RpmFactor.watts || '');
    };

    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    };
    const handleClose = () => {
        setOpen(false);
        ClearForm();
    };
    const ClearForm = () => {
        setRpmData('');
        setWatts('');

    }
    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: '100%' } }}
            maxWidth='lg'
            open={open}>
            <DialogTitle style={{ background: '#0e2d5d', color: '#f5f5fc' }}>
                {isAddButton ? 'Add Rpm Value' : 'Edit Rpm Value'}
            </DialogTitle>
            <form onSubmit={handleGHGeSubmit}>
                <DialogContent>
                    <Grid sx={{ marginTop: 0 }} container spacing={2} >

                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="Rpm Value"
                                type="number"
                                value={Rpmdata}
                                variant="filled"
                                placeholder="GHGe"
                                onChange={(e) => {
                                    setRpmData(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="Watts Value"
                                type="number"
                                value={watts}
                                variant="filled"
                                placeholder="Default Energy Use"
                                onChange={(e) => {
                                    setWatts(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button
                        type='submit'
                        style={{ background: '#0e2d5d', color: '#f5f5fc' }}
                    >
                        {isAddButton ? 'Add' : 'Update'}
                    </Button>
                    <Button
                        style={{ background: '#0e2d5d', color: '#f5f5fc' }}
                        onClick={
                            handleClose
                        }
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </form>
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Dialog>
    )
}

export default RpmModel