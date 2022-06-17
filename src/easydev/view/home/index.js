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
 * description  : home page
 **/
import {
    Button, Box, Container, Paper, Typography, Stepper, Step, StepLabel, Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useCallback, useRef} from 'react';
import Page from '../Page';
import Start from "../pipeline"
import CircleCIJobsBuild from "../pipeline/circleci/jobs_build"
import CircleCIJobsUpload from "../pipeline/circleci/jobs_upload"
import CircleCIJobsDeploy from "../pipeline/circleci/jobs_deploy"
import CircleCIWorkflows from "../pipeline/circleci/workflows"
import CircleCIResult from "../pipeline/circleci/result"
import Finished from "../pipeline/circleci/finish"
import {useDispatch, useSelector} from "react-redux";

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
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const jobsBuildRef = useRef(null);
    const jobsUploadRef = useRef(null);
    const jobsDeployRef = useRef(null);
    const worksRef = useRef(null);

    const steps = ['Start', 'Jobs', 'Workflows', 'Finish'];

    const getStepContent = useCallback((step) => {
        switch (step) {
            case 0:
                return <Start />;
            case 1: // Job(Deploy)
                return <CircleCIJobsDeploy ref={jobsDeployRef} />;
            case 2: // Job(Upload)
                return <CircleCIJobsUpload ref={jobsUploadRef} />;
            case 3: // Job(Build)
                return <CircleCIJobsBuild ref={jobsBuildRef} />;
            case 4: // Workflow
                return <CircleCIWorkflows ref={worksRef} />;
            case 5: // Guide
                return <CircleCIResult />;
            default:
                return;
        }
    },[]);

    const handleNext = useCallback((step) => {
        if(step === 0 || step === 5) {
            dispatch({type:'CIRCLECI_STEP', step:(step+1)});
        } else if(step === 1) {
            jobsDeployRef.current.handleSubmit();
        } else if(step === 2) {
            jobsUploadRef.current.handleSubmit();
        } else if(step === 3) {
            jobsBuildRef.current.handleSubmit();
        } else if(step === 4) {
            worksRef.current.handleSubmit();
        }
    },[dispatch]);

    const handleBack = useCallback((step) => {
        dispatch({type:'CIRCLECI_STEP', step: (step-1)});
    },[dispatch]);

    const stepChange = (step) => {

        if(step === 1 || step === 2 || step === 3) {
            step = 1
        } else if(step === 4) {
            step = 2
        } else if(step === 5) {
            step = 3
        } else if(step === 6) {
            step = 4
        }
        return step;
    };

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
                        <Stepper activeStep={stepChange(circleci.step)} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {stepChange(circleci.step) === steps.length ? (
                                <Finished />
                            ) : (
                                <React.Fragment>
                                    {getStepContent(circleci.step)}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {circleci.step !== 0 && (
                                            <Button onClick={() => handleBack(circleci.step)} sx={{ mt: 3, ml: 1 }}>
                                                Back
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            onClick={() => handleNext(circleci.step)}
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            {'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </Container>
            </Page>
    );
};

export default Main;
