import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button, Switch, FormControlLabel } from '@mui/material';
import { TopBox } from './Styles';
import {
  ProfileBox,
  TopTutor,
  TutorListBox,
  RequestHistory,
  OfferHistory,
} from './components';
import { useThunkDispatch } from 'common/hooks';
import {
  getAllTutors,
  getMyOffers,
  getMyRequests,
  getSelfTutor,
  updateSelfTutor,
} from 'Store/Actions/tutoring';
import { useSelector } from 'react-redux';
import {
  selectMyOffers,
  selectMyRequests,
  selectSelfTutorDetails,
} from 'Store/Selector/tutoring';

export default function StudentTutoring() {
  // const [open, setOpen] = React.useState(false);
  // const [modalData, setModalData] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(false);

  const selfTutor = useSelector(selectSelfTutorDetails);
  const myRequests = useSelector(selectMyRequests);
  const myOffers = useSelector(selectMyOffers);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getSelfTutor());
    dispatch(getMyRequests());
    dispatch(getMyOffers());
    dispatch(getAllTutors());
  }, []);

  useEffect(() => {
    if (selfTutor.isActive && !firstLoad) {
      setIsActive(!!selfTutor.isActive);
      setFirstLoad(true);
    }
  }, [selfTutor.isActive]);

  const updateTutor = (value) => {
    dispatch(updateSelfTutor({ isActive: value, id: selfTutor.id }));
    setIsActive(value);
  };

  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      {/* <RewardDetailsModal open={open} setOpen={setOpen} data={modalData} /> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TopBox>
            <Grid container>
              <Grid item xs={10} md={8}>
                <ProfileBox selfTutor={selfTutor} />
              </Grid>
              <Grid item xs={12} md={4} className="grid-item-2">
                {/* <Button variant="contained">Request to be a tutor</Button> */}
                <FormControlLabel
                  control={
                    <Switch
                      disabled={!selfTutor.courses?.length}
                      checked={isActive}
                      onClick={() => updateTutor(!isActive)}
                    />
                  }
                  label="Available as a tutor"
                />
              </Grid>
            </Grid>
          </TopBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <TopTutor />
        </Grid>
        <Grid item xs={12}>
          <TutorListBox />
        </Grid>
        <Grid item xs={12} lg={12}>
          <RequestHistory data={myRequests} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <OfferHistory data={myOffers} />
        </Grid>
      </Grid>
    </Container>
  );
}
