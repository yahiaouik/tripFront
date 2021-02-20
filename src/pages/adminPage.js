import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../components/header/Header';
import SimpleTabs from '../components/tripsTab/tripTab';
import ReaserchBar from '../components/reaserchBar/reaserchBar';
import { makeStyles } from '@material-ui/core/styles';

function AdminPage() {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid container>
          <Grid item xs={2} className={classes.root}>
            <ReaserchBar role="ADMIN" />
          </Grid>
          <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <SimpleTabs />
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPage;
const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: 'solid',
    borderRightColor: '#3f50b5',
    marginTop: '1%',
  },
}));