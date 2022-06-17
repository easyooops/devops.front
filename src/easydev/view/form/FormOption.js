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
 * description  : common form option
 **/
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import {_isEmpty} from "../../lib/common";

const useStyles = makeStyles((theme) => ({
    root: {

    }
}));

const FormOption = (props) => {
    const classes = useStyles();

    let _items = [];

    if(_isEmpty(props.item)) {
        _items = [
            { label: '아니오', value: false },
            { label: '예', value: true }
        ];
    } else {
        _items = props.item;
    }

    return (
        <FormControl
            className={classes.root}
            fullWidth
            required={_isEmpty(props.required) ? false : true}
            disabled={_isEmpty(props.disabled) ? false : true}
        >
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <RadioGroup
                row
                id={props.id}
                name={props.id}
                autoComplete="cc-csc"
                variant="standard"
                value={props.value}
                // error={Boolean(props.touched && props.errors)}
                // helperText={props.touched && props.errors}
                onBlur={props.onBlur}
                onChange={props.onChange}
                onClick={props.onClick}
            >
                {_items.map((v, i) =>
                    <FormControlLabel
                        key={i+1}
                        value={v.value}
                        control={<Radio color="primary" />}
                        label={v.label}
                        labelPlacement="end"
                        disabled={v.disabled}
                    />
                )}
            </RadioGroup>
        </FormControl>
    );
};
export default FormOption;