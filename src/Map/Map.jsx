import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo, useRef } from 'react';

// material-ui
import { Typography, Stack } from '@mui/material';
import { MapContainer, LayersControl, useMapEvents } from 'react-leaflet';

// Third party
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// project imports
import Layers from './Layers';
import RecruitingFacilityOverlay from './Overlays/RecruitingFacility';
import USPopulationOverlay from './Overlays/USPopulation';
import WorldBankHealthOverlay from './Overlays/WorldBankHealth';
import USCountryLevelDemographicOverlay from './Overlays/USCountryLevelDemographic';
import USCBSALevelDemographicOverlay from './Overlays/USCBSALevelDemographic';
import USCountryCancerProfileOverlay from './Overlays/USCountryCancerProfile';
import NVSSMortalityOverlay from './Overlays/NVSSMortality';
import NVSSNatalityOverlay from './Overlays/NVSSNatality';

// ======================== INSITES - MAP ============================= //

const Map = ({ mapRef, setOverlayTitle, setOverlayData, setIsClickMarker }) => {
  const isMountedRef = useRef(true);

  const [USStatePopData, setUSStatePopData] = useState(null);
  const [facilityData, setFacilityData] = useState([]);
  const [WorldBankHealthData, setWorldBankHealthData] = useState();
  const [USCountryLevelDemographicData, setUSCountryLevelDemographicData] = useState();
  const [USCBSALevelDemographicData, setUSCBSALevelDemographicData] = useState();
  const [USCountryCancerProfileData, setUSCountryCancerProfileData] = useState();
  const [NVSSMortalityData, setNVSSMortalityData] = useState();
  const [NVSSNatalityData, setNVSSNatalityData] = useState();

  const fetchData = async () => {
    if (isMountedRef.current) {
      try {
        const resp1 = await fetch('data/USStatePopData.json');
        const data1 = await resp1.json();
        setUSStatePopData(data1);

        const response2 = await fetch('data/recruiting_facilities.geojson');
        const data2 = await response2.json();
        setFacilityData(data2.features);

        const response3 = await fetch('data/2019-world-bank-health-indicators.geojson');
        const data3 = await response3.json();
        setWorldBankHealthData(data3);

        const response4 = await fetch('data/2015-2019-acs-counties.geojson');
        const data4 = await response4.json();
        setUSCountryLevelDemographicData(data4);

        const response5 = await fetch('data/2015-2019-acs-cbsa.geojson');
        const data5 = await response5.json();
        setUSCBSALevelDemographicData(data5);

        const response6 = await fetch('data/2016-2020-county-cancer-profiles.geojson');
        const data6 = await response6.json();
        setUSCountryCancerProfileData(data6);

        const response7 = await fetch('data/2021-nvss-mortality.geojson');
        const data7 = await response7.json();
        setNVSSMortalityData(data7);

        const response8 = await fetch('data/2022-nvss-natality.geojson');
        const data8 = await response8.json();
        setNVSSNatalityData(data8);
      } catch (err) {
        console.log('ERROR: ', err);
      }
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Overlays
  const [facilityOverlaySelected, setFacilityOverlaySelected] = useState(true);
  const [popOverlaySelected, setPopOverlaySelected] = useState(false);
  const [worldBankHealthOverlaySelected, setWorldBankHealthOverlaySelected] = useState(false);
  const [USCountryLevelDemographicSelected, setUSCountryLevelDemographicSelected] = useState(false);
  const [USCBSALevelDemographicSelected, setUSCBSALevelDemographicSelected] = useState(false);
  const [USCountryCancerProfileSelected, setUSCountryCancerProfileSelected] = useState(false);
  const [NVSSMortalitySelected, setNVSSMortalitySelected] = useState(false);
  const [NVSSNatalitySelected, setNVSSNatalitySelected] = useState(false);

  const overlay1 = useMemo(
    () => [
      <RecruitingFacilityOverlay
        key="RecruitingFacility"
        data={facilityData}
        selected={facilityOverlaySelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [facilityData, facilityOverlaySelected]
  );

  const overlay2 = useMemo(
    () => [
      <USPopulationOverlay
        key="USPopulation"
        data={USStatePopData}
        selected={popOverlaySelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [USStatePopData, popOverlaySelected]
  );

  const overlay3 = useMemo(
    () => [
      <WorldBankHealthOverlay
        key="WorldBankHealth"
        data={WorldBankHealthData}
        selected={worldBankHealthOverlaySelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [WorldBankHealthData, worldBankHealthOverlaySelected]
  );

  const overlay4 = useMemo(
    () => [
      <USCountryLevelDemographicOverlay
        key="USCountryLevelDemographic"
        data={USCountryLevelDemographicData}
        selected={USCountryLevelDemographicSelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [USCountryLevelDemographicData, USCountryLevelDemographicSelected]
  );

  const overlay5 = useMemo(
    () => [
      <USCBSALevelDemographicOverlay
        key="USCBSALevelDemographic"
        data={USCBSALevelDemographicData}
        selected={USCBSALevelDemographicSelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [USCBSALevelDemographicData, USCBSALevelDemographicSelected]
  );

  const overlay6 = useMemo(
    () => [
      <USCountryCancerProfileOverlay
        key={'USCountryCancerProfile'}
        data={USCountryCancerProfileData}
        selected={USCountryCancerProfileSelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [USCountryCancerProfileData, USCountryCancerProfileSelected]
  );

  const overlay7 = useMemo(
    () => [
      <NVSSMortalityOverlay
        key={'NVSSMortality'}
        data={NVSSMortalityData}
        selected={NVSSMortalitySelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [NVSSMortalityData, NVSSMortalitySelected]
  );

  const overlay8 = useMemo(
    () => [
      <NVSSNatalityOverlay
        key={'NVSSNatality'}
        data={NVSSNatalityData}
        selected={NVSSNatalitySelected}
        setDetailData={setOverlayData}
        setIsClickMarker={setIsClickMarker}
      />
    ],
    [NVSSNatalityData, NVSSNatalitySelected]
  );

  function handleOverlayAddChange(e) {
    setOverlayTitle(e.name);
    setOverlayData();

    if (e.name === 'Recruiting Facilities') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setUSCountryCancerProfileSelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setPopOverlaySelected(false);
      setIsClickMarker(true);
      setFacilityOverlaySelected(true);
    } else if (e.name === 'US State Population Dinsity') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setUSCountryCancerProfileSelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setIsClickMarker(false);
      setPopOverlaySelected(true);
    } else if (e.name === '2019 World Bank Health') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setUSCountryCancerProfileSelected(false);
      setPopOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setIsClickMarker(false);
      setWorldBankHealthOverlaySelected(true);
    } else if (e.name === '2015-2019 US Country Level Demographic Data') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setUSCountryCancerProfileSelected(false);
      setPopOverlaySelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCBSALevelDemographicSelected(false);
      setIsClickMarker(false);
      setUSCountryLevelDemographicSelected(true);
    } else if (e.name === '2015-2019 US Core-Based-Statistical-Area-Level Demographic Data') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setUSCountryCancerProfileSelected(false);
      setPopOverlaySelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setIsClickMarker(false);
      setUSCBSALevelDemographicSelected(true);
    } else if (e.name === '2016-2020 US Cancer Profile') {
      setNVSSNatalitySelected(false);
      setNVSSMortalitySelected(false);
      setPopOverlaySelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setIsClickMarker(false);
      setUSCountryCancerProfileSelected(true);
    } else if (e.name === '2021 National Vital Statistics System Mortality') {
      setNVSSNatalitySelected(false);
      setPopOverlaySelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setUSCountryCancerProfileSelected(false);
      setIsClickMarker(false);
      setNVSSMortalitySelected(true);
    } else if (e.name === '2022 National Vital Statistics System Natality') {
      setPopOverlaySelected(false);
      setWorldBankHealthOverlaySelected(false);
      setUSCountryLevelDemographicSelected(false);
      setUSCBSALevelDemographicSelected(false);
      setUSCountryCancerProfileSelected(false);
      setNVSSMortalitySelected(false);
      setIsClickMarker(false);
      setNVSSNatalitySelected(true);
    }
  }

  function handleOverlayRemoveChange(e) {
    if (e.name === 'Recruiting Facilities') {
      setFacilityOverlaySelected(false);
      setIsClickMarker(false);
    } else if (e.name === 'US State Population Dinsity') {
      setPopOverlaySelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2019 World Bank Health') {
      setWorldBankHealthOverlaySelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2015-2019 US Country Level Demographic Data') {
      setUSCountryLevelDemographicSelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2015-2019 US Core-Based-Statistical-Area-Level Demographic Data') {
      setUSCBSALevelDemographicSelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2016-2020 US Cancer Profile') {
      setUSCountryCancerProfileSelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2021 National Vital Statistics System Mortality') {
      setNVSSMortalitySelected(false);
      setIsClickMarker(false);
    } else if (e.name === '2022 National Vital Statistics System Natality') {
      setNVSSNatalitySelected(false);
      setIsClickMarker(false);
    }
  }

  function OverlayChangeHandler() {
    useMapEvents({
      overlayadd: (e) => handleOverlayAddChange(e),
      overlayremove: (e) => handleOverlayRemoveChange(e)
    });

    return null;
  }

  return (
    <Stack spacing={4} style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
      {facilityData.length > 0 ? (
        <MapContainer
          className="map"
          center={[38, -82]}
          zoom={4}
          minZoom={1}
          ref={mapRef}
          maxBounds={[
            [-90, -180],
            [90, 180]
          ]}
          style={{ width: '100%', height: '100%' }}
        >
          <LayersControl position="topright" collapsed={false}>
            <Layers />
            <OverlayChangeHandler />
            {overlay1}
            {overlay2}
            {overlay3}
            {overlay4}
            {overlay5}
            {overlay6}
            {overlay7}
            {overlay8}
          </LayersControl>
        </MapContainer>
      ) : (
        <Typography variant="h6">Map Loading...</Typography>
      )}
    </Stack>
  );
};

Map.propTypes = {
  mapRef: PropTypes.object,
  setOverlayTitle: PropTypes.func,
  setOverlayData: PropTypes.func,
  setIsClickMarker: PropTypes.func
};

export default Map;
