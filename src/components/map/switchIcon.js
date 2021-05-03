import L from 'leaflet'
import { Statuses } from '../statuses/statuses'
import redBin from '../../images/red_bin.png'
import greenBin from '../../images/green_bin.png'
import newBin from '../../images/loading.png'
import question from '../../images/question.png'
import picnic from '../../images/picnic.png'

const iconSize = [25, 25];
const iconAnchor = [12.5, 41];
const popupAnchor = [0, -45];

let redBinIcon = L.icon({
    iconUrl: redBin,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})
let greenBinIcon = L.icon({
    iconUrl: greenBin,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})
let questionIcon = L.icon({
    iconUrl: question,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})
let picnicIcon = L.icon({
    iconUrl: picnic,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})
let newIcon = L.icon({
    iconUrl: newBin,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
})

export const SwitchIcon = (typeOfIcon) => {
    switch (typeOfIcon) {
        case Statuses[0]:
            return redBinIcon;
        case Statuses[1]:
            return picnicIcon
        case Statuses[2]:
            return questionIcon;
        case Statuses[3]:
            return greenBinIcon;
        case Statuses[4]:
            return newIcon
    }
}