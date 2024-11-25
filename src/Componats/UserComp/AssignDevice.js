import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { AssignedDevice, AsssignedCustomer, DeviceAsssigned } from '../ApiService/LoginPageService'
import NotificationBar from '../notification/ServiceNotificationBar'
import ApplicationStore from '../Utility/localStorageUtil'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AssignDevice = () => {
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [Assign, SetAssign] = useState('');
    const [simProvider, SetSimProvider] = useState('')
    const [simcardNumber, SetSimCardNumber] = useState('');
    const [Assignlist, SetAssignlist] = useState([]);
    const [CustomerAsssign, SetCustomerAsssign] = useState('');
    const [CustomerList, SetCustomerList] = useState([]);
    const [isAddButton, setIsAddButton] = useState(true);
    const [invoiceNo, SetInvoiceNo] = useState('');
    const [InvoiceDate, SetInvoiceDate] = useState('')
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    })

    useEffect(() => {
        DeviceAsssigned(handleAssignedSucess, hanldeAssignedException);
        AsssignedCustomer(handlecustomerSucess, handlecustomerException)
    }, []);

    const handleAssignedSucess = (dataObject) => {
        SetAssignlist(dataObject.data)
    };
    const hanldeAssignedException = (errorObject, errorMessage) => {

    };
    const handlecustomerSucess = (dataObject) => {
        SetCustomerList(dataObject.data)
    };
    const handlecustomerException = (errorObject, errorMessage) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            AssignedDevice({
                customerId: CustomerAsssign,
                deviceId: Assign,
                invNo: invoiceNo,
                invDate: InvoiceDate,
                simProvider: simProvider,
                simCardNo: simcardNumber


            }, handleAssignDeviceSuccess, handleAssignDeviceException);

        }
    };
    const handleAssignDeviceSuccess = (dataObject) => {
        SetAssign('');
        SetAssignlist([]);
        SetCustomerAsssign('');
        SetInvoiceNo('');
        SetInvoiceDate('');
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };

    const handleAssignDeviceException = (errorObject, errorMessage) => {
        console.log(errorMessage);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    const handleAssignSearchItemChange = (value) => {
        if (value !== null) {
            SetAssign(value.id);
        }
    };
    const handleCloseNotify = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Grid container spacing={2} style={{ marginLeft: '15px' }}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
                        <Grid container spacing={2} marginTop={"14px"}>
                            <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', marginLeft: '10px' }}>Assign Device</Typography>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'> Serial Number</label>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Assignlist}
                                    getOptionLabel={(option) => option.deviceId || ''}
                                    renderInput={(params) => <TextField
                                        variant='filled'
                                        {...params}
                                        label="Serial Number"
                                        style={{ height: '60px', borderRadius: '4px', marginTop: '10px' }}
                                    />}
                                    onChange={(event, value) => handleAssignSearchItemChange(value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Customer ID</label>
                                <FormControl fullWidth variant='filled' style={{ marginTop: '10px', }}>
                                    <InputLabel id="device-type-label" style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>Customer ID</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={CustomerAsssign}
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        onChange={(e) => {
                                            SetCustomerAsssign(e.target.value)
                                        }}
                                        style={{ height: '60px', borderRadius: '4px' }}
                                        required
                                    >
                                        {CustomerList.map((data) => {
                                            return (
                                                <MenuItem value={data.id}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span>{data.userName}</span>
                                                        <span>{data.email}</span>
                                                    </div>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{
                                        fontSize: '16px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                        className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>
                                        Invoice No.
                                    </label>
                                    <Input
                                        style={{ borderRadius: '4px', padding: '10px', height: '60px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder=" Invoice Number..."
                                        value={invoiceNo}
                                        onChange={(e) => SetInvoiceNo(e.target.value)}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{
                                        fontSize: '16px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                        className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>
                                        Invoice Date.
                                    </label>
                                    <Input
                                        style={{ borderRadius: '4px', padding: '10px', height: '60px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder=" Invoice Date..."
                                        type='date'
                                        value={InvoiceDate}
                                        onChange={(e) => SetInvoiceDate(e.target.value)}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{
                                        fontSize: '16px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                        className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>
                                        4G provider
                                    </label>
                                    <Input
                                        style={{ borderRadius: '4px', padding: '10px', height: '60px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder=" 4G provider..."
                                        type='Text'
                                        value={simProvider}
                                        onChange={(e) => SetSimProvider(e.target.value)}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{
                                        fontSize: '16px',
                                        fontFamily: 'Readex Pro',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                        className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>
                                        Sim Card Number.
                                    </label>
                                    <Input
                                        style={{ borderRadius: '4px', padding: '10px', height: '60px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder=" Sim Card Number...."
                                        type='text'
                                        value={simcardNumber}
                                        onChange={(e) => SetSimCardNumber(e.target.value)}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Button variant="contained"
                                    type='submit'
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    style={{
                                        fontSize: '10pt',
                                        fontFamily: 'Readex Pro - Light',
                                        display: 'flex',
                                        backgroundColor: '#EBEBEB',
                                        color: 'black',
                                        alignItems: "center",
                                        borderRadius: '4px'
                                    }}>
                                    Assign Device
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </div>
    )
}

export default AssignDevice