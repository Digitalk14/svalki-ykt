import React , { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { svalkiExamples } from "../svalki/svalkiExamples";
import { LocationMarker } from "../map/locationMarker";
import styled from "styled-components";
import axios from "axios";
import { Header } from "./header";
import { SwitchIcon } from "../map/switchIcon";
import { AdminMarker } from "./adminMarker";

interface IAdminMapProps {
  isLoggedOut: (e: boolean) => void;
  showNotification: (a: string, b: string) => void;
}

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 800px;
  box-sizing: border-box;
`;

export const AdminMap: React.FC<IAdminMapProps> = (props) => {
  const [markers, setMarkers] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredCheckStatus, setFilteredCheckStatus] = useState("all");
  const [filteredDumpNumber,setFilteredDumpNumber] = useState("all")
  const [changedStates, setChangedStates] = useState({});
  const [changedDumpId, setChangedDumpId] = useState("");
  const [dumps, setDumps] = useState([

  ]);
  const myRef = React.useRef()
  useEffect(() => {
    axios
      .get("/api/dumpsAdmin.php")
      .then((res) => {
        setDumps(res.data);
      })
      .catch((err) => {
        console.log(err);
        props.showNotification("Проблема при загрузке карты", "error");
      });
  },[]);
  const refreshTheMap = () => {
    axios.get("/api/dumpsAdmin.php").then((res) => {
      setDumps(res.data);
    });
  };
  const getPosition = (lat: number, lon: number, trashType: string) => {
    let state = [...markers];
    let newPoint: any = {
      position: [],
    };
    newPoint.position.push(lat);
    newPoint.position.push(lon);
    newPoint.status = trashType;
    state.push(newPoint);
    setMarkers(state);
  };
  const filterStatus = (status: string) => {
    setFilteredStatus(status);
    console.log(myRef)
  };
  const filterCheckStatus = (status: string) => {
    setFilteredCheckStatus(status);
  };
  const filterByDumpNumber = (dumpNumber: string) => {
    setFilteredDumpNumber(dumpNumber)
  }
  const position: [number,number] = [62.027115, 129.732188]; //Yakutsk
  return (
    <MapWrapper>
      <Header
        pushStatus={(e) => filterStatus(e)}
        pushCheckStatus={(e) => filterCheckStatus(e)}
        pushFilteredNumber={(e)=> filterByDumpNumber(e)}
        isLoggedOut={(e) => props.isLoggedOut(e)}
        statuses={dumps}
      />
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          passPosition={() => getPosition}
          refreshTheMap={() => refreshTheMap}
          showNotification={(a, b) => props.showNotification(a, b)}
          // closePopup={closePopup}
        />
        {dumps
          .filter((stat) => {
            if(filteredDumpNumber!=='all'){
              return stat.id === filteredDumpNumber
            }else{
              if (
                stat.status === filteredStatus &&
                stat.checkStatus === filteredCheckStatus
              ) {
                return true;
              } else if (
                (filteredCheckStatus === "all" &&
                  stat.status === filteredStatus) ||
                (filteredStatus === "all" &&
                  stat.checkStatus === filteredCheckStatus)
              ) {
                return true;
              } else if (
                filteredStatus === "all" &&
                filteredCheckStatus === "all"
              ) {
                return true;
              }
            }
          })
          .map(
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
                email,
                phone,
              },
              index
            ) => {
              return (
                <AdminMarker
                ref={myRef}
                  key={index}
                  position={[positionLat,positionLon]}
                  icon={SwitchIcon(status)}
                  imagesProps={images}
                  idProps={id}
                  statusProps={status}
                  checkStatusProps={checkStatus}
                  levelProps={level}
                  emailProps={email}
                  phoneProps={phone}
                  additionalProps={additional}
                  // refreshTheMap={refreshTheMap()}
                />
              );
            }
          )}
      </MapContainer>
    </MapWrapper>
  );
};
