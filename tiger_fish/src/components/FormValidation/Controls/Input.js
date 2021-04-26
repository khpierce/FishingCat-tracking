import { makeStyles, TextField } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    root: {
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#889696'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#889696'
        },
        // '&:hover .MuiOutlinedInput-input': {
        //     color: '#889696'
        // }
        '&:hover .MuiInputLabel-outlined': {
            color: '#889696'
        }
    }
})

export default function Input(props) {

    const {name, label, value, error=null, onChange, ...other} = props;
    const classes = useStyles();

    return (
        <TextField className={classes.root}
                variant='outlined'
                label={label}
                name={name}
                value={value} 
                onChange={onChange}
                {...other}
                {...(error && {error:true, helperText:error})}
        />
    )
}
