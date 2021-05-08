import React, { useState, useEffect } from 'react'
import { Popup, useMapEvents } from 'react-leaflet'
import Modal from '../modal/modal'

export const LocationMarker = (props) => {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
    
    const map = useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            });
        },
    })
    const getPosition = (trashType) =>{
        props.passPosition(position.latitude, position.longitude, trashType)
        position.latitude = 0
    }
    const refreshTheMap = (t) =>{
        props.updateDupms()
        console.log(t)
    }
    return (
        position.latitude !== 0 ?
            <Popup
                position={[position.latitude, position.longitude]}
            >
                <Modal
                getPosition={getPosition}
                refreshTheMap={()=>refreshTheMap}
                />
            </Popup>

            : null
    )

}