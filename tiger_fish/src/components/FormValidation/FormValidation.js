import React,{useState} from 'react'
import FormValidationForm from './FormValidationForm'
import { Paper, makeStyles, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core'
import MyTable from './MyTable'
import * as Service from './Service/Service'
import Controls from './Controls/Controls'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Search } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import Popup from './Popup'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import RoomIcon from '@material-ui/icons/Room'
import GetAppIcon from '@material-ui/icons/GetApp'
import Notification from './Controls/Notification'
import ConfirmDelete from './ConfirmDelete'
import { NavLink as Link } from 'react-router-dom';
import { CSVLink } from "react-csv";


const ActionButtonContainer = styled.div`
    display: flex;
    width: 65%;
    flex-direction: column;
`

const EditAndDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const MapAndDownload = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const useStyle = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '70%',
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#889696'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#889696'
        },
        '&:hover .MuiInputLabel-outlined': {
            color: '#889696'
        }
    }
}))

const headCells = [
    {id: 'deviceIMEI', label: 'Device IMEI'},
    {id: 'name', label: 'Name'},
    {id: 'age', label: 'Age'},
    {id: 'weight', label: 'Weight'},
    {id: 'sex', label: 'Sex'},
    {id: 'installationDate', label: 'Installation Date'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function FormValidation() {

    const classes = useStyle();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title:'', subtitle:''})
    // const [records, setRecords] = useState(Service.getAllfishingCat())
    const [records, setRecords] = useState([])
    const [keep, setKeep] = useState([])

    const headers = [
        { label: "Device IMEI", key: "deviceIMEI" },
        { label: "Location Date", key: "locationDate" },
        { label: "Location Time", key: "locationTime" },
        { label: "Latitude", key: "lat" },
        { label: "Longtitude", key: "lng" }
      ];

    const [recordsDownload, setRecordsDownload] = useState([])

    React.useEffect(() => {
        Service.getAllfishingCat().then(res => {
            setRecords(res.data)
        })
    }, [])

    React.useEffect(() => {
        Service.getAllLocation().then(res => {
            setKeep(res.data)
            setRecordsDownload(res.data)
        })
    }, [])

    const csvReport = {
        data: recordsDownload,
        headers: headers,
        filename: 'locations.csv'
    };

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = MyTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === '')
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }


    const AddOrEdit = (fishingCat, resetForm) => {
        if (fishingCat.id === 0)
            Service.insertFishingCat(fishingCat)
        else
            Service.updateFishingCat(fishingCat)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        // setRecords(Service.getAllfishingCat())
        // setRecords([])
        Service.getAllfishingCat().then(res => {
            console.log(res.data)
            setRecords(res.data)
        })
        console.log(records)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }


    const onDelete = (id, imei) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Service.deleteFishingCat(id)
        // setRecords(Service.getAllfishingCat())
        Service.deleteAllLocation(imei)
        Service.getAllfishingCat().then(res => {
            setRecords(res.data)
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        // setTimeout(
        //     console.log("time out"),
        //     () => this.setState({ position: 1 }), 
        //     3000
        // );
        //window.location.reload();
    }

    const Filterdata = (imei) => {
        const myFilterData2 = recordsDownload.filter(item => item.deviceIMEI.includes(imei))
        // console.log(myFilterData2)
        return myFilterData2
    }

    return (
        <>
            <Paper className={classes.pageContent}>
                {/* <Toolbar> */}
                    <TopContainer>
                        <Controls.Input 
                        label='Search'
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={ handleSearch }
                        />
                        <ButtonBox>
                            <Controls.Button 
                            style={{
                                backgroundColor: '#889696'
                            }}
                            text='Add New'
                            variant='contained'
                            startIcon={<AddIcon />}
                            onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                            />
                            <CSVLink {...csvReport} style={{textDecoration: 'none'}}>
                                <Button 
                                style={{
                                    color: '#889696',
                                    border: '1px solid #889696',
                                }}
                                className={classes.btn}
                                variant='outlined'
                                size='large'
                                startIcon={<GetAppIcon />}
                                >
                                    Download All
                                </Button>
                            </CSVLink>    
                        </ButtonBox>
                    </TopContainer>
                {/* </Toolbar> */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => 
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.deviceIMEI}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.age}</TableCell>
                                        <TableCell>{item.weight}</TableCell>
                                        <TableCell>{item.sex}</TableCell>
                                        <TableCell>{item.installationDate}</TableCell>
                                        <TableCell>
                                            <ActionButtonContainer>
                                                <EditAndDelete>
                                                    <Controls.ActionButton 
                                                    color='primary'
                                                    onClick={() => {openInPopup(item)}}>
                                                        <EditOutlinedIcon fontSize='small' />
                                                    </Controls.ActionButton>
                                                    <Controls.ActionButton 
                                                    color='secondary'
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Are you sure to delete this record?',
                                                            subtitle: "You can't undo this operation.",
                                                            onConfirm: () => {onDelete(item.id, item.deviceIMEI)}
                                                        })
                                                        }}>
                                                        <DeleteIcon fontSize='small' />
                                                    </Controls.ActionButton>
                                                </EditAndDelete>
                                                <MapAndDownload>
                                                    <CSVLink
                                                    data={Filterdata(item.deviceIMEI)} 
                                                    headers={headers} 
                                                    filename={`${item.deviceIMEI}_location.csv`} 
                                                    style={{textDecoration: 'none'}}
                                                    >
                                                        <Controls.ActionButton 
                                                        color='primary'
                                                        >
                                                            <GetAppIcon fontSize='small' />
                                                        </Controls.ActionButton>
                                                    </CSVLink>
                                                    <Link 
                                                    to={{
                                                        pathname: `/IndividualMap/${item.deviceIMEI}`,
                                                        state: {
                                                            imei: item.deviceIMEI,
                                                            data: keep}
                                                        }} 
                                                    style={{textDecoration: 'none'}}
                                                    >
                                                        <Controls.ActionButton
                                                        color='primary'
                                                        >
                                                            <RoomIcon fontSize='small' />
                                                        </Controls.ActionButton>
                                                    </Link>
                                                </MapAndDownload>
                                            </ActionButtonContainer>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
            title='Fishing Cat Form'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
                <FormValidationForm 
                recordForEdit={recordForEdit}
                AddOrEdit={AddOrEdit}
                />
            </Popup>
            <Notification
            notify={notify}
            setNotify={setNotify}
            />
            <ConfirmDelete 
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
