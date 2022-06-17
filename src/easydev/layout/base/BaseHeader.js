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
 * description  : header
 **/
import {
    AppBar, Button, Toolbar, IconButton, Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from '@mui/icons-material';
import React from 'react';

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
}));

const handleAlert = (_msg) => {
    alert(_msg);
};

const BaseHeader = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={() => handleAlert('Wait!! We\'ll give you a very easy experience.')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    EasyOops
                </Typography>
                <Button onClick={() => handleAlert('We do not handle personal information.')} color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default BaseHeader;