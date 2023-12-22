// material-ui
import { TileLayer, LayersControl, LayerGroup } from 'react-leaflet';

const Layers = () => {
  return (
    <>
      <LayersControl.BaseLayer checked name="GoogleMap">
        <TileLayer attribution="Google Maps" url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Google Map Satellite">
        <LayerGroup>
          <TileLayer attribution="Google Maps Satellite" url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
        </LayerGroup>
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
    </>
  );
};

export default Layers;
