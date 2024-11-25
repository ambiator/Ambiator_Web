import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ApplicationStore from '../Utility/localStorageUtil';

const UtilityForManage = (selectedData) => {
    console.log("fsfdfd", selectedData.selectedData.deviceId)
    const [unitType, setUnitType] = useState('');
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [invNo, setInvNo] = useState('');
    const [invDate, setInvDate] = useState('');
    const [device_type, Setdevice_type] = useState('');

    const [afiliateCode, SetafiliateCode] = useState('');


    useEffect(() => {
        setUnitType(selectedData?.selectedData?.deviceId || '');
        Setdevice_type(selectedData?.selectedData?.deviceType || '')
        SetafiliateCode(selectedData?.selectedData?.afiliateCode || '')
        setInvNo(selectedData?.selectedData?.invNo || '')
        setInvDate(selectedData?.selectedData?.invDate || '')

    }, []);
    console.log('selectedData====>', selectedData?.deviceId);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6.3}>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Unit Serial No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {unitType}
                        </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Unit Type.
                        </Typography>

                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {device_type}
                        </Typography>

                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Customer Name.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.userName}
                        </Typography>

                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Company Name.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.companyName}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Contact No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.phoneNo}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Customer Address.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.address}
                        </Typography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            City.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {userDetails?.city}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Affiliate Code.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold' }}>
                            {afiliateCode}
                        </Typography>
                    </div>


                </Grid>
                <Grid item xs={6} md={5.7}>
                    <div style={{ display: "flex", }}>
                        <Typography style={{
                            display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                        }}>
                            Invoice No.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            {invNo}
                        </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            Invoice Date.
                        </Typography>
                        <Typography style={{ display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro', fontWeight: 'bold', marginRight: "9px" }}>
                            {invDate}
                        </Typography>

                    </div>
                    <div>
                        <Typography style={{
                            display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                        }}>
                            First Start Date.
                        </Typography>
                    </div>
                    <div>
                        <Typography style={{
                            display: 'flex', fontSize: '16px', fontFamily: 'Readex Pro',
                            fontWeight: 'bold',
                        }}>
                            Last Used Date.
                        </Typography>
                    </div>
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '14pt',  fontFamily: 'Readex Pro',
                                    fontWeight: 'bold', }}>
                                Invoice No
                            </Typography>

                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '14pt',  fontFamily: 'Readex Pro',
                                    fontWeight: 'bold', }}>
                                Invoice Date.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '14pt',  fontFamily: 'Readex Pro',
                                    fontWeight: 'bold', }}>
                                First Start Date
                            </Typography>

                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '14pt',  fontFamily: 'Readex Pro',
                                    fontWeight: 'bold', }}>
                                Last Used Data
                            </Typography>
                        </Grid>
                    </Grid> */}
                </Grid>

            </Grid>
        </div>
    )
}

export default UtilityForManage