import React, { useState } from 'react'
import GoogleApiWrapper from './../Maps/GoogleMaps'
import styled from 'styled-components'
import * as Service from '../FormValidation/Service/Service'

const MapSection = styled.div`
    display: flex;
    width: calc(100% - 18.5rem);
    height: 550px;
    background: beige;
`

const MapSectionHome = () => {

    const [records, setRecords] = useState([])
    const [keep, setKeep] = useState([])

    React.useEffect(async() => {
        Service.getAllfishingCat().then(res => {
            setRecords(res.data)
        })
        Service.getAllLocation().then(res => {
            setKeep(res.data)
        })
    }, [])

    const removeUndefinedFromArray = (arrayToClean) => {
        const cleanedArray = [];
        arrayToClean.forEach((val) => {
          if(typeof val !== "undefined"){
            cleanedArray.push(val);
          }
        });
      
        return cleanedArray;
    }

    if (records.length !== 0 && keep.length === 0) { // records = profile , keep = location
        setRecords([])
    }
    else {
        React.useEffect(() => {
            Service.getAllfishingCat().then(res => {
                setRecords(res.data)
            })
        }, [])
    }

    let imeiArray=[]
    Object.entries(records).map(([key, value]) => {
        imeiArray.push(value.deviceIMEI)
    })
    console.log(imeiArray)

    var AllLocation = []
    {imeiArray.map(MyimeiArray => {
        const FilterData = keep.filter(item => item.deviceIMEI.includes(MyimeiArray))
        var FilterDataLast = FilterData.pop()
        console.log(FilterDataLast)
        if (FilterDataLast !== undefined) {
            console.log("in")
            const FilterProfile = records.filter(item => item.deviceIMEI.includes(MyimeiArray))
            const FilterProfileLast = FilterProfile.pop().name

            FilterDataLast.name = FilterProfileLast

            // const profile_name = {name: FilterProfileLast}
            // const FilterDataLast = {...FilterDataLast, ...profile_name}

            AllLocation.push(FilterDataLast)
            AllLocation = removeUndefinedFromArray(AllLocation)
        }
    })}

    return (
        <>
            <MapSection>
                <GoogleApiWrapper ListLocation={AllLocation}/>
            </MapSection>
        </>
    )
}

export default MapSectionHome

