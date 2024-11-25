import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { LocationOn } from '@mui/icons-material';
// import { LocationOn } from '@material-ui/icons';

const containerStyle = {
    width: '100%',
    height: '58vh'
};

const center = {
    lat: 17.493695385822452,
    lng: 76.45703124999999
};

const GoogleMapAPIModule = ({ locations }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBBv6shA-pBM0e9KydvwubSY55chq0gqS8"
    });

    const iconUrl = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C7.03 2 3 6.03 3 11c0 4.95 8.55 11.39 8.55 11.39l.45.42.45-.42S21 15.95 21 11C21 6.03 16.97 2 12 2zm0 15.5c-2.05 0-3.72-1.67-3.72-3.72S9.95 10.06 12 10.06 15.72 11.73 15.72 13.78 14.05 17.5 12 17.5zm0-9.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`
    )));

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={{ lat: location.latitude, lng: location.longitude }}
                    icon={{
                        url: iconUrl,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                >
                    <LocationOn style={{ color: 'blue' }} />
                </Marker>
            ))}
        </GoogleMap>
    ) : <div>Loading Google Maps...</div>;
};

export default GoogleMapAPIModule;
