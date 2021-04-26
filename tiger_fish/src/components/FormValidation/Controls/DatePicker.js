// import DateFnsUtils from '@date-io/date-fns'
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'
import * as moment  from 'moment';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value: moment(value).format('DD/MMM/YYYY')
        }
    })

    console.log(value)

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <KeyboardDatePicker disableToolbar variant='inline' inputVariant='outlined' 
                label={label} 
                format='DD/MMM/YYYY' 
                name={name} 
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
