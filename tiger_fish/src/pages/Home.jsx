import React from 'react'
// import MapBox from '/Users/apple/Desktop/project/react/tiger_fish/src/components/MapBox/MapBox.jsx';
import MapSectionHome from './../components/MapSectionHome/MapSectionHome'
// import { Button } from './../components/Button/Button'
import FormValidation from './../components/FormValidation/FormValidation'

const Home = () => {
    return (
        <div>
            {/* <MapBox /> */}
            <MapSectionHome />
            <FormValidation />
            {/* <Button>Full Map View</Button> */}
        </div>
    )
}

export default Home
