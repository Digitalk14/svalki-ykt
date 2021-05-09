import React, { useState, useEffect } from 'react'
import { Popup, useMapEvents } from 'react-leaflet'
import Modal from '../modal/modal'

export const LocationMarker = (props) => {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
    const popupRef = React.createRef()
    const map = useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            });
        },
    })
    const closePopup = () =>{
        popupRef.current._closeButton.click()
    }
    const getPosition = (trashType) =>{
        props.passPosition(position.latitude, position.longitude, trashType)
        position.latitude = 0
    }
    return (
        position.latitude !== 0 ?
            <Popup
                position={[position.latitude, position.longitude]}
                ref={popupRef}

            >
                <Modal
                getPosition={getPosition}
                positionLat={position.latitude}
                positionLon={position.longitude}
                refreshTheMap={props.refreshTheMap}
                showNotification={props.showNotification}
                closePopup={closePopup}
                />
            </Popup>

            : null
    )

}