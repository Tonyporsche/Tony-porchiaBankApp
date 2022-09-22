import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function CustomAlert({ messege, severity = "success", open, setOpen }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {messege}
            </Alert>
        </Snackbar>)
}

export default CustomAlert