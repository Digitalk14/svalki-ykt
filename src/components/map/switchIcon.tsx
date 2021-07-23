import L from "leaflet";
import { Statuses } from "../statuses/statuses";
import redBin from "../../images/red_bin.png";
import greenBin from "../../images/green_bin.png";
import newBin from "../../images/loading.png";
import question from "../../images/question.png";
import picnic from "../../images/picnic.png";

let redBinIcon = L.icon({
  iconUrl: redBin,
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -45],
});
let greenBinIcon = L.icon({
  iconUrl: greenBin,
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -45],
});
let questionIcon = L.icon({
  iconUrl: question,
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -45],
});
let picnicIcon = L.icon({
  iconUrl: picnic,
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -45],
});
let newIcon = L.icon({
  iconUrl: newBin,
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -45],
});

export const SwitchIcon = (typeOfIcon:string) => {
  switch (typeOfIcon) {
    case Statuses[0]:
      return redBinIcon;
    case Statuses[1]:
      return picnicIcon;
    case Statuses[2]:
      return questionIcon;
    case Statuses[3]:
      return greenBinIcon;
    case Statuses[4]:
      return newIcon;
    default:
      return redBinIcon;
  }
};
