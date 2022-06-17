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
 * date         : 2021.01.26
 * update       : 2021.01.26
 * creater      : EasyOops
 * description  : MSA Exam Home
 **/
import {
    Container, Paper, Typography, Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Page from '../Page';
import { XTerm } from 'xterm-for-react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        paddingBottom: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(4),
        justifyContent : "center",
        alignContent : "center"
    },
    title: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                EasyOops
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Main = () => {
    const classes = useStyles();

    const xtermRef = React.useRef(null)

    React.useEffect(() => {
        // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
        xtermRef.current.terminal.writeln("Hello, World!")
    }, [])

    return (
        <Page
            className={classes.root}
            title="Main"
        >
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" >
                        EasyOops CI/CD Pipeline
                    </Typography>
                    <React.Fragment>
                        <XTerm ref={xtermRef} options={{ lineHeight: 1 }} />
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </Page>
    );
};

export default Main;
