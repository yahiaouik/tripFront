import { Grid } from '@material-ui/core';
import React from 'react';
import LoginTab from '../components/login/login';
import Header from '../components/header/Header';

function ConnexionPage() {
  return (
    <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid >
        <Grid item xs={12}>
        <LoginTab/>
        </Grid>
    </Grid>
  );
}

export default ConnexionPage;