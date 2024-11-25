import { Box, Typography } from '@mui/material'
import React from 'react'

const UserToolbar = () => {
    return (
        <Box
            sx={{
                mb: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography
                sx={{ m: 1 }}
                variant="h6"
            >
                User
            </Typography>
            {/* <Box
        sx={{ m: 1 }}
        onClick={() => {
            props.setIsAddButton(true);
            props.setEditDeviceType([]);
            props.setOpen(true);
        }}
    >
        <Stack direction="row" spacing={2}>
            <Fab variant="extended" size="medium" color="primary" aria-label="add" style={{ background: '#0e2d5d', color: '#f5f5fc' }}>
                <AddIcon sx={{ mr: 1 }} />
                Add Device Type
            </Fab>
        </Stack>
    </Box> */}
        </Box>
    )
}

export default UserToolbar