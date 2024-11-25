// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './StreetMap.css';
// import pin from './images/Location.png';
// import yell from './images/yell.png';
// import grin from './images/green.png'

// // Define custom marker icons
// const greenIcon = new L.Icon({
//     iconUrl: grin,
//     iconSize: [25, 25],
//     iconAnchor: [12, 25],
//     popupAnchor: [0, -25],
// });

// const yellowIcon = new L.Icon({
//     iconUrl: yell,
//     iconSize: [25, 25],
//     iconAnchor: [12, 25],
//     popupAnchor: [0, -25],
// });

// // Example additional icons (commented out in case not needed)
// // const redIcon = new L.Icon({
// //     iconUrl: red,
// //     iconSize: [25, 25],
// //     iconAnchor: [12, 25],
// //     popupAnchor: [0, -25],
// // });

// // const grayIcon = new L.Icon({
// //     iconUrl: gray,
// //     iconSize: [25, 25],
// //     iconAnchor: [12, 25],
// //     popupAnchor: [0, -25],
// // });

// // const grayRedDotIcon = new L.Icon({
// //     iconUrl: grayRedDot,
// //     iconSize: [25, 25],
// //     iconAnchor: [12, 25],
// //     popupAnchor: [0, -25],
// // });

// const StreetMap = () => {
//     const [markers, setMarkers] = useState([
//         {
//             position: [17.355055453050184, 72.98003648516446],
//             status: 'ok',
//             customerName: 'keerthi',
//             contactNumber: '123-456-7890',
//             alertCode: 'rdloo1',
//         },
//         // Add more markers here if needed
//     ]);

//     return (
//         <div className="map-container">
//             <MapContainer center={[20.5937, 78.9629]} zoom={4.5} scrollWheelZoom={false}>
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 {markers.map((location, index) => {
//                     let icon;
//                     let statusMessage;

//                     switch (location.status) {
//                         case 'filter_missing':
//                             icon = yellowIcon;
//                             statusMessage = 'Filter Missing';
//                             break;
//                         case 'no_source_water':
//                             // icon = redIcon;
//                             statusMessage = 'No Source Water';
//                             break;
//                         case 'communication_down':
//                             // icon = grayIcon;
//                             statusMessage = 'Communication Down';
//                             break;
//                         case 'unit_off':
//                             // icon = grayRedDotIcon;
//                             statusMessage = 'Unit is OFF';
//                             break;
//                         default:
//                             icon = greenIcon;
//                             statusMessage = 'All OK';
//                     }

//                     return (
//                         <Marker key={index} position={location.position} icon={icon}>
//                             <Popup>
//                                 <div>
//                                     <strong><a href="#">{location.customerName}</a></strong><br />
//                                     Contact Number: {location.contactNumber}<br />
//                                     Alert: {location.alertCode}<br />
//                                     Status: {statusMessage}
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     );
//                 })}
//                 {/* <AddMarker onAddMarker={handleAddMarker} /> */}
//             </MapContainer>
//         </div>
//     );
// };

// export default StreetMap;





// // import React, { useState } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import './StreetMap.css';
// // import pin from './images/Location.png';
// // import yell from './images/yell.png';


// // // Custom marker icon
// // // const num = 2
// // const customIcon = new L.Icon({
// //     iconUrl: pin, // Ensure this path is correct
// //     iconSize: [25, 25], // size of the icon
// //     iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
// //     popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
// // });

// // const AddMarker = ({ onAddMarker }) => {
// //     useMapEvents({
// //         click: (e) => {
// //             onAddMarker(e.latlng);
// //         },
// //     });
// //     return null;
// // };

// // const StreetMap = () => {
// //     const [markers, setMarkers] = useState([
// //         {
// //             position: [17.355055453050184, 72.98003648516446],
// //             popup: 'Customer Name: Prajwal<br>Contact Number: 9456474546<br>Alert: Pump'
// //         },
// //     ]);

// //     const handleAddMarker = (latlng) => {
// //         console.log('Latitude:', latlng.lat, 'Longitude:', latlng.lng); // Log coordinates to console
// //         const newMarker = { position: [latlng.lat, latlng.lng], popup: 'New Marker' };
// //         setMarkers([...markers, newMarker]);
// //     };

// //     return (
// //         <div className="map-container">
// //             <MapContainer center={[20.5937, 78.9629]} zoom={4.5} scrollWheelZoom={false} >
// //                 <TileLayer
// //                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                 />
// //                 {markers.map((location, index) => (
// //                     <Marker key={index} position={location.position} icon={customIcon}>
// //                         <Popup>
// //                             <div dangerouslySetInnerHTML={{ __html: location.popup }} />
// //                         </Popup>
// //                     </Marker>
// //                 ))}
// //                 {/* <AddMarker onAddMarker={handleAddMarker} /> */}
// //             </MapContainer>
// //         </div>
// //     );
// // };

// // export default StreetMap;

///////Another map///////code

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './StreetMap.css';
import red from './images/Location.png';
import gray from './images/Gray.png';
import grayRedDot from './images/GrayRdot.png';
import yellow from './images/yell.png';
import green from './images/green.png'
import { AlertMapPinData } from '../ApiService/LoginPageService';
import { useNavigate } from 'react-router-dom';

// Define custom marker icons
const greenIcon = new L.Icon({
    iconUrl: green,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const yellowIcon = new L.Icon({
    iconUrl: yellow,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const redIcon = new L.Icon({
    iconUrl: red,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const grayIcon = new L.Icon({
    iconUrl: gray,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const grayRedDotIcon = new L.Icon({
    iconUrl: grayRedDot,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const StreetMap = ({ filterId, setIsDashboard, setSelectedData }) => {
    console.log('1234567890////', filterId)
    const navigate = useNavigate();

    const [mapData, setmapData] = useState([]);

    // const mapData = [
    //     {
    //         "id": 1267,
    //         "deviceId": "RDL010",
    //         "deviceType": "AMBIATOR 5TR",
    //         "customer": "Keerthi",
    //         "phoneNo": "9535702264",
    //         "location": "\"\"",
    //         "status": "All Ok"
    //     },
    //     {
    //         "id": 1056,
    //         "deviceId": "RDL001",
    //         "deviceType": "AMBIATOR 5TR",
    //         "customer": "Keerthi",
    //         "phoneNo": "9535702264",
    //         "location": "\"\"",
    //         "status": "Filter Missing"
    //     },
    //     {
    //         "id": 902,
    //         "deviceId": "RDL002",
    //         "deviceType": "AMBIATOR 5TR",
    //         "customer": "Keerthi",
    //         "phoneNo": "9535702264",
    //         "location": "{\"latitude\": 17.385044, \"longitude\": 78.486671}",
    //         "status": "Unit is OFF"
    //     }
    // ];

    useEffect(() => {
        AlertMapPinData({
            type: filterId == 'All' ? "" : filterId

        }, handleMapSuccess, handleMapException);



    }, [filterId]);
    const handleMapSuccess = (dataObject) => {
        setmapData(dataObject.data)

    };
    const handleMapException = () => {

    };
    const handleCustomerClick = (location) => {
        console.log("event====>", location)
        setIsDashboard(1);
        setSelectedData(location);
        // alert("dfff")
        // navigate('DrillDownUnitLevel')
    };

    return (
        <div className="map-container">
            <MapContainer center={[20.5937, 78.9629]} zoom={4.5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapData && mapData.length > 0 && mapData.map((location, index) => {
                    let icon;
                    switch (location.status) {
                        case 'All Ok':
                            icon = greenIcon;
                            break;
                        case 'Filter Missing':
                            icon = yellowIcon;
                            break;
                        case 'No Source Water':
                            icon = redIcon;
                            break;
                        case 'Communication Down':
                            icon = grayIcon;
                            break;
                        case 'Unit is OFF':
                            icon = grayRedDotIcon;
                            break;
                        // default:
                        //     icon = greenIcon;
                        //     statusMessage = 'Unknown Status';
                    }
                    let coordinates = null;
                    console.log('mckkvv>>', coordinates)
                    // Check if location.location is valid and not an empty string
                    if (location.location && location.location !== "\"\"") {
                        try {
                            coordinates = JSON.parse(location.location);
                        } catch (error) {
                            console.error("Failed to parse location:", error);
                        }
                    }

                    if (coordinates && coordinates.latitude && coordinates.longitude) {
                        const position = [coordinates.latitude, coordinates.longitude];
                        console.log('mckkvv>>', coordinates)

                        return (
                            <Marker key={index} position={position} icon={icon}>
                                <Popup>
                                    <div>
                                        <strong><a style={{ cursor: 'pointer' }} onClick={(e) => handleCustomerClick(location)}>{location.customer}</a></strong><br />
                                        Contact Number: {location.phoneNo}<br />
                                        Unit serial No: {location.deviceId}<br />
                                        Status: {location.status}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    } else {
                        return null;
                    }
                })}
            </MapContainer>
        </div>
    );
};

export default StreetMap;
