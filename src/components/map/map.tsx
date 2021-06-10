import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationMarker } from "./locationMarker";
import styled from "styled-components";
import { Text } from "../typography";
import axios from "axios";
import { SwitchIcon } from "./switchIcon";
import {
  ImageWrapper,
  ImagesScroller,
  LitterImage,
} from "../Carousel/carousel";

const MapWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 800px;
  margin: 30px 0;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 0;
    height: 80vh;
  }
`;

interface IMapProps {
  showNotification: (message: string, errorType: string) => void;
}

export const Map: React.FC<IMapProps> = (props) => {
  const [markers, setMarkers] = useState([]);
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
  const position: [number,number] = [62.027115, 129.732188]; //Yakutsk

  return (
    <MapWrapper id="mapTarget">
      <MapContainer
        style={{ height: "100%" }}
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        
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
                <Popup minWidth={350}>
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
