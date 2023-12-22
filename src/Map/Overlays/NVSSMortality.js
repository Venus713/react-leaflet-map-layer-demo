import PropTypes from 'prop-types';
import { useState } from 'react';

import { LayersControl, GeoJSON } from 'react-leaflet';

import { LayerLegend, getMediumColor, InfoBox } from '../Legends';

const NVSSMortalityOverlay = ({ data, selected, setDetailData, setIsClickMarker }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: 'blue',
      dashArray: '',
      fillOpacity: 0.3
    });
    layer.bringToFront();
    setSelectedCountry(layer.feature.properties);
  }

  function resetHighlight(e) {
    e.target.bringToBack();
    setSelectedCountry();
  }

  function zoomToFeature(e) {
    setIsClickMarker(false);
    setDetailData(e.target.feature.properties);
    e.target._map.fitBounds(e.target.getBounds());
    e.target.setStyle({
      weight: 3,
      color: 'blue',
      dashArray: '',
      fillOpacity: 0.3
    });
  }

  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties['County']);
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  return (
    <>
      <LayersControl.Overlay checked={selected} name="2021 National Vital Statistics System Mortality">
        {data && (
          <GeoJSON
            data={data}
            style={(feature) => ({
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7,
              fillColor: getMediumColor(feature.properties.Deaths)
            })}
            onEachFeature={onEachFeature}
          />
        )}
      </LayersControl.Overlay>
      <InfoBox data={selectedCountry} add={selected} title={'2021 National Vital Statistics System Mortality'} />
      <LayerLegend add={selected} title={'Deaths'} color={'medium'} />
    </>
  );
};

NVSSMortalityOverlay.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  setDetailData: PropTypes.func,
  setIsClickMarker: PropTypes.func
};

export default NVSSMortalityOverlay;
