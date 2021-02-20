import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { selectTrips, filterTrip, createTrip } from '../../app/tripSlice';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions, MenuItem } from '@material-ui/core';
import jsonCountries from '../../ressources/countries';
import {promos} from '../../ressources/promos';
import {statusList} from '../../ressources/statusList';

const countriesInfo = jsonCountries.sort((a, b) => (a.name > b.name) ? 1 : -1);
countriesInfo.unshift({ "name": "Tous", "id": "", "alpha": "" });
const countries = countriesInfo.map(function (item) {
  return item.name;
})

const countriesIds = countriesInfo.map(function (item) {
  return item.id;
})


export default function MultilineTextFields(props) {
  const classes = useStyles();
  useSelector(selectTrips);

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [promo, setPromo] = React.useState(0);
  const [country, setCountry] = React.useState(0);
  const [city, setCity] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("2019-01-01");
  const [departureDate, setDepartureDate] = React.useState("2021-02-01");
  const [status, setStatus] = React.useState(0);
  const [dialog, setDialog] = React.useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <form className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6" component="h2"> Filtrer les Voyages</Typography>
        </div>
        {props.role === "ADMIN" &&
          <div>
            <TextField
              label="Prénom"
              value={firstname}
              onChange={(event) => { setFirstname(event.target.value) }}
              variant="outlined"
            />
          </div>}
        {props.role === "ADMIN" &&
          <div>
            <TextField
              label="Nom"
              value={lastname}
              onChange={(event) => { setLastname(event.target.value) }}
              variant="outlined"
            />
          </div>}
        {props.role === "ADMIN" &&
          <div>
            <TextField
              select
              label="Promotion"
              value={promo}
              onChange={(event) => { setPromo(event.target.value) }}
              variant="outlined"
            >
              {promos.map((element, index) => {
                return <MenuItem key={index} value={index}> {element} </MenuItem>
              })}
            </TextField>
          </div>}
        <div>
          <TextField
            select
            label="Pays"
            value={country}
            onChange={(event) => { setCountry(event.target.value) }}
            variant="outlined"
          >
            {countries.map((element, index) => {
              return <MenuItem key={index} value={index}> {element} </MenuItem>
            })}
          </TextField>
        </div>
        <div>
          <TextField
            label="Ville"
            value={city}
            onChange={(event) => { setCity(event.target.value) }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Status"
            value={status}
            onChange={(event) => { setStatus(event.target.value) }}
            variant="outlined"
          >
            {statusList.map((element, index) => {
              return <MenuItem key={index} value={index}> {element} </MenuItem>
            })}
          </TextField>
        </div>
        <div>
          <TextField
            label="Date de depart"
            type="date"
            value={arrivalDate}
            onChange={event => setArrivalDate(event.target.value)}
            className={classes.date}
          />
        </div>
        <div>
          <TextField
            label="Date de Fin"
            type="date"
            value={departureDate}
            onChange={event => setDepartureDate(event.target.value)}
            className={classes.date}
          />
        </div>
        <Button className={classes.button} variant="contained" color="primary" onClick={e => filterTrips()}>
          Valider
        </Button>
        {props.role === "USER" &&
          <Button className={classes.button} variant="contained" color="primary" onClick={e => { setDialog(true); console.log(dialog) }}>
            Créer un voyage
        </Button>
        }
      </form>
      <Dialog open={dialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Créer une mobilité</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour créer une mobilité, merci de remplir les champs ci-dessous
        </DialogContentText>
          <form className={classes.dialogItems}>
            <div>
              <TextField
                select
                label="Pays"
                value={country}
                onChange={(event) => { setCountry(event.target.value) }}
                variant="outlined"
              >
                {countries.map((element, index) => {
                  return <MenuItem key={index} value={index}> {element} </MenuItem>
                })}
              </TextField>
            </div>
            <div>
              <TextField
                label="Ville"
                value={city}
                onChange={(event) => { setCity(event.target.value) }}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Date de depart"
                type="date"
                value={arrivalDate}
                onChange={event => setArrivalDate(event.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Date de Fin"
                type="date"
                value={departureDate}
                onChange={event => setDepartureDate(event.target.value)}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setDialog(false)} color="primary">
            Annuler
        </Button>
          <Button onClick={e => { dispatch(createTrip(countries[country], countriesIds[country], city, arrivalDate, departureDate)); setDialog(false) }} color="primary">
            Créer
        </Button>
        </DialogActions>
      </Dialog>
    </div>

  );

  function filterTrips() {
    const filters = {
      firstname,
      lastname,
      promo: undefinedOrAll(promos[promo]),
      country: undefinedOrAll(countries[country]),
      city: city,
      arrivalDate: new Date(arrivalDate).getTime(),
      departureDate: new Date(departureDate).getTime(),
      status: undefinedOrAll(statusList[status])
    }
    dispatch(filterTrip(filters));
  }

  function undefinedOrAll(filter) {
    if (filter !== undefined && filter !== "Tous") {
      return filter;
    } else {
      return "";
    }
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginLeft: '8%',
      marginRight: '8%',
      marginTop: '8%',
      width: '80%',
      height: '50px',

    },
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '5%',
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#3f50b5',
    margin: '3%',
  },
  button: {
    marginTop: '8%',
    textAlign: 'center'
  },
  dialogItems: {
    '& .MuiTextField-root': {
      marginLeft: '8%',
      marginRight: '8%',
      marginTop: '8%',
      width: '80%',
      height: '50px',

    }
  }
}));