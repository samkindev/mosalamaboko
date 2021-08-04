import React from 'react';
import './inputs.css';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core';

const TextInput = (props) => {
    const {
        label,
        value = "",
        onChange = () => { },
        placeholder,
        multiline,
        rows,
        rowsMax,
        fullWidth,
        style,
        inputStyles,
        error,
        helperText,
        type,
        datatype,
        id,
        name,
        pattern,
        InputProps
    } = props;
    return (
        <div className="form-input" style={style}>
            <Typography htmlFor={id} variant="body2" className="label" style={{ textAlign: 'start' }} component="label">{label} </Typography>
            <TextField
                multiline={multiline}
                fullWidth={fullWidth}
                InputProps={{ style: { borderRadius: 0 }, ...InputProps }}
                size="small"
                type={type}
                datatype={datatype}
                name={name}
                id={id}
                placeholder={placeholder}
                variant="outlined"
                style={{ marginTop: 10, ...inputStyles }}
                rowsMax={rowsMax}
                rows={rows}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                pattern={pattern}
            />
        </div>
    )
}

TextInput.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    inputStyles: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    type: PropTypes.string,
    datatype: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    pattern: PropTypes.any,
    InputProps: PropTypes.object
}

export default TextInput;
