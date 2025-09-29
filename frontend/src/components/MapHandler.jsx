import { useMapEvents } from 'react-leaflet';

export const MapEventHandler = ({ onMapClick }) => {
  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      
      const newLocationData = {
        id: '',
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lat, lng],
        },
        properties: {
          name: `Nome da nova localização`,
          description: "Descrição da nova localização",
        },
      };

      onMapClick(newLocationData);
    },
  });

  return null;
};