import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationMarker } from "./locationMarker";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Text } from "../typography";
import axios from "axios";
import { SwitchIcon } from "./switchIcon";
import {
  ImageWrapper,
  ImagesScroller,
  LitterImage,
} from "../Carousel/carousel";
interface MapWrapperProps {
  maxWidth?: string,
  height?: string,
  margin?: string,
  padding?: string,
}
const MapWrapper = styled.div<MapWrapperProps>`
  width: 100%;
  max-width: ${({maxWidth})=>maxWidth?maxWidth:'1200px'};
  height: ${({height})=>height?height:'800px'};
  margin: ${({margin})=>margin?margin:'30px 0'};
  padding: ${({padding})=>padding?padding:'0 20px'};
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: ${({padding})=>padding?padding:'0'};
    height: ${({height})=>height?height:'80vh'};
  }
`;

interface IMapProps {
  showNotification: (message: string, errorType: string) => void;
  mapWrapperWidth?: string,
  mapWrapperHeight?: string,
  mapWrapperMargin?: string,
  mapWrapperPadding?: string,
}

export const Map: React.FC<IMapProps> = (props) => {
  const [markers, setMarkers] = useState([]);
  const [cookies,setCookie] = useCookies(['position'])
  useEffect(() => {
    axios
      .get("/api/dumps.php")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log(err);
        props.showNotification("Проблема при загрузке карты", "error");
      });
  }, []);
  const refreshTheMap = () => {
    axios
      .get("/api/dumps.php")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log(err);
        props.showNotification("Проблема при загрузке карты", "error");
      });
  };
  // const closePopup = () => {
  //     popupRef.current._source._map._popup._closeButton.onclick()
  // }
  const getPosition = (lat: string, lon: string, trashType: string) => {
    let state = [...markers];
    let newPoint = {
      position: [lat,lon] as string[],
      status: trashType,
    };
    state.push(newPoint);
    setMarkers(state);
  };
  const position: [number,number] = cookies.position?[+cookies.position.split(';')[0],+cookies.position.split(';')[1]] : [62.027115, 129.732188] || cookies.position; //Yakutsk
  return (
    <MapWrapper id="mapTarget" maxWidth={props.mapWrapperWidth} height={props.mapWrapperHeight} padding={props.mapWrapperPadding} margin={props.mapWrapperMargin}>
      <MapContainer
        style={{ height: "100%" }}
        center={position}
        zoom={cookies.position?15:12}
        scrollWheelZoom={true}
        tap={false}
        
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          passPosition={()=>getPosition}
          refreshTheMap={()=>refreshTheMap}
          showNotification={(a,b)=>props.showNotification(a,b)}
          // closePopup={closePopup}
        />
        {markers.map(
          (
            {
              positionLat,
              positionLon,
              status,
              images,
              checkStatus,
              level,
              additional,
              id,
            },
            index
          ) => {
            let position: [number,number] = [positionLat,positionLon];
            return (
              <Marker key={index} position={position} icon={SwitchIcon(status)}>
                <Popup minWidth={300} maxWidth={300}>
                  <ImageWrapper>
                    <ImagesScroller>
                      {images
                        .split(";")
                        .filter((x: string) => x.length > 2)
                        .map((image: string, i: number) => {
                          return (
                            <a href={image} key={i} target="_blank">
                              <LitterImage src={image} />
                            </a>
                          );
                        })}
                    </ImagesScroller>
                  </ImageWrapper>
                  <Text>Название: Свалка №{id}</Text>
                  <Text>Категория мусора: {status}</Text>
                  <Text>Статус точки: {checkStatus}</Text>
                  <Text>Степень замусоренности: {level}</Text>
                  {additional ? (
                    <Text>Доп. информация: {additional}</Text>
                  ) : null}
                </Popup>
              </Marker>
            );
          }
        )}
      </MapContainer>
    </MapWrapper>
  );
};
