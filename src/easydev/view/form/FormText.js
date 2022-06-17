/**
 * -----------------------------------------------------------------------------
 * MIT License
 * Copyright (c) 2021 EasyOops
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * -----------------------------------------------------------------------------
 *
 * date         : 2021.09.01
 * creater      : EasyOops
 * description  : common form text
 **/
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import {_isEmpty} from "../../lib/common";

const useStyles = makeStyles((theme) => ({
    root: {}
}));

const FormText = (props) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.root}
            required={_isEmpty(props.required) ? false : true}
            disabled={_isEmpty(props.disabled) ? false : true}
            id={props.id}
            label={props.label}
            placeholder={props.placeholder}
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={props.value}
            error={Boolean(props.touched && props.errors)}
            helperText={props.touched && props.errors}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onClick={props.onClick}
            InputLabelProps={{
                shrink: true,
            }} />
    );
};
export default FormText;