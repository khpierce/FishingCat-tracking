import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography, IconButton } from '@material-ui/core'
import React from 'react'
import Controls from './Controls/Controls'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogIcon: {
        backgroundColor: '#DC143C20',
        color: '#DC143C',
        '&:hover': {
            backgroundColor: '#DC143C10',
            cursor: 'defualt'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '9rem'
        }
    },
    dialogAlign: {
        textAlign: 'center',
        '& .MuiTypography-h6': {
            fontFamily: 'PT Sans',
            fontWeight: '700'
        },
        '& .MuiTypography-subtitle2': {
            fontFamily: 'PT Sans'
        }
    },
    dialogJustify: {
        justifyContent: 'center'
    }
}))

export default function ConfirmDelete(props) {

    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} className={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogAlign}>
                <IconButton disableRipple className={classes.dialogIcon}>
                    <ContactSupportIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogAlign}>
                <Typography variant='h6'>
                    {confirmDialog.title}
                </Typography>
                <Typography variant='subtitle2'>
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogJustify}>
                <Controls.Button
                text='No'
                style={{
                    backgroundColor: '#DC143C50'
                }}
                onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}
                />
                <Controls.Button 
                text='Yes'
                style={{
                    backgroundColor: '#DC143C'
                }}
                onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}
