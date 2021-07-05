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
  // нижний левый угол{latitude: 61.97252461843735, longitude: 129.4317626883276}
  // верхний левый угол {latitude: 62.32538171004499, longitude: 129.36218261369507}
  // верхний правый угол{latitude: 62.30368784333984, longitude: 130.4479980398901}
  // нижний правый{latitude: 61.89887136945339, longitude: 130.17594303586523}
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
