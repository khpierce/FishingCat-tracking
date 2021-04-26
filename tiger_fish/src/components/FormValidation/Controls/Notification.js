import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import React from 'react'

export default function Notification(props) {

    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (       
        <Snackbar className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={handleClose}
        >
            <Alert
            severity={notify.type}
            onClose={handleClose}

            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
