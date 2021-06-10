import React, { useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";
import { Modal } from "../modal/modal";

interface ILocationMarkerProps {
  passPosition: (a: number, b: number, c: string) => {};
  refreshTheMap: () => {};
  showNotification: () => {};
}
interface RefObject<T> {
  readonly current: T | null | undefined;
}

export const LocationMarker: React.FC<ILocationMarkerProps> = ({
  passPosition,
  refreshTheMap,
  showNotification,
}) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const map = useMapEvents({
    click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
            latitude: lat,
            longitude: lng,
        });
    },
})
  // const popupRef = React.useRef()
  const closePopup = () => {
    // Popup.closePopup()
    // console.log(Popup)
    // console.log(popupRef.current)
    // popupRef.current._closeButton.onclick()
  };
  const getPosition = (trashType: string) => {
    console.log("click");
    passPosition(position.latitude, position.longitude, trashType);
    position.latitude = 0;
  };
  return position.latitude !== 0 ? (
    <Popup
      position={[position.latitude, position.longitude]}
      
      // ref={popupRef}
      // closePopup={(e:any) => console.log(e)}
    >
      <Modal
        // getPosition={()=>getPosition}
        positionLat={position.latitude}
        positionLon={position.longitude}
        // refreshTheMap={refreshTheMap}
        showNotification={showNotification}
        // closePopup={closePopup}
      />
    </Popup>
  ) : null;
};
