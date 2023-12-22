import PropTypes from 'prop-types';
import { useState } from 'react';

import { LayersControl, GeoJSON } from 'react-leaflet';
import { PopulationInfoBox, LayerLegend, getColor } from '../Legends';

const USPopulationOverlay = ({ data, selected, setDetailData, setIsClickMarker }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function highlightFeature(e) {
    const layer = e.target;
    layer.bringToFront();
    layer.setStyle({
      weight: 3,
      color: 'blue',
      dashArray: 1,
      fillOpacity: 0.3
    });
    setSelectedCountry(layer.feature.properties);
  }

  function resetHighlight(e) {
    e.target.bringToBack();
    setSelectedCountry();
  }

  function zoomToFeature(e) {
    setIsClickMarker(false);
    e.target._map.fitBounds(e.target.getBounds());
    e.target.setStyle({
      weight: 3,
      color: 'blue',
      dashArray: 1,
      fillOpacity: 0.3
    });
    setDetailData(e.target.feature.properties);
  }

  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.name);
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  return (
    <>
      <LayersControl.Overlay checked={selected} name="US State Population Dinsity">
        <GeoJSON
          data={data}
          style={(feature) => ({
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.density)
          })}
          onEachFeature={onEachFeature}
        />
      </LayersControl.Overlay>
      <PopulationInfoBox data={selectedCountry} add={selected} />
      <LayerLegend add={selected} title="Population per mi<sup>2</sup>" />
    </>
  );
};

USPopulationOverlay.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  setDetailData: PropTypes.func,
  setIsClickMarker: PropTypes.func
};

export default USPopulationOverlay;
