import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 

export default function GoogleMap({lat= 39.8283, lng= -98.5795, text=""}) {

  return (
    <div>
        <MapContainer
          center={[lat, lng]} 
          zoom={5}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={[lat, lng]}> 
            <Popup>
                <h2 className="text-red-700 font-medium">{text}</h2>
            </Popup>
          </Marker>
        </MapContainer>
    </div>
  )
}
