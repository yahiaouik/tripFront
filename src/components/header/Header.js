import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { selectUser, logOut } from '../../app/userSlice';
import history from '../../history';

export default function Header() {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Mobility App
          </Typography>
          {user.firstname !== "" && <div>
            <Typography variant="h6" className={classes.userInfo}>
              {user.firstname} {user.lastname}
            </Typography>
            <Button color="inherit" onClick={e => dispatch(logOut) }><AccountCircleIcon /></Button>
          </div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userInfo: {
    float: "left",
  }
}));