import { useLocation } from '../hooks/use-location';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import PinIcon from '../../public/pin-icon.png'
import { Icon } from 'leaflet';

export const InteractiveMap = () => {
    const { locations } = useLocation();

    const customIcon = new Icon({
      iconUrl: PinIcon,
      iconSize: [45, 45]
    })

  return (
    <div className='max-w-4/5 mx-auto'>
      <MapContainer center={[-15.78113, -47.98534]} zoom={17}>
        <TileLayer
          attribution="Open Street Map"
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
          
          {locations.map(location => (
            <Marker key={location.id} position={location.geometry.coordinates} icon={customIcon}>
              <Popup>
                <div className='flex flex-col gap-2'>
                  <h2 className='font-bold uppercase text-lg border-b border-zinc-400'>{location.properties.name}</h2>
                  <p className='!m-0 text-base text-muted'>{location.properties.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}
