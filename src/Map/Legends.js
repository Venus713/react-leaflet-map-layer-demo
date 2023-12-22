import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// third-party
import { useMap } from 'react-leaflet';

function getColor(d) {
  return d > 1000
    ? '#800026'
    : d > 500
    ? '#BD0026'
    : d > 200
    ? '#E31A1C'
    : d > 100
    ? '#FC4E2A'
    : d > 50
    ? '#FD8D3C'
    : d > 20
    ? '#FEB24C'
    : d > 10
    ? '#FED976'
    : '#FFEDA0';
}

function getSmallColor(d) {
  return d > 200
    ? '#800026'
    : d > 150
    ? '#ff0300'
    : d > 120
    ? '#fd8015'
    : d > 100
    ? '#e1e931'
    : d > 50
    ? '#3ef436'
    : d > 20
    ? '#48e9ed'
    : d > 10
    ? '#7289dc'
    : '#c3ccf1';
}

function getMediumColor(d) {
  return d > 2000
    ? '#800026'
    : d > 1500
    ? '#BD0026'
    : d > 1000
    ? '#E31A1C'
    : d > 500
    ? '#FC4E2A'
    : d > 200
    ? '#FD8D3C'
    : d > 100
    ? '#FEB24C'
    : d > 50
    ? '#FED976'
    : '#FFEDA0';
}

function getBigColor(d) {
  return d > 30000
    ? '#800026'
    : d > 20000
    ? '#BD0026'
    : d > 10000
    ? '#E31A1C'
    : d > 5000
    ? '#FC4E2A'
    : d > 3000
    ? '#FD8D3C'
    : d > 1000
    ? '#FEB24C'
    : d > 500
    ? '#FED976'
    : '#FFEDA0';
}

function getWorldPopulationColor(d) {
  return d > 100000000
    ? '#800026'
    : d > 50000000
    ? '#BD0026'
    : d > 20000000
    ? '#E31A1C'
    : d > 10000000
    ? '#FC4E2A'
    : d > 5000000
    ? '#FD8D3C'
    : d > 2000000
    ? '#FEB24C'
    : d > 1000000
    ? '#FED976'
    : '#FFEDA0';
}

function PopulationInfoBox({ data, add }) {
  const map = useMap();

  const [infoboxControl, setInfoboxControl] = useState();

  const createInfoBox = () => {
    var infobox = L.control();

    infobox.onAdd = () => {
      const div = L.DomUtil.create('div', 'info');
      const contents = data ? `<b>${data.name}</b><br />${data.density} people / mi<sup>2</sup>` : 'Hover over a state';
      div.innerHTML = `<h4>Population Density</h4>${contents}`;
      return div;
    };

    if (infoboxControl) {
      removeInfobox();
    }
    infobox.addTo(map);
    setInfoboxControl(infobox);
  };

  const removeInfobox = () => {
    if (infoboxControl) {
      map.removeControl(infoboxControl);
    }
  };

  useEffect(() => {
    if (add) {
      createInfoBox();
    } else {
      removeInfobox();
    }
  }, [add, data]);

  return null;
}

PopulationInfoBox.propTypes = {
  data: PropTypes.object,
  add: PropTypes.bool
};

const LayerLegend = ({ add, title, color }) => {
  const map = useMap();

  const [legendControl, setLegendControl] = useState();

  const createLegend = () => {
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      var grades = [0, 10, 20, 50, 100, 200, 500, 1000];
      if (color === 'small') {
        grades = [0, 10, 20, 50, 100, 120, 150, 200];
      } else if (color === 'medium') {
        grades = [0, 50, 100, 200, 500, 1000, 1500, 2000];
      } else if (color === 'big') {
        grades = [0, 500, 1000, 3000, 5000, 10000, 20000, 30000];
      } else if (color === 'world') {
        grades = [0, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000];
      }
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        if (color === 'small') {
          labels.push('<i style="background:' + getSmallColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        } else if (color === 'medium') {
          labels.push('<i style="background:' + getMediumColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        } else if (color === 'big') {
          labels.push('<i style="background:' + getBigColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        } else if (color === 'world') {
          labels.push('<i style="background:' + getWorldPopulationColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        } else {
          labels.push('<i style="background:' + getColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        }
      }

      div.innerHTML = `<b style="color:red">${title}:</b><br><br>` + labels.join('<br>');
      return div;
    };

    if (legendControl) {
      removeLegend();
    }
    legend.addTo(map);
    setLegendControl(legend);
  };

  const removeLegend = () => {
    if (legendControl) {
      map.removeControl(legendControl);
    }
  };

  useEffect(() => {
    if (add) {
      createLegend();
    } else {
      removeLegend();
    }
  }, [add]);

  return null;
};

LayerLegend.propTypes = {
  add: PropTypes.bool,
  title: PropTypes.string,
  color: PropTypes.string
};

function InfoBox({ data, add, title }) {
  const map = useMap();

  const [infoboxControl, setInfoboxControl] = useState();

  const createInfoBox = () => {
    var infobox = L.control({ position: 'bottomleft' });

    infobox.onAdd = () => {
      const div = L.DomUtil.create('div', 'info');
      const contents = data
        ? Object.entries(data)
            .slice(0, 8)
            .map(([key, value]) => `${key}: <b>${value}</b>`)
            .join('<br />')
        : 'Hover over a state';
      div.innerHTML = `<h4>${title}</h4><div class="scrollable">${contents}</div>`;
      return div;
    };

    if (infoboxControl) {
      removeInfobox();
    }
    infobox.addTo(map);
    setInfoboxControl(infobox);
  };

  const removeInfobox = () => {
    if (infoboxControl) {
      map.removeControl(infoboxControl);
    }
  };

  useEffect(() => {
    if (add) {
      createInfoBox();
    } else {
      removeInfobox();
    }
  }, [add, data]);

  return null;
}

InfoBox.propTypes = {
  data: PropTypes.object,
  add: PropTypes.bool,
  title: PropTypes.string
};

export { PopulationInfoBox, getColor, getSmallColor, getMediumColor, getBigColor, getWorldPopulationColor, LayerLegend, InfoBox };
