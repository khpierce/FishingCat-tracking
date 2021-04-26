import { Button, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: '#DC143C50',
        '& .MuiButton-label': {
            color: '#DC143C'
        }
    },
    primary: {
        backgroundColor: '#D2D4C8',
        '& .MuiButton-label': {
            color: '#5F7470'
        }
    },
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
            {children}
        </Button>
    )
}
