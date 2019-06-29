/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect } from 'react';
import L from 'leaflet'
import '../../leaflet/leaflet.css';

let mapInstance = null

const initializeMap = (location, setLocation) => {
  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

	mapInstance = L.map('mapid').setView([location.lat || 51.505, location.lng || -0.09], 13).addLayer(osm);

	L.marker([location.lat || 51.505, location.lng || -0.09])
		.addTo(mapInstance)
		.bindPopup('Activity location')
		.openPopup()

	mapInstance.on('click', event => {
    setLocation({
      lat: event.latlng.lat,
      lng: event.latlng.lng
    })

    const popup = L.popup()
		popup.setLatLng(event.latlng)
			   .setContent("Activity location: " + event.latlng.toString())
			   .openOn(mapInstance)
	})
}

const MapPicker = ({ location, setLocation }) => {

  useEffect(() => {
    initializeMap(location, setLocation)

    return () => {
      mapInstance.off();
      mapInstance.remove();
    }
  }, [location, setLocation])


  return (
    <div className="MapPicker">
      <h2>Map</h2>
      <div id="mapid" css={css`
        width: 300px;
        height: 400px;
        `}></div>
    </div>

  )
}

export default MapPicker