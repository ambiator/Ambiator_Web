import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeviceTypeShow, GHGenergyAEditService, GHGenergyAddService } from '../../../ApiService/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';

const GhgFactorModel = ({ open, setOpen, isAddButton, GhgFactor, setRefreshData }) => {

    const [id, setId] = useState('')
    const [startDate, setStartDate] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [motorType, setMotorType] = useState('');
    const [GHGedata, setgHGeData] = useState('');
    const [defaultEnergyUse, setDefaultEnergyUse] = useState('');
    const [deviceTypeList, setDeviceTypeList] = useState([]);
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''

    });

    const handleGHGeSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            GHGenergyAddService({
                startDate: startDate,
                countryCode: countryCode,
                deviceType: deviceType,
                motorType: motorType,
                GHGe: GHGedata,
                defaultEnergyUse: defaultEnergyUse
            }, handleGHGEdataSuccess, handleGHGEdataException);
        } else {
            GHGenergyAEditService({
                id: id,
                startDate: startDate,
                countryCode: countryCode,
                deviceType: deviceType,
                motorType: motorType,
                GHGe: GHGedata,
                defaultEnergyUse: defaultEnergyUse
            }, handleGHGEdataSuccess, handleGHGEdataException)
        }

    };
    const handleGHGEdataSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: "success",
            message: dataObject.message
        })
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
        setRefreshData((oldvalue) => !oldvalue)
        setOpen(false);
    };

    const handleGHGEdataException = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        });
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
        // setOpen(false);

    };


    useEffect(() => {
        DeviceTypeShow(handleTypesucess, handleTypeException)
        setOpen(open)
        loadData();
    }, [GhgFactor, open]);

    const handleTypesucess = (dataObject) => {
        setDeviceTypeList(dataObject.data)
    };
    const handleTypeException = () => {

    };

    const loadData = () => {
        setId(GhgFactor.id || '');
        setDeviceType(GhgFactor.deviceTypeId || '');
        setCountryCode(GhgFactor.countryCode || '');
        setStartDate(GhgFactor.startDate || '');
        setMotorType(GhgFactor.motorType || '');
        setgHGeData(GhgFactor.GHGe || '')
        setDefaultEnergyUse(GhgFactor.defaultEnergyUse || "")
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
        setStartDate('');
        setDeviceType('');
        setCountryCode('');
        setgHGeData('');
        setDefaultEnergyUse('');
        setMotorType('')

    }
    return (
        <Dialog sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: '100%' } }}
            maxWidth='lg'
            open={open}>
            <DialogTitle style={{ background: '#0e2d5d', color: '#f5f5fc' }}>
                {isAddButton ? 'Add Device GHG Factor' : 'Edit Device GHG Factor'}
            </DialogTitle>
            <form onSubmit={handleGHGeSubmit}>
                <DialogContent>
                    <Grid sx={{ marginTop: 0 }} container spacing={2} >
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                // label="Start Date"
                                type="date"
                                value={startDate}
                                variant="filled"
                                placeholder="Start Date"
                                onChange={(e) => {
                                    setStartDate(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="Country Code"
                                type="text"
                                value={countryCode}
                                variant="filled"
                                placeholder="Country Code"
                                onChange={(e) => {
                                    setCountryCode(e.currentTarget.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Device Type </InputLabel>
                                <Select
                                    labelId="demo-simple-selct-label"
                                    id="demo-simple-select"
                                    label="Device Type"
                                    variant="filled"
                                    value={deviceType}
                                    onChange={(e) => { setDeviceType(e.target.value) }}
                                >
                                    {deviceTypeList.map((data) => {
                                        return (
                                            <MenuItem value={data.id}> {data.deviceType} </MenuItem>

                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="Motor Type"
                                type="text"
                                value={motorType}
                                variant="filled"
                                placeholder="Motor Type"
                                onChange={(e) => {
                                    setMotorType(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="GHGe"
                                type="text"
                                value={GHGedata}
                                variant="filled"
                                placeholder="GHGe"
                                onChange={(e) => {
                                    setgHGeData(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} ms={6} lg={6}>
                            <TextField
                                label="Default Energy Use"
                                type="text"
                                value={defaultEnergyUse}
                                variant="filled"
                                placeholder="Default Energy Use"
                                onChange={(e) => {
                                    setDefaultEnergyUse(e.target.value)
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

export default GhgFactorModel