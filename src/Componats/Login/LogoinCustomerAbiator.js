// import React, { useEffect, useState, } from 'react'
// import { Grid, Avatar, TextField, Button, Stack, Typography, Card, CardContent, Input, FormControl, } from '@mui/material'
// import Hidden from '@mui/material/Hidden';
// import { useNavigate } from 'react-router-dom';
// import { LoginService } from '../ApiService/LoginPageService';
// import NotificationBar from '../notification/ServiceNotificationBar';
// import ApplicationStore from '../Utility/localStorageUtil';
// import AmbiatorIcon from '../../Images/ambiatorLogo.jpg';
// import AmbiatorLogo from '../../Images/AmbiatorLogo.png';

// const LogoinCustomerAbiator = () => {
//     const navigate = useNavigate();
//     const [openNotification, setNotification] = useState({
//         status: false,
//         type: 'error',
//         message: 'Login Successful',
//     });

//     useEffect(() => {
//         const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
//         return userDetails?.accessToken ? navigate("/") : navigate("/login");
//     }, []);

//     const successCaseCode = [200, 201];
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//     function submit(e) {
//         e.preventDefault();
//         LoginService({ email: email, password: password, userRole: "ambiator" })
//             .then((response) => {
//                 if (successCaseCode.indexOf(response.status) > -1) {
//                     console.log('Login Succesfull..!');
//                     setNotification({
//                         status: true,
//                         type: 'success',
//                         message: 'Login Succesfull..!',
//                     });

//                     return response.json();
//                 }
//                 throw {
//                     errorStatus: response.status,
//                     errorObject: response.json(),
//                 };
//             }).then((data) => {
//                 ApplicationStore().setStorage('userDetails', data);
//                 setTimeout(() => {
//                     navigate("/MainDashboardComp");
//                 }, 2000);
//             }).catch((error) => {
//                 error?.errorObject?.then((errorResponse) => {
//                     console.log(errorResponse.error ? errorResponse.error : errorResponse.message);
//                     setNotification({
//                         status: true,
//                         type: 'error',
//                         message: errorResponse.error ? errorResponse.error : errorResponse.message,
//                     });
//                     setTimeout(() => {
//                         handleClose();
//                     }, 2000);
//                 });
//             });

//     }


//     const avatarStyle = { backgroundColor: '#3B3531' }
//     const handleCloseNotify = () => {
//         setNotification({
//             status: false,
//             type: '',
//             message: '',
//         });
//     };

//     const handleClose = () => {
//         setNotification({
//             status: false,
//             type: '',
//             message: '',
//         });
//     };

//     return (
//         <form onSubmit={submit}>
//             <Grid container spacing={2}>
//                 <Grid item style={{ height: '70vh', display: 'flex', alignItems: 'center' }} xs={12} sm={12} md={5} lg={5} xl={5} >
//                     <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column' }} >
//                         <Grid item sx={12} sm={12} md={12} lg={12} xl={12} align='center' >
//                             <img
//                                 style={{
//                                     alignSelf: 'center',
//                                     textAlign: 'center',
//                                     fontWeight: 'bold',
//                                     // width: '200px',
//                                     // height: '120px'
//                                     width: '130px',
//                                     height: 'auto'
//                                 }} src={AmbiatorIcon} />
//                         </Grid>
//                         <Grid item sx={12} sm={12} md={12} lg={12} xl={12} align='center' >
//                             <Typography variant="h6" style={{ alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}> Sign in to your account </Typography>
//                         </Grid>
//                         <Grid item sx={12} sm={12} md={12} lg={12} xl={12}>
//                             <FormControl fullWidth>

//                                 <Input
//                                     type='email'
//                                     id="email"
//                                     label="Email"
//                                     variant="outlined"
//                                     placeholder='Enter User Email'
//                                     required
//                                     fullWidth
//                                     name='email'

//                                     onChange={(e) => {

//                                         setEmail(e.target.value);
//                                     }
//                                     }
//                                     value={email}
//                                 />
//                             </FormControl>

//                         </Grid>
//                         <Grid item sx={12} sm={12} md={12} lg={12} xl={12}>
//                             <FormControl fullWidth>
//                                 <Input
//                                     id="password"
//                                     margin="normal"
//                                     label="Password"
//                                     variant="outlined"
//                                     placeholder='Enter password'
//                                     required
//                                     fullWidth
//                                     type='password'
//                                     name='password'
//                                     onChange={(e) => {

//                                         setPassword(e.target.value);
//                                     }
//                                     }
//                                     value={password} />
//                             </FormControl>


//                         </Grid>
//                         <Grid item sx={12} sm={12} md={12} lg={12} xl={12} >
//                             <Button style={{ alignSelf: 'center', textAlign: 'center', backgroundColor: '#602bf9', borderRadius: '25px' }}
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                             >
//                                 Sign In
//                             </Button>
//                         </Grid>
//                     </Grid>

//                 </Grid>
//                 <Hidden only={["sm", 'xs']}>
//                     <Grid item sx={12} sm={7} md={6} lg={7} xl={7} style={{ display: 'flex', alignItems: 'center' }}>
//                         {/* <Card style={{
//                             backgroundColor: '#dfe1f7',
//                             display: 'flex',
//                             alignItems: 'center',
//                             width: '80vw',
//                             height: '86vh',
//                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the values as needed
//                             transition: 'transform 0.3s',
//                             '&:hover': {
//                                 transform: 'scale(1.05)', // Adjust the scaling factor as needed
//                             }
//                         }}> */}

//                         <CardContent >
//                             <Stack
//                                 direction="row"
//                                 justifyContent="center"
//                                 alignItems="center"
//                                 spacing={2}

//                             >
//                                 <img src={AmbiatorLogo} alt="React Logo" height="100%" width="100%" />
//                             </Stack>

//                         </CardContent>
//                         {/* </Card> */}
//                     </Grid>
//                 </Hidden>
//                 <NotificationBar
//                     handleClose={handleClose}
//                     notificationContent={openNotification.message}
//                     openNotification={openNotification.status}
//                     type={openNotification.type}
//                 />
//             </Grid>
//         </form>
//     )
// }

// export default LogoinCustomerAbiator


import React, { useEffect, useState } from 'react';
import { Grid, Avatar, TextField, Button, Stack, Typography, Card, CardContent, Input, FormControl } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../ApiService/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ApplicationStore from '../Utility/localStorageUtil';
import AmbiatorIcon from '../../Images/ambiatorLogo.jpg';
import AmbiatorLogo from '../../Images/AmbiatorLogo.png';

const LogoinCustomerAbiator = () => {
    const navigate = useNavigate();
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: 'Login Successful',
    });

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        return userDetails?.accessToken ? navigate("/") : navigate("/login");
    }, []);

    const successCaseCode = [200, 201];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submit(e) {
        e.preventDefault();
        LoginService({ email: email, password: password, userRole: "ambiator" })
            .then((response) => {
                if (successCaseCode.indexOf(response.status) > -1) {
                    console.log('Login Succesfull..!');

                    setNotification({
                        status: true,
                        type: 'success',
                        message: 'Login Succesfull..!',
                    });

                    return response.json();
                }

                throw new Error(`Error Status: ${response.status}, Error Object: ${response.json()}`);
            }).then((data) => {
                ApplicationStore().setStorage('userDetails', data);
                setTimeout(() => {
                    navigate("/MainDashboardComp");
                }, 2000);
            }).catch((error) => {
                error?.message ? console.log(error.message) : console.log('Unknown Error');
                setNotification({
                    status: true,
                    type: 'error',
                    message: error?.message || 'An unexpected error occurred.',
                });

                setTimeout(() => {
                    handleClose();
                }, 2000);
            });
    }

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    return (
        <form onSubmit={submit}>
            <Grid container spacing={2}>
                <Grid item style={{ height: '70vh', display: 'flex', alignItems: 'center' }} xs={12} sm={12} md={5} lg={5} xl={5} >
                    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column' }} >
                        <Grid item sx={12} sm={12} md={12} lg={12} xl={12} align='center' >
                            <img
                                src={AmbiatorIcon}
                                alt="Ambiator Icon"
                                style={{
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    width: '130px',
                                    height: 'auto'
                                }}
                            />
                        </Grid>
                        <Grid item sx={12} sm={12} md={12} lg={12} xl={12} align='center' >
                            <Typography variant="h6" style={{ alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}> Sign in to your account </Typography>
                        </Grid>
                        <Grid item sx={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <Input
                                    type='email'
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    placeholder='Enter User Email'
                                    required
                                    fullWidth
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sx={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth>
                                <Input
                                    id="password"
                                    margin="normal"
                                    label="Password"
                                    variant="outlined"
                                    placeholder='Enter password'
                                    required
                                    fullWidth
                                    type='password'
                                    name='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sx={12} sm={12} md={12} lg={12} xl={12} >
                            <Button style={{ alignSelf: 'center', textAlign: 'center', backgroundColor: '#602bf9', borderRadius: '25px' }}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden only={["sm", 'xs']}>
                    <Grid item sx={12} sm={7} md={6} lg={7} xl={7} style={{ display: 'flex', alignItems: 'center' }}>
                        <CardContent >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <img src={AmbiatorLogo} alt="Ambiator Logo" height="100%" width="100%" />
                            </Stack>
                        </CardContent>
                    </Grid>
                </Hidden>
                <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
            </Grid>
        </form>
    );
};

export default LogoinCustomerAbiator;
