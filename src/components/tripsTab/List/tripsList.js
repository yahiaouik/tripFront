import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { updateTrip, deleteTrip, validateTrip } from '../../../app/tripSlice';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions, MenuItem } from '@material-ui/core';
import jsonCountries from '../../../ressources/countries';

const countriesInfo = jsonCountries.sort((a, b) => (a.name > b.name) ? 1 : -1);
countriesInfo.unshift({ "name": "Tous", "id": "", "alpha": "" });
const countries = countriesInfo.map(function (item) {
  return item.name;
})

const countriesIds = countriesInfo.map(function (item) {
  return item.id;
})
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer:{
    maxHeight: "550px",
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
});

export default function BasicTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [country, setCountry] = React.useState(0);
  const [city, setCity] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("2019-01-01");
  const [departureDate, setDepartureDate] = React.useState("2021-02-01");
  const [dialog, setDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState();

  return (
    <div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="simple table">
          <TableHead >
            <TableRow>
              {props.role === "ADMIN" &&
                <TableCell align="center">Etudiant</TableCell>}
              {props.role === "ADMIN" &&
                <TableCell align="center">Promo</TableCell>
              }
              <TableCell align="center">Pays</TableCell>
              <TableCell align="center">Ville</TableCell>
              <TableCell align="center">Date Arrivée</TableCell>
              <TableCell align="center">Date Retour</TableCell>
              <TableCell align="center">Statut</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow key={index}>
                {props.role === "ADMIN" &&
                  <TableCell align="center" component="th" scope="row">
                    {row.userFirstname + " " + row.userLastname}
                  </TableCell>}
                {props.role === "ADMIN" &&
                  <TableCell align="right">{row.userPromo}</TableCell>
                }
                <TableCell align="center">{row.country}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{new Date(row.arrivalDate).toLocaleDateString('default', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}</TableCell>
                <TableCell align="center">{new Date(row.departureDate).toLocaleDateString('default', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                {
                  row.status === "En attente de validation" &&
                  props.role !== "ADMIN" &&
                  <TableCell align="center"><Button onClick={e => { setDialog(true); setSelectedRow(row) }}><UpdateIcon /></Button><Button onClick={e => dispatch(deleteTrip(row.tripId))}><DeleteIcon /></Button></TableCell>
                }
                {
                  row.status === "En attente de validation" &&
                  props.role === "ADMIN" &&
                  <TableCell align="center"><Button onClick={e => dispatch(validateTrip(row.tripId, row.userId, row.country, row.countryId, row.city, row.arrivalDate, row.departureDate))}><CheckIcon /></Button></TableCell>
                }
                {
                  row.status !== "En attente de validation"  &&
                  <TableCell align="center"/>
                }

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          <Button onClick={e => { dispatch(updateTrip(selectedRow.tripId, countries[country], countriesIds[country], city, arrivalDate, departureDate)); setDialog(false) }} color="primary">
            Mettre à jour
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
