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
 * description  : devops ci/cd pipeline workflows
 **/
import {
    Button,
    Grid, Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {_isEmpty} from "../../../lib/common";
import FormText from "../../form/FormText";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        marginTop: 0,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    title: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const handleSample = () => {
    window.open('https://circleci.com/docs/2.0/contexts/');
};

const Workflows = forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const formRef = useRef(null);
    useImperativeHandle(ref, () => formRef.current);

    const handleInit = useCallback(() => {
        let payload = {};

        if (!circleci.info.hasOwnProperty('wp_develop_name')
            || !circleci.info.hasOwnProperty('wp_release_name')
            || !circleci.info.hasOwnProperty('wp_master_name')
            || !circleci.info.hasOwnProperty('wp_develop_env')
            || !circleci.info.hasOwnProperty('wp_release_env')
            || !circleci.info.hasOwnProperty('wp_master_env')
        ) {
            payload = circleci.info;
            payload['wp_develop_name'] = '';
            payload['wp_release_name'] = '';
            payload['wp_master_name'] = '';
            payload['wp_develop_env'] = '';
            payload['wp_release_env'] = '';
            payload['wp_master_env'] = '';
            dispatch({
                type:'CIRCLECI_GET_INFO',
                payload: payload
            });
        }
    },[circleci.info, dispatch]);

    useEffect(() => {
        handleInit();
    }, [handleInit]);

    const handleNext = useCallback((v) => {
        let payload = {}
        payload = circleci.info;
        payload['wp_develop_name'] = v.wp_develop_name;
        payload['wp_release_name'] = v.wp_release_name;
        payload['wp_master_name'] = v.wp_master_name;
        payload['wp_develop_env'] = v.wp_develop_env;
        payload['wp_release_env'] = v.wp_release_env;
        payload['wp_master_env'] = v.wp_master_env;
        dispatch({
            type:'CIRCLECI_GET_INFO',
            payload: payload
        });
        dispatch({type:'CIRCLECI_STEP', step: (circleci.step+1)});
    },[circleci.info, circleci.step, dispatch]);

    return (
        <React.Fragment>
            <Formik
                innerRef={formRef}
                enableReinitialize
                initialValues={{
                    wp_develop_name: _isEmpty(circleci.info.wp_develop_name) ? '' : circleci.info.wp_develop_name,
                    wp_release_name: _isEmpty(circleci.info.wp_release_name) ? '' : circleci.info.wp_release_name,
                    wp_master_name: _isEmpty(circleci.info.wp_master_name) ? '' : circleci.info.wp_master_name,

                    wp_develop_env: _isEmpty(circleci.info.wp_develop_env) ? '' : circleci.info.wp_develop_env,
                    wp_release_env: _isEmpty(circleci.info.wp_release_env) ? '' : circleci.info.wp_release_env,
                    wp_master_env: _isEmpty(circleci.info.wp_master_env) ? '' : circleci.info.wp_master_env
                }}
                validationSchema={Yup.object().shape({
                    wp_develop_name: Yup.string().required('Please enter your git branch(develop) name information to checkout.')
                })}
                onSubmit={(v) => {
                    handleNext(v);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom spacing={2}>
                            Finally, let's set up the workflow.
                        </Typography>
                        <Grid container
                              className={classes.root}
                              marginTop={1}
                              spacing={4}
                              justifyContent="center"
                              alignItems="center"
                        >
                            <Grid item xs={6}>
                                <FormText
                                    required={true}
                                    id={"wp_develop_name"}
                                    label={"develop(branch name)"}
                                    placeholder={"develop"}
                                    value={values.wp_develop_name}
                                    touched={touched.wp_develop_name}
                                    errors={errors.wp_develop_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormText
                                    required={true}
                                    id={"wp_develop_env"}
                                    label={"develop(context)"}
                                    placeholder={"develop-context"}
                                    value={values.wp_develop_env}
                                    touched={touched.wp_develop_env}
                                    errors={errors.wp_develop_env}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormText
                                    id={"wp_release_name"}
                                    label={"release(branch name)"}
                                    placeholder={"release"}
                                    //helperText="Please enter your git branch(release) name information to checkout."
                                    value={values.wp_release_name}
                                    touched={touched.wp_release_name}
                                    errors={errors.wp_release_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormText
                                    id={"wp_release_env"}
                                    label={"release(context)"}
                                    placeholder={"release-context"}
                                    //helperText="Please enter your git branch(release) name information to checkout."
                                    value={values.wp_release_env}
                                    touched={touched.wp_release_env}
                                    errors={errors.wp_release_env}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormText
                                    id={"wp_master_name"}
                                    label={"master(branch name)"}
                                    placeholder={"master"}
                                    //helperText="Please enter your git branch(master) name information to checkout."
                                    value={values.wp_master_name}
                                    touched={touched.wp_master_name}
                                    errors={errors.wp_master_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormText
                                    id={"wp_master_env"}
                                    label={"master(context)"}
                                    placeholder={"master-context"}
                                    //helperText="Please enter your git branch(master) name information to checkout."
                                    value={values.wp_master_env}
                                    touched={touched.wp_master_env}
                                    errors={errors.wp_master_env}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● Workflows - Development / staging / production environment configuration is provided at the same time. Optional for staging/production configurations.
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● It is written based on the use of GIT.
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● SETTINGS >> Contexts >> Create Context <Button onClick={handleSample} >[SAMPLE]</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
});

export default Workflows;
