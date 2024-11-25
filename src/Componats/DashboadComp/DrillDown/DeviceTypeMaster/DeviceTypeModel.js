import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeviceAddType, DeviceEditType } from '../../../ApiService/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';

const DeviceTypeModel = ({ open, setOpen, isAddButton, DeviceData, setRefreshData }) => {
    const [Device, setDevice] = useState('');
    const [id, setId] = useState('')
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            DeviceAddType({
                deviceType: Device

            }, handleSuccess, handleException);
        } else {
            DeviceEditType({
                id, deviceType: Device
            }, handleSuccess, handleException);
        }
    };
    useEffect(() => {
        setOpen(open)
        loadData();
    }, [DeviceData, open]);

    const handleSuccess = (dataObject) => {
        setRefreshData((oldvalue) => !oldvalue);
        setOpen(false);
        setOpenNotification({
            status: true,
            type: "success",
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)

    };

    const handleException = () => {

    };
    const loadData = () => {
        setId(DeviceData.id || '');
        setDevice(DeviceData.deviceType || '');
    };
    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    };

    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '32%', maxHeight: '100%' } }}
            maxWidth='lg'
            open={open} >
            <DialogTitle style={{ background: '#0e2d5d', color: '#f5f5fc' }}>
                {isAddButton ? 'Add Device Type' : 'Edit Device Type'}
            </DialogTitle>
            <form onSubmit={handleSubmit} >
                <DialogContent>
                    <Grid sx={{ marginTop: 0 }} container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>

                            <TextField

                                label="Device Type"
                                type="text"
                                value={Device}
                                variant="filled"
                                placeholder="Device Type"
                                /* eslint-disable-next-line */
                                required
                                // onBlur={() => validateForNullValue(companyName, 'fullName')}
                                onChange={(e) => { setDevice(e.target.value); }}
                                // autoComplete="off"
                                // error={errorObject?.fullName?.errorStatus}
                                // helperText={errorObject?.fullName?.helperText}
                                fullWidth
                            />

                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                label="Customer/Company Description"
                                type="text"
                                value={id}
                                variant="filled"
                                placeholder="Company Description"
                                required
                                onChange={(e) => setId(e.target.value)}
                                fullWidth
                            />
                        </Grid> */}
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        style={{ background: '#0e2d5d', color: '#f5f5fc' }}
                    >
                        {isAddButton ? 'Add' : 'Update'}
                    </Button>
                    <Button
                        style={{ background: '#0e2d5d', color: '#f5f5fc' }}
                        onClick={(e) => {
                            setOpen(false);

                        }}
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
        </Dialog >
    )
}

export default DeviceTypeModel