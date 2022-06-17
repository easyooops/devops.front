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
 * description  : devops ci/cd pipeline jobs define (build)
 **/
import {
    Grid, Typography, Chip
} from '@mui/material';
import {
    Check
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, {useCallback, useEffect, forwardRef, useImperativeHandle, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {_isEmpty} from "../../../lib/common";
import FormOption from "../../form/FormOption";
import FormSelect from "../../form/FormSelect";

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const JobsBuild = forwardRef((props, ref)  => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const formRef = useRef(null);
    useImperativeHandle(ref, () => formRef.current);

    const handleInit = useCallback(() => {
    },[]);

    useEffect(() => {
        handleInit();
    }, [handleInit]);

    const handleNext = useCallback((v) => {
        let payload = {}
        payload = circleci.info;
        payload['jobs_build_type'] = v.jobs_build_type;
        payload['jobs_test_used'] = v.jobs_test_used;
        dispatch({
            type:'CIRCLECI_GET_INFO',
            payload: payload
        });
        dispatch({type:'CIRCLECI_STEP', step: (circleci.step+1)});
    },[circleci.info, circleci.step, dispatch]);

    const handleChangeUpload = (_val,_touched,_errors,_onBlur,_onChange) => {
        let layer;

        if(_val.jobs_build_type === '01') {
            layer = <React.Fragment>
                <Grid item xs={12}>
                    <FormSelect
                        id={"jobs_test_used"}
                        label={"JUNIT TEST"}
                        placeholder={"master"}
                        firstDefault={false}
                        item={[{"code":"01", "name":"use"},{"code":"02", "name":"do not used"}]}
                        value={_val.jobs_test_used}
                        touched={_touched.jobs_test_used}
                        errors={_errors.jobs_test_used}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
            </React.Fragment>
        } else if(_val.jobs_build_type === '02') {
            layer = <React.Fragment>
                <Grid item xs={12}>
                    <FormSelect
                        id={"jobs_test_used"}
                        label={"JUNIT TEST"}
                        placeholder={"master"}
                        firstDefault={false}
                        item={[{"code":"01", "name":"use"},{"code":"02", "name":"do not used"}]}
                        value={_val.jobs_test_used}
                        touched={_touched.jobs_test_used}
                        errors={_errors.jobs_test_used}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
            </React.Fragment>
        }

        return layer;
    };

    return (
        <React.Fragment>
            <Formik
                innerRef={formRef}
                enableReinitialize
                initialValues={{
                    /* upload */
                    jobs_build_type: _isEmpty(circleci.info.jobs_build_type) ? '01' : circleci.info.jobs_build_type,
                    jobs_test_used: _isEmpty(circleci.info.jobs_test_used) ? '02' : circleci.info.jobs_test_used
                }}
                validationSchema={Yup.object().shape({
                })}
                onSubmit={(v) => {
                    handleNext(v);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom spacing={2}>
                            Next, let's choose a build type.
                        </Typography>
                        <Grid container
                              className={classes.root}
                              marginTop={1}
                              spacing={3}
                              justifyContent="center"
                              alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Typography variant="h4" color={"darkblue"} spacing={1}>
                                    <Chip icon={<Check />} label="BUILD" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormOption
                                    id={"jobs_build_type"}
                                    item={[{"value":"01", "label":"ANT"},{"value":"02", "label":"MAVEN"},{"value":"03", "label":"GRADLE","disabled":true}]}
                                    value={values.jobs_build_type}
                                    touched={touched.jobs_build_type}
                                    errors={errors.jobs_build_type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {handleChangeUpload(values, touched, errors, handleBlur, handleChange)}
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● We're done setting up jobs. jobs define each step of build, test, upload, and deploy, and have a role of tying them together.
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
});

export default JobsBuild;
