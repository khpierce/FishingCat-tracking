import React from 'react'
import GoogleApiWrapper from './MapForIndividual';
import styled from 'styled-components'
import * as moment  from 'moment';
import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


const Map = styled.div`
    position: 'relative';
    width: 100%;
    height: calc(100vh - 80px);
`
const Page = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 91.5vh;
`
const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 91.5vh;
    width: 300px;
    background: #B8BDB5;
    padding-top: 80px;
`

const Box = styled.div`
    display: flex;
    flex-direction: center;
    align-items: center;
    background: #E0E2DB;
    height: 70px;
    width: 240px;
    border-radius: 5px;
`


// export default class IndividualMap extends Component {

//     render() {
//         const imei  = this.props.location.state.imei
//         const keep = this.props.location.state.data

//         const FilterData = keep.filter(item => item.deviceIMEI.includes(imei))
//         console.log(FilterData)

//         // const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('DD/MMM/YYYY'));
//         // const [selectedDate, setSelectedDate] = React.useState(new Date()); 

//         const handleDateChange = (date) => {
//             setSelectedDate(date);
//         };

//         return (
//             <MuiPickersUtilsProvider utils={MomentUtils}>
//                 <Page>
//                     <SideBar>
//                         <Box>
//                             <Grid container justify="space-around">
//                                 <KeyboardDatePicker 
//                                 disableToolbar
//                                 variant="inline"
//                                 format='DD/MMM/YYYY'
//                                 margin="normal"
//                                 id="date-picker-inline"
//                                 label="Select Date"
//                                 value={selectedDate}
//                                 onChange={handleDateChange}
//                                 KeyboardButtonProps={{
//                                 'aria-label': 'change date',
//                                 }}
//                                 />
//                             </Grid>
//                         </Box>
//                     </SideBar>
//                     <Map>
//                         <GoogleApiWrapper listofLocationFromParent={FilterData} />
//                     </Map>
//                 </Page>
//             </MuiPickersUtilsProvider>
//         )
//     }
// }


export default function IndividualMap(props) {
    const imei  = props.location.state.imei
    const keep = props.location.state.data
    console.log(imei)
    console.log(keep)

    const FilterData = keep.filter(item => item.deviceIMEI.includes(imei))
    console.log(FilterData)

    // const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('DD/MMM/YYYY'));
    const [selectedDate, setSelectedDate] = React.useState(null); 
    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format('DD/MMM/YYYY'));
    };

    console.log(selectedDate)

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Page>
                <SideBar>
                    <Box>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker 
                            disableToolbar
                            variant="inline"
                            format='DD/MMM/YYYY'
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                    </Box>
                </SideBar>
                <Map>
                    <GoogleApiWrapper listofLocationFromParent={{FilterData: FilterData, selectedDate: selectedDate}} />
                </Map>
            </Page>
        </MuiPickersUtilsProvider>
    )
}


