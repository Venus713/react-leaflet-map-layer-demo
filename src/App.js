import React, { useRef, useState } from 'react';
import { Grid, Typography, Divider, Stack, Alert, Box } from '@mui/material';
import Map from './Map/Map';
import { EnvironmentTwoTone, InfoCircleFilled } from '@ant-design/icons';

// ===========================|| INSITES - INDEX ||=========================== //

const InSites = () => {
  const mapRef = useRef();

  const [overlayTitle, setOverlayTitle] = useState('Recruiting Facilities');
  const [overlayData, setOverlayData] = useState();
  const [isClickMarker, setIsClickMarker] = useState(true);

  console.log('Title', overlayData);

  const detailItem = (data) => {
    console.log('data', data);
    if (data) {
      return Object.entries(data).map(([key, value], index) => {
        return (
          <Stack key={index} direction="row" justifyContent="space-between" flexWrap="wrap">
            <Typography variant="h6" color="textSecondary">
              {key}:
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {value}
            </Typography>
          </Stack>
        );
      });
    }
  };

  return (
    <>
      <Grid container spacing={5} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Grid item xs={12} sm={12} md={8.5} style={{ width: '100%' }}>
          <Map mapRef={mapRef} setOverlayTitle={setOverlayTitle} setOverlayData={setOverlayData} setIsClickMarker={setIsClickMarker} />
        </Grid>
        <Grid item xs={12} sm={12} md={3.5}>
          <Box>
            <Typography variant="h5">Detailed Information</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack
              sx={{
                height: 'calc(100vh - 400px)',
                overflowY: 'auto',
                paddingRight: '10px'
              }}
            >
              {overlayData ? (
                <>
                  {/* <Stack
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 999,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <LoadingOutlined style={{ fontSize: '26px', color: '#08c' }} />
                  </Stack> */}
                  {overlayTitle === 'Recruiting Facilities' || isClickMarker ? (
                    <>
                      {overlayData.properties.facility_info && (
                        <>
                          <Alert color="info" icon={<InfoCircleFilled />} sx={{ padding: 0, mb: 1 }}>
                            {overlayData.properties.facility_info.status}
                          </Alert>
                          <em>
                            <EnvironmentTwoTone />
                            {overlayData.id}
                          </em>
                        </>
                      )}
                      {overlayData.properties.trial_info &&
                        overlayData.properties.trial_info.map((trial, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Divider sx={{ mt: 1 }} />
                              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" sx={{ mt: 1, mb: 1 }}>
                                <Typography variant="h5" color="textSecondary">
                                  NCT_ID:
                                </Typography>
                                <Typography variant="h5" color="textPrimary">
                                  {trial.nct_id}
                                </Typography>
                              </Stack>
                              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" sx={{ mt: 1, mb: 1 }}>
                                <Typography variant="h6" color="textSecondary">
                                  Lead Sponsor:
                                </Typography>
                                <Typography variant="h6" color="textPrimary">
                                  {trial.lead_sponsor}
                                </Typography>
                              </Stack>
                              {trial.central_contacts && Object.keys(trial.central_contacts).length !== 0 && (
                                <>
                                  <Typography variant="h6" color="textSecondary" textAlign="center">
                                    Central Contacts
                                  </Typography>
                                  {trial.central_contacts.map((contacts, index) => {
                                    return <React.Fragment key={index}>{detailItem(contacts)}</React.Fragment>;
                                  })}
                                </>
                              )}
                              {trial.facility_contacts && Object.keys(trial.facility_contacts[0]).length !== 0 && (
                                <>
                                  <Typography variant="h6" color="textSecondary" textAlign="center">
                                    Facility Contacts
                                  </Typography>
                                  {trial.facility_contacts.map((contacts, index) => {
                                    return <React.Fragment key={index}>{detailItem(contacts)}</React.Fragment>;
                                  })}
                                </>
                              )}
                              {trial.facility_investigators && Object.keys(trial.facility_investigators[0]).length !== 0 && (
                                <>
                                  <Typography variant="h6" color="textSecondary" textAlign="center">
                                    Facility Investigators
                                  </Typography>
                                  {trial.facility_investigators.map((investigator, index) => {
                                    return <React.Fragment key={index}>{detailItem(investigator)}</React.Fragment>;
                                  })}
                                </>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </>
                  ) : (
                    <React.Fragment>
                      <Stack sx={{ mt: 1 }}>{detailItem(overlayData)}</Stack>
                    </React.Fragment>
                  )}
                </>
              ) : (
                <Typography variant="h6" color="textSecondary" textAlign="center">
                  No Selected
                </Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default InSites;
