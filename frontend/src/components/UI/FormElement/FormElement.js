import React from 'react';
import {makeStyles, Grid, TextField} from "@material-ui/core";
import PropTypes from 'prop-types';
import FileInput from "./FileInput";

const useStyles = makeStyles(theme => ({
    gridItem: {
        marginBottom: theme.spacing(3)
    }
}));

const FormElement = ({
    type,
    name,
    value,
    changed,
    error,
    label,
    id,
    changedFile,
    multiline,
    rows,
    required
 }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.gridItem}>
            {type !== 'file' ? <TextField
                fullWidth
                type={type}
                multiline={multiline}
                rows={rows}
                name={name}
                value={value}
                onChange={changed}
                error={!!error}
                helperText={error}
                label={label}
                variant='outlined'
                id={id}
                required={required}
            /> : <FileInput
                changedFile={changedFile}
                label={label}
                name={name}
                error={error}
                id={id}
            />}
        </Grid>
    );
};

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    changed: PropTypes.func,
    id: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number
}

export default FormElement;