/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect } from 'react';
import L from 'leaflet'
import '../../leaflet/leaflet.css';

let mapInstance = null

const initializeMap = location => {
  if (!location) return
  if (!location.lat || !location.lng) return

  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
  })

	mapInstance = L.map('mapid', {
    closePopupOnClick: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
    zoomControl: false
  }).setView([location.lat, location.lng], 13).addLayer(osm);

  const myIcon = L.icon({
    iconUrl: '/img/marker-icon-2x.png',
    iconSize: [38, 65],
    iconAnchor: [22, 64]
  })

  L.marker([location.lat, location.lng], {icon: myIcon}).addTo(mapInstance);

	// L.marker([location.lat, location.lng])
	// 	.addTo(mapInstance)
	// 	.bindPopup('Activity location')
	// 	.openPopup()
}

const ActivityLocation = ({ location }) => {

  useEffect(() => {
    initializeMap(location)

    return () => {
      if (!mapInstance) return

      mapInstance.off();
      mapInstance.remove();
    }
  }, [location])


  if (!location || !location.lat || !location.lng) {
    mapInstance = null
    return (
    <div></div>
    )
  }

  return (
    <div className="MapPicker" css={css`
      padding-top: 30px;
      padding-bottom: 30px;
    `}>
      <h2>Map</h2>
      <div id="mapid" css={css`
        margin: 0 auto;
        width: 400px;
        height: 200px;
        `}></div>
    </div>
  )
}

export default ActivityLocation