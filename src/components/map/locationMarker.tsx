import React, { useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";
import { Modal } from "../modal/modal";

interface ILocationMarkerProps {
  passPosition: (a: number, b: number, c: string) => void;
  refreshTheMap?: () => void;
  showNotification?: (a:string,b:string) => void;
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
        if(lat>61.915685113816075 && lat <62.34960927573042 && lng > 129.22345923492685 && lng < 130.0680541957263){
          setPosition({
            latitude: lat,
            longitude: lng,
        });
        }else{
          setPosition({
            latitude: 0,
            longitude: 0
          })
        }
        
    },
})
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
        showNotification={(a,b)=>showNotification(a,b)}
        // closePopup={closePopup}
      />
    </Popup>
  ) : null;
};
