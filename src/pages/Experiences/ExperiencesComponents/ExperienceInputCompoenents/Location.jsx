import { Button, FormControl, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ButtonLoader from '../../../../components/Loader';
import { apiKeyForGoogleLocation } from '../../../../data/apis';
const LocationComponent = ({formData, setFormData, toast}) => {
	const [locationName, setLocationName] = useState('')
	const [loader, setLoader] = useState(false);
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");

	const handleSearch = async () => {
		// console.log(locationName);
		setLoader(true);
        // Use forward geocoding to get latitude and longitude based on the location name

        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            locationName
        )}&key=${apiKeyForGoogleLocation}`

        try {
            const response = await fetch(apiUrl)
            const data = await response.json()
            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;
				setLatitude(lat);
				setLongitude(lng);
				// console.log(lat,lng);
				const  newFromData = {...formData,location_name : locationName,location: {
					latitude: lat, longitude: lng, name : locationName
				}}
				setFormData(()=> newFromData);
                //  console.log(newFromData);
                //  console.log(formData);
				 setLoader(false);
            } else {
                // return { error: `Invalid Location Name` }
                toast({
                    title: 'Location is not Valid',
                    description: "Please Enter A Valid Location",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                })
				setLoader(false);
            }
        } catch (error) {
			setLoader(false);
            return { error: `Invalid Location Name` }
			
        }
	}

	return (
		<div>
			<div>
				<FormControl>
				<Input
					type="text"
					value={locationName}
					onChange={(e) => setLocationName(e.target.value)}
					placeholder='Enter location name'
				/>
				</FormControl>
				<Text>{latitude ? `Latitude : : ${latitude}` : null}</Text>
				<Text>{longitude ? `Longitude : : ${longitude}` : null}</Text>
				
				<br />
				<Button colorScheme='teal' onClick={handleSearch}>{loader ? <ButtonLoader w={40} h={40}/> : "Check Location"}</Button>
			</div>
		</div>
	)
}

export default LocationComponent
