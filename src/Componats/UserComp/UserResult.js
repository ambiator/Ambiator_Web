import React, { useEffect } from 'react'
import UserTitle from './UserTitle'
import { Button, Card, CardActions, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import UserAdd from './UserAdd'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ApplicationStore from '../Utility/localStorageUtil'
import { DeviceAddService, DeviceDeleteService, DeviceEditService, DeviceTypeShow, InfoDeviceId } from '../ApiService/LoginPageService'
import { DataObject } from '@mui/icons-material'
import NotificationBar from '../notification/ServiceNotificationBar'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteConfirmationDailog from '../Utility/confirmDeletion'
import { Text } from 'recharts'

const UserResult = () => {
    /////////////
    // const [longitudePosition, setLongitudePosition] = useState("");
    const [LatitudePosition, setLatitudePosition] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [error, setError] = useState(null);
    /////////////
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [id, setId] = useState('');
    const [DeviceId, SetDeviceId] = useState('');
    const [Devicename, SetDeviceName] = useState('');
    const [devicetype, SetDeviceType] = useState('');
    const [friendly, SetFriendly] = useState('');
    const [serial, SetSerial] = useState('');
    const [location, SetoLcation] = useState('');
    const [ssid, SetSSID] = useState('')
    const [password, setPassword] = useState('')
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    const [isAddButton, setIsAddButton] = useState(true);
    const [DeviceTypelist, SetDeviceTypelist] = useState([]);
    const [rows, setRows] = useState('')
    const [refreshData, setRefreshData] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    })

    const handleCloseNotify = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    const toggleLocationVisibility = () => {
        setShowLocation(!showLocation);
        if (!showLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLatitudePosition(position.coords);
                    // setLongitudePosition(position.coords);
                    console.log("positionLocation", position.coords)
                    setError(null);
                },
                error => {
                    setError(error.message);
                    setLatitude(null);
                    setLongitude(null);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }

    };


    const columns = [
        {
            field: 'deviceId',
            headerName: "Serial Number",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'deviceType',
            headerName: "Device Type",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'floorName',
            headerName: " Friendly Name",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'location',
            headerName: "Location",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'user_role',
            headerName: " Setup",
            sortable: true,
            // width: 200,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'Comment',
            headerName: " Comment",
            sortable: true,
            // width: 200,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'Added',
            headerName: "Date Added",
            sortable: true,
            // width: 200,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: "Actions",
            headerAlign: 'center',
            width: 180,
            flex: 1,
            align: 'center',
            cellClassName: 'actions',
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
            ],
        },
    ];

    const EditData = (params) => {
        return (
            <EditIcon
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setId(params?.selectedRow?.id);
                    SetDeviceId(params?.selectedRow?.deviceId);
                    SetoLcation(params?.selectedRow?.location);
                    SetDeviceType(params?.selectedRow?.device_type);
                    SetFriendly(params?.selectedRow?.floorName);
                    SetSSID(params?.selectedRow?.ssId);
                    setPassword(params?.selectedRow?.wifiPassword);
                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />

        );

    };

    const DeleteData = (props) => {
        return (
            <DeleteIcon
                onClick={() => {
                    setId(props.selectedRow.id);
                    // CustomerDelete(props.selectedRow.id);
                    setDeleteDailogOpen(true);
                    setDeleteId(props.selectedRow.id);
                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        );
    }
    useEffect(() => {
        InfoDeviceId({}, handleInfoDeviceIdShowSuccess, handleInfoDeviceIdShowException);
        DeviceTypeShow(handleTypesucess, handleTypeException)
    }, [refreshData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            DeviceAddService({
                deviceId: DeviceId,
                deviceName: Devicename,
                device_type: devicetype,
                serialNumber: serial,
                location: LatitudePosition,
                floorName: friendly,
                ssId: ssid,
                wifiPassword: password

            }, handleDeviceSuccess, handleDeviceException);
        } else {
            DeviceEditService({
                id,
                deviceId: DeviceId,
                deviceName: Devicename,
                device_type: devicetype,
                serialNumber: serial,
                location: LatitudePosition,
                floorName: friendly,
                ssId: ssid,
                wifiPassword: password
            }, handleDeviceSuccess, handleDeviceException)
        }
    };

    const CustomerDelete = (id) => {
        DeviceDeleteService({ id }, handleDelteSuccess, handleDeleteException)
    };

    const handleDelteSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            setDeleteDailogOpen(false);
            handleCloseNotify();
            // setOpen(false);
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    const handleDeleteException = () => {

    };

    const handleDeviceSuccess = (dataObject) => {
        // InfoDeviceId({}, handleInfoDeviceIdShowSuccess, handleInfoDeviceIdShowException);
        SetDeviceId("");
        SetDeviceName("");
        SetDeviceType("");
        SetSerial("");
        SetoLcation("");
        SetFriendly("");
        SetSSID("");
        setPassword("");
        setRefreshData((oldValue) => !oldValue);
        setIsAddButton(true);
        // setShowLocation(false) const [latitude, setLatitude] = useState("");
        setLongitude("");
        setLatitude("")


        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    const handleDeviceException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setLongitude("");
        setLatitude("")
    };
    const handleInfoDeviceIdShowSuccess = (dataObject) => {
        setRows(dataObject?.data || '');
    };
    const handleInfoDeviceIdShowException = () => {

    };


    // const GetType = (e) => {
    //     DeviceTypeShow({
    //         id: e.target.value
    //     }, handleTypesucess, handleTypeException);
    // };
    const handleTypesucess = (dataObject) => {
        SetDeviceTypelist(dataObject.data)
    };
    const handleTypeException = () => {

    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Grid container spacing={2} style={{ marginLeft: '5px' }}>
                <form onSubmit={handleSubmit}>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Grid container spacing={2} marginTop={"14px"}>
                            <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', marginLeft: '10px' }}>Add Device</Typography>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Serial Number</label>
                                    <Input
                                        style={{ height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB', padding: '10px' }}
                                        aria-label="Demo input"
                                        placeholder=" Serial Number..."
                                        value={DeviceId}
                                        onChange={(e) => SetDeviceId(e.target.value)}
                                        required
                                    />

                                </FormControl>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Device  Name</label>
                                    <Input
                                        style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Device Name..."
                                        value={Devicename}
                                        onChange={(e) => SetDeviceName(e.target.value)}
                                    />
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Device  Type</label>
                                <FormControl fullWidth variant='filled' style={{ marginTop: '10px' }}>

                                    <InputLabel id="device-type-label" style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>Device Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={devicetype}
                                        onChange={(e) => {
                                            SetDeviceType(e.target.value)
                                            // GetType(e)
                                        }}
                                        style={{ height: '45px' }} // Adjust the height here
                                    >

                                        {DeviceTypelist.map((data) => {
                                            return (
                                                <MenuItem value={data.id}> {data.deviceType}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Friendly Name</label>
                                    <Input
                                        style={{ height: '45px', padding: '10px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Friendly Name..."
                                        value={friendly}
                                        onChange={(e) => SetFriendly(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Serial Number</label>
                                    <Input
                                        style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Serial No..."
                                        value={serial}
                                        onChange={(e) => SetSerial(e.target.value)}
                                    />
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Location</label>
                                    <Input

                                        style={{ height: '45px', padding: '10px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Location..."
                                        readOnly={true}
                                        value={`${longitude}${latitude}`}
                                        onChange={(e) => SetoLcation(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleLocationVisibility}>
                                                    <LocationOnIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                    {error && <Text style={{ color: 'red' }}>{error}</Text>}

                                </FormControl>


                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>SSID</label>
                                    <Input
                                        style={{ height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder=" SSID..."
                                        value={ssid}
                                        onChange={(e) => SetSSID(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Wifi Password</label>
                                    <Input
                                        style={{ height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Wifi Password..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                            </Grid> */}

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Button variant="contained"
                                    type='submit'
                                    style={{
                                        fontSize: '10pt',
                                        fontFamily: 'Readex Pro - Light',
                                        display: 'flex',
                                        backgroundColor: '#EBEBEB',
                                        color: 'black',
                                        alignItems: "center",
                                    }}>
                                    {
                                        isAddButton ? 'Add' : 'update'
                                    } Device

                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={12} md={12} >
                    <Typography style={{
                        fontSize: '16px',
                        fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                        display: 'flex',

                    }}>
                        Units
                    </Typography>
                    <DataGrid
                        sx={{ border: 'none', fontSize: '16px', height: '55vh', backgroundColor: '#EBEBEB', borderRadius: '10px', marginTop: '5px' }}
                        rows={rows}
                        columns={columns}
                    />
                </Grid>
            </Grid>
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
                deleteId={deleteId}
                deleteService={DeviceDeleteService}
                handleSuccess={handleDelteSuccess}
                handleException={handleDeleteException}
            />


        </div>
    )
}

export default UserResult