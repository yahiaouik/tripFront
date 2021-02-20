import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { initError, selectError } from '../../app/errorSlice';
import { useSelector, useDispatch } from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarError() {

    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        dispatch(initError());
        if (reason === 'clickaway') {
            return;
        }
    }

    return (
        <div>
            <Snackbar open={error.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error.severity}>
                    {error.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
