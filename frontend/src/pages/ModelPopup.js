import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import Aos from 'aos';

const ModelPopup = () => {

    const [open, openChange] = useState(false);

    const functionPopup = () => {
        openChange(true);
    }

    const closepopup = () => {
        openChange(false);
    }

    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <>
            <div >
                <Button onClick={functionPopup}>Open popup</Button>
                <Dialog open={open} fullWidth maxWidth="xl">
                    <DialogTitle>User Screen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>This screen sjdjdj</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closepopup}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0">
                <h3>fuffuffjfjfjf</h3>
            </div>
        </>
    )
}

export default ModelPopup
