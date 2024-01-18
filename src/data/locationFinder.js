export const handleLocationSearch = async (locationName) => {
    console.log(locationName);
    // Use forward geocoding to get latitude and longitude based on the location name
    const apiKey = '201d7af05ae94727a62060a47152a7cb' // Replace with your API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        locationName
    )}&key=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            // console.log(lat, lng);
            return { lat, lng }
        } else {
            return { error: `Invalid Location Name` }
        }
    } catch (error) {
        return { error: `Invalid Location Name` }
    }
}