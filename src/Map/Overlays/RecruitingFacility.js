import PropTypes from 'prop-types';

// material-ui
import { Typography, Divider } from '@mui/material';
import { Tooltip, Marker, LayersControl } from 'react-leaflet';

// Third party
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// assets
import MarkerIcon from '../../assets/Images/marker.png';
import { EnvironmentTwoTone, InfoCircleFilled } from '@ant-design/icons';

const RecruitingFacilityOverlay = ({ data, selected, setDetailData, setIsClickMarker }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [25, 35]
  });

  const handleMarkerClick = (data) => {
    setIsClickMarker(true);
    setDetailData(data);
  };
  return (
    <LayersControl.Overlay name="Recruiting Facilities" checked={selected}>
      <MarkerClusterGroup chunkedLoading>
        {data &&
          data.map((facility, index) => (
            <Marker
              key={index}
              title={facility.properties.facility_info.name}
              icon={customMarkerIcon}
              position={[facility.geometry.coordinates[1], facility.geometry.coordinates[0]]}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(facility);
                }
              }}
            >
              <Tooltip offset={[0, -10]} opacity={1}>
                <>
                  <Typography variant="subtitle1" component="span">
                    {facility.properties.facility_info.name}
                  </Typography>
                  <Divider />
                  <em>
                    <EnvironmentTwoTone /> {facility.properties.facility_info && facility.properties.facility_info.city + ', '}
                    {facility.properties.facility_info && facility.properties.facility_info.state + ', '}
                    {facility.properties.facility_info && facility.properties.facility_info.country + ', '}
                    {facility.properties.facility_info && facility.properties.facility_info.zip}
                  </em>
                  <br />
                  <InfoCircleFilled style={{ color: '#52c41a' }} />{' '}
                  {facility.properties.facility_info.status && facility.properties.facility_info.status}
                </>
              </Tooltip>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};

RecruitingFacilityOverlay.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.bool,
  setDetailData: PropTypes.func,
  setIsClickMarker: PropTypes.func
};

export default RecruitingFacilityOverlay;
