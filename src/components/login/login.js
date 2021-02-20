import React from 'react';
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {logUser} from '../../app/userSlice';

export default function LoginTab() {

    const dispatch = useDispatch();
    const classes = useStyles()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Username" type="email" onChange={(event) => { setEmail(event.target.value) }}fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="password" label="Password" type="password" onChange={(event) => { setPassword(event.target.value) }} fullWidth required />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={e=> {dispatch(logUser(email,password))}}>Login</Button>
                </Grid>
            </div>
        </Paper>
    );
}


const useStyles = makeStyles(theme =>({
    margin: {
        marginTop: "15%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    padding: {
        paddingLeft: "15%",
        paddingRight: "15%"
    }
}));
