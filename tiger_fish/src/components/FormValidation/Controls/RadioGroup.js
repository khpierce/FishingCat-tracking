import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: '#889696'
        },
        '& .MuiRadio-colorSecondary': {
            '&:hover' : {
                background: '#88969620'
            }
        }
    }
})

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props;
    const classes = useStyles();

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup className={classes.root} row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}