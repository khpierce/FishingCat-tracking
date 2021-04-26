import { Grid } from '@material-ui/core';
import React, {useEffect} from 'react'
import {MyForm, Form}  from './MyForm'
import Controls from './Controls/Controls'
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components'
import * as moment  from 'moment';


const sexItems = [
    {id: 'Male', title:'Male'},
    {id: 'Female', title:'Female'}
] 

const initialFValues = {
    id: 0,
    deviceIMEI: '',
    name: '',
    age: '',
    weight: '',
    sex: 'Male',
    installationDate: moment(new Date()).format('DD/MMM/YYYY')
}

const Firstcolumn = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Secondcolumn = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
`

const AgeWeightBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 94%;
`

export default function FormValidationForm(props) {

    const {AddOrEdit, recordForEdit} = props 

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('name' in fieldValues)
            temp.name = fieldValues.name?'':'This field is required.'
        if ('age' in fieldValues)
            temp.age = (/^[1-9]+$/).test(fieldValues.age)?'':'Numbers only.'
        if ('weight' in fieldValues)
            temp.weight = (/^[1-9]+$/).test(fieldValues.weight)?'':'Numbers only.'
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === '')
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }=MyForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            AddOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // const refreshPage = () => {
    //     window.location.reload();
    // }

    const CHARACTER_LIMIT = 15;


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Firstcolumn>
                    <Controls.Input
                    name='deviceIMEI'
                    label='Device IMEI (15-digit number)'
                    value={values.deviceIMEI}
                    onChange={handleInputChange}
                    error={errors.deviceIMEI}
                    helperText={`${values.deviceIMEI.length}/${CHARACTER_LIMIT}`}
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,15)
                    }}
                    type="number"
                    onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                    />
                    <Controls.Input
                    name='name'
                    label='Name'
                    value={values.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    />
                    <AgeWeightBox>
                        <Controls.Input
                        name='age'
                        label='Age'
                        value={values.age}
                        onChange={handleInputChange}
                        error={errors.age}
                        type="number"
                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                        />
                        <Controls.Input
                        name='weight'
                        label='Weight'
                        variant='outlined'
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                        }}
                        type="number"
                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                        />
                    </AgeWeightBox>
                </Firstcolumn>
                <Secondcolumn>
                    <Controls.RadioGroup
                    name='sex'
                    label='Sex'
                    value={values.sex}
                    onChange={handleInputChange}
                    items={sexItems}
                    />
                    <Controls.DatePicker
                    name='installationDate'
                    label='Installation Date'
                    value={moment(values.installationDate).format('DD/MMM/YYYY')}
                    onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button 
                        style={{
                            backgroundColor: '#889696'
                        }}
                        type='submit' //เป็น type ของปุ่ม html (มี 3 แบบ button, sumbit, reset)
                        text='SUBMIT'
                        // onClick={refreshPage}
                        />
                        <Controls.Button
                        type='reset'
                        text='RESET'
                        color='default'
                        onClick={resetForm}
                        />
                    </div>
                </Secondcolumn>
            </Grid>
        </Form>
    )
}
