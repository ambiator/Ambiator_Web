import React, { useEffect } from 'react'
import UserTitle from './UserTitle'
import { Autocomplete, Button, Card, CardActions, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import UserAdd from './UserAdd'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ApplicationStore from '../Utility/localStorageUtil'
import { InfoDeviceId, ShowUserList, UserAddService, UserDeleteService, UserEditService } from '../ApiService/LoginPageService'
import Password from './Password'
import NotificationBar from '../notification/ServiceNotificationBar'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DeleteConfirmationDailog from '../Utility/confirmDeletion'



const DeviceResult = () => {
    const [error, setError] = useState('');
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [userRow, SetuserRow] = useState('');
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')
    const [isAddButton, setIsAddButton] = useState(true);
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [refreshData, setRefreshData] = useState(false)
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);

    const handleCloseNotify = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const columns = [
        {
            field: 'id',
            headerName: "User No",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'userName',
            headerName: "User Name",
            // width: 250,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'phoneNo',
            headerName: "Mobile",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'email',
            headerName: "Email",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'user_role',
            headerName: "Access",
            sortable: true,
            // width: 200,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'Comment',
            headerName: "Comment",
            sortable: true,
            // width: 200,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'created_at',
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
            // width: 180,
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
                    setId(params?.selectedRow?.id)
                    setName(params?.selectedRow?.userName);
                    setMobile(params?.selectedRow?.phoneNo);
                    setEmail(params?.selectedRow?.email);
                    setPassword('');
                    setIsAddButton(false);
                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        )
    }

    const DeleteData = (params) => {
        return (
            <DeleteIcon
                onClick={(event) => {
                    event.stopPropagation();
                    setId(params?.selectedRow?.id)
                    setDeleteDailogOpen(true);
                    setIsAddButton(false);
                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        )
    };
    useEffect(() => {
        ShowUserList(handleShowUserListSuccess, handleShowUserListException)
    }, [refreshData]);

    const handleShowUserListSuccess = (dataObject) => {
        SetuserRow(dataObject?.data || '');
    };
    const handleShowUserListException = () => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            UserAddService({
                companyName: userDetails?.companyName,
                fullName: name,
                email: email,
                mobile: mobile,
                afiliateCode: userDetails?.afiliateCode,
                password: password,
                userRole: 'user',
                city: userDetails?.city,
                address: userDetails?.address

            }, handleUserSuccess, handleUserException);
        } else {
            UserEditService({
                id: id,
                userName: name,
                email: email,
                phoneNo: mobile,
                password: password
            }, handleUserSuccess, handleUserException);
        }
    };
    const handleUserSuccess = (dataObject) => {
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setRefreshData((oldValue) => !oldValue)
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
        setIsAddButton(true);

    };

    const handleUserException = (errorObject, errorMessage) => {

        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleCloseNotify();
        }, 2000);
    };
    /*
        const handleInputChange = (e) => {
            const value = e.target.value;
            const regex = /^[0-15\b]*$/;
    
            if (regex.test(value)) {
                setMobile(value);
                if (value.length === 15) {
                    setError(''); // No error if the length is 10
                } else {
                    setError('Mobile number must be < 16 digits');
                }
            } else {
                setError('Please enter only numbers');
            }
        };
    */
    const handleInputChange = (e) => {
        const value = e.target.value;
        const regex = /^\+?[0-9]{0,15}$/;

        if (regex.test(value)) {
            setMobile(value);
            if (value.length <= 15) {
                setError('');
            } else {
                setError('Mobile number must be < 16 digits');
            }
        } else {
            setError('Please enter only numbers');
        }
    };
    /*
    const handleKeyPress = (e) => {
        const regex = /^\+[0-9\b]+$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    };*/

    const handleKeyPress = (e) => {
        const char = e.key;
        const currentValue = e.target.value;
        if (e.ctrlKey || e.altKey || char.length > 1) {
            return;
        }
        if (currentValue === '' && char === '+') {
            return;
        }
        if (/\d/.test(char)) {
            return;
        }
        e.preventDefault();
    };


    const handleUserDelteSuccess = (dataObject) => {
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
    const handleUserDeleteException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            setDeleteDailogOpen(false);
            handleCloseNotify();
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Grid container spacing={2} style={{ marginLeft: '0px', marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Grid container spacing={2}>
                        <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }}>Primary User</Typography>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Name</label>
                                <Input
                                    style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type Name..."
                                    value={userDetails?.userName}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ borderRadius: '4px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Company Name</label>
                                <Input
                                    style={{ padding: '10px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type company Name..."
                                    value={userDetails?.companyName}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Address</label>
                                <Input
                                    multiline
                                    // rows={2}
                                    style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type Address..."
                                    value={userDetails?.address}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>City</label>
                                <Input
                                    style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type City..."
                                    value={userDetails?.city}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Mobile</label>
                                <Input
                                    style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type Mobile..."
                                    value={userDetails?.phoneNo}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Affiliate code</label>
                                <Input
                                    style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                    aria-label="Demo input"
                                    placeholder="Type Affiliate code..."
                                    value={userDetails?.afiliateCode}
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button variant="contained"
                                onClick={() => {
                                    setOpen(true)

                                    // setIsChildPart(props.selectedRow.status)
                                }}
                                disabled={userDetails?.userRole === 'affiliate'}
                                style={{
                                    borderRadius: '4px',
                                    fontSize: '10pt',
                                    fontFamily: 'Readex Pro - Light',
                                    display: 'flex',
                                    backgroundColor: '#EBEBEB',
                                    color: 'black',
                                    alignItems: "center",
                                }}>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={5.7} md={5.7} lg={5.7} xl={5.7} >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }}>Additional User</Typography>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Name</label>
                                    <Input
                                        style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Type Name..."
                                        value={name}
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        onChange={(e) => {
                                            setName(e.target.value)

                                        }}

                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }}
                                        className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>
                                        Mobile
                                    </label>
                                    <>
                                        <Input
                                            style={{
                                                borderRadius: '4px',
                                                height: '45px',
                                                fontSize: '16px',
                                                fontFamily: 'Readex Pro',
                                                fontWeight: 'bold',
                                                backgroundColor: '#EBEBEB',
                                                padding: '10px'
                                            }}
                                            aria-label="Mobile input"
                                            placeholder="Type Mobile..."
                                            value={mobile}
                                            disabled={userDetails?.userRole === 'affiliate'}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        {error && <div style={{ color: 'red' }}>{error}</div>}
                                    </>

                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Email</label>
                                    <Input
                                        type='email'
                                        style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        placeholder="Type  Email..."
                                        value={email}
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        onChange={(e) => {
                                            setEmail(e.target.value)

                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl fullWidth>
                                    <label style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }} className='text-left font-[customfont] font-medium mb-2 tracking-[1px] text-black'>Password</label>
                                    <Input

                                        style={{ padding: '10px', borderRadius: '4px', height: '45px', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', backgroundColor: '#EBEBEB' }}
                                        aria-label="Demo input"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Type  Password..."
                                        value={password}
                                        disabled={userDetails?.userRole === 'affiliate'}
                                        onChange={(e) => {
                                            setPassword(e.target.value)

                                        }}
                                        endAdornment={(
                                            <InputAdornment position="flex-end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="flex-end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Button variant="contained"
                                    disabled={userDetails?.userRole === 'affiliate'}
                                    type='submit'
                                    style={{
                                        borderRadius: '4px',
                                        fontSize: '10pt',
                                        fontFamily: 'Readex Pro - Light',
                                        display: 'flex',
                                        backgroundColor: '#EBEBEB',
                                        color: 'black',
                                        alignItems: "center",
                                    }}>
                                    {
                                        isAddButton ? 'Add' : 'Update'
                                    } User

                                </Button>

                            </Grid>

                        </Grid>
                    </form>
                </Grid>



            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography style={{ fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start', }}>
                        Users
                    </Typography>
                    <DataGrid
                        sx={{ border: 'none', fontSize: '16px', height: '55vh', backgroundColor: '#EBEBEB', borderRadius: '10px', marginTop: '5px' }}
                        rows={userRow}
                        columns={columns}
                    />
                </Grid>
            </Grid>
            <Password
                open={open}
                setOpen={setOpen}
            />
            <NotificationBar
                handleClose={handleCloseNotify}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
                deleteId={id}
                deleteService={UserDeleteService}
                handleSuccess={handleUserDelteSuccess}
                handleException={handleUserDeleteException}
            />
        </div >
    )
}

export default DeviceResult