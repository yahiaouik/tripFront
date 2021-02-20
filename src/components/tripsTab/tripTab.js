import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BasicTable from './List/tripsList';
import Map from './Map/map';

import { useSelector, useDispatch } from 'react-redux';
import {
    changeTabValueAsync,
    selectValue,
} from './tripsTabSlice';
import {selectTrips} from '../../app/tripSlice';
import {selectUser} from '../../app/userSlice';

export default function SimpleTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const value = useSelector(selectValue);
  const trips = useSelector(selectTrips);
  const user = useSelector(selectUser);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={(e,v) => dispatch(changeTabValueAsync(v))}>
          <Tab label="Carte"/>
          <Tab label="Liste"/>
        </Tabs>
      </AppBar>
      {value === 0 && (
        <Map rows={trips} role={user.promo}/>
      )}
      {value === 1 && (
        <BasicTable rows={trips} role={user.promo}/>
      )}
    </div>
  );

}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      margin: '3%',
    },
  }));