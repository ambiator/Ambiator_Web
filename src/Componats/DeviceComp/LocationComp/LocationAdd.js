import { Textarea } from '@mui/joy';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

const LocationAdd = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: '40%' } }}
            maxWidth="sm"
            open={open}
        >
            <DialogTitle sx={{ fontWeight: '600', letterSpacing: '1px', textAlign: 'center', color: 'white', backgroundColor: '#18143D' }}>
                Add Location
            </DialogTitle>
            <DialogContent style={{ paddingRight: '15+px' }} >
                <form >
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={12} md={4} lg={12} xl={12}>
                            <TextField  style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Location" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={12} xl={12}>
                            <TextField  style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Description" variant="outlined" />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ borderRadius: '15px', color: 'white', backgroundColor: '#18143D', fontWeight: 'bold' }} variant="contained">Cancle</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LocationAdd