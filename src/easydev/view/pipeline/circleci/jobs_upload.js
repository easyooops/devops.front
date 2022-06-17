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
 * description  : devops ci/cd pipeline jobs define (upload)
 **/
import {
    Grid, Typography, Chip, Button
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
import FormText from "../../form/FormText";
import FormOption from "../../form/FormOption";

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const handleSample = () => {
    window.open('https://circleci.com/docs/2.0/contexts/');
};

const JobsUpload = forwardRef((props, ref)  => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const formRef = useRef(null);
    useImperativeHandle(ref, () => formRef.current);

    const handleInit = useCallback(() => {
        let payload = {};

        if (!circleci.info.hasOwnProperty('upload_file_name')
            || !circleci.info.hasOwnProperty('upload_ssh_host')
            || !circleci.info.hasOwnProperty('upload_ssh_port')
            || !circleci.info.hasOwnProperty('upload_ssh_path')
            || !circleci.info.hasOwnProperty('upload_s3_name')
            || !circleci.info.hasOwnProperty('upload_s3_location')
        ) {
            payload = circleci.info;
            payload['jobs_upload_type'] = '01';
            payload['upload_file_name'] = '';
            payload['upload_ssh_host'] = '';
            payload['upload_ssh_port'] = '';
            payload['upload_ssh_path'] = '';
            payload['upload_s3_name'] = '';
            payload['upload_s3_location'] = '';
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
        payload['jobs_upload_type'] = v.jobs_upload_type;
        payload['upload_file_name'] = v.upload_file_name;
        payload['upload_ssh_host'] = v.upload_ssh_host;
        payload['upload_ssh_port'] = v.upload_ssh_port;
        payload['upload_ssh_path'] = v.upload_ssh_path;
        payload['upload_s3_name'] = v.upload_s3_name;
        payload['upload_s3_location'] = v.upload_s3_location;
        dispatch({
            type:'CIRCLECI_GET_INFO',
            payload: payload
        });
        dispatch({type:'CIRCLECI_STEP', step: (circleci.step+1)});
    },[circleci.info, circleci.step, dispatch]);

    const handleChangeUpload = (_val,_touched,_errors,_onBlur,_onChange) => {
        let layer;

        if(_val.jobs_upload_type === '01') {
            layer = <React.Fragment>
                <Grid item xs={12}>
                    <FormText
                        id={"upload_file_name"}
                        label={"FILE(NAME)"}
                        placeholder={"deploy.tgz"}
                        value={_val.upload_file_name}
                        touched={_touched.upload_file_name}
                        errors={_errors.upload_file_name}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <FormText
                        id={"upload_ssh_host"}
                        label={"SSH(HOST)"}
                        placeholder={"user@192.168.1.100"}
                        value={_val.upload_ssh_host}
                        touched={_touched.upload_ssh_host}
                        errors={_errors.upload_ssh_host}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormText
                        id={"upload_ssh_port"}
                        label={"SSH(PORT)"}
                        placeholder={"21"}
                        value={_val.upload_ssh_port}
                        touched={_touched.upload_ssh_port}
                        errors={_errors.upload_ssh_port}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormText
                        id={"upload_ssh_path"}
                        label={"SERVER(Upload Path)"}
                        placeholder={"/home/repo/"}
                        value={_val.upload_ssh_path}
                        touched={_touched.upload_ssh_path}
                        errors={_errors.upload_ssh_path}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
            </React.Fragment>
        } else if(_val.jobs_upload_type === '02') {
            layer = <React.Fragment>
                <Grid item xs={12}>
                    <FormText
                        id={"upload_file_name"}
                        label={"FILE(NAME)"}
                        placeholder={"deploy.tgz"}
                        value={_val.upload_file_name}
                        touched={_touched.upload_file_name}
                        errors={_errors.upload_file_name}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormText
                        id={"upload_s3_name"}
                        label={"S3(BUCKET_NAME)"}
                        placeholder={"easy-oops-deploy"}
                        value={_val.upload_s3_name}
                        touched={_touched.upload_s3_name}
                        errors={_errors.upload_s3_name}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormText
                        id={"upload_s3_location"}
                        label={"S3(BUCKET_LOCATION)"}
                        placeholder={"easy-oops/cicleci"}
                        value={_val.upload_s3_location}
                        touched={_touched.upload_s3_location}
                        errors={_errors.upload_s3_location}
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
                    jobs_deploy_type: _isEmpty(circleci.info.jobs_deploy_type) ? '01' : circleci.info.jobs_deploy_type,
                    jobs_upload_type: (circleci.info.jobs_deploy_type === '02') ? '02' :
                                            _isEmpty(circleci.info.jobs_upload_type) ? '01' : circleci.info.jobs_upload_type,
                    upload_file_name: _isEmpty(circleci.info.upload_file_name) ? '' : circleci.info.upload_file_name,
                    upload_ssh_host: _isEmpty(circleci.info.upload_ssh_host) ? '' : circleci.info.upload_ssh_host,
                    upload_ssh_port: _isEmpty(circleci.info.upload_ssh_port) ? '' : circleci.info.upload_ssh_port,
                    upload_ssh_path: _isEmpty(circleci.info.upload_ssh_path) ? '' : circleci.info.upload_ssh_path,
                    upload_s3_name: _isEmpty(circleci.info.upload_s3_name) ? '' : circleci.info.upload_s3_name,
                    upload_s3_location: _isEmpty(circleci.info.upload_s3_location) ? '' : circleci.info.upload_s3_location,
                }}
                validationSchema={Yup.object().shape({
                    //s3_access: Yup.string().required('Please enter your s3 access information to upload.'),
                    //aws_region: Yup.string().required('Please enter your aws region information to deploy.'),
                    //aws_instance: Yup.string().required('Please enter your aws instance information to deploy.')
                })}
                onSubmit={(v) => {

                    // CircleCI Env Setting
                    v.upload_file_name = _isEmpty(v.upload_file_name) ? '$BUILD_FILE_NAME' : v.upload_file_name;
                    v.upload_ssh_host = _isEmpty(v.upload_ssh_host) ? '$UPLOAD_SSH_HOST' : v.upload_ssh_host;
                    v.upload_ssh_port = _isEmpty(v.upload_ssh_port) ? '$UPLOAD_SSH_PORT' : v.upload_ssh_port;
                    v.upload_ssh_path = _isEmpty(v.upload_ssh_path) ? '$UPLOAD_SSH_PATH' : v.upload_ssh_path;

                    v.upload_s3_name = _isEmpty(v.upload_s3_name) ? '$S3_BUCKET_NAME' : v.upload_s3_name;
                    v.upload_s3_location = _isEmpty(v.upload_s3_location) ? '$S3_BUCKET_LOCATION' : v.upload_s3_location;

                    handleNext(v);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom spacing={2}>
                            Next, let's set up the upload.
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
                                    <Chip icon={<Check />} label="UPLOAD" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormOption
                                    id={"jobs_upload_type"}
                                    item={[{"value":"01", "label":"SSH","disabled": (values.jobs_deploy_type === '02') ? true : false},{"value":"02", "label":"AWS(S3)"}]}
                                    value={values.jobs_upload_type}
                                    touched={touched.jobs_upload_type}
                                    errors={errors.jobs_upload_type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {handleChangeUpload(values, touched, errors, handleBlur, handleChange)}
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● For important information, it is recommended to set the environment variable of CircleCI. (If there is no input, an arbitrary environment variable name is set.)
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

export default JobsUpload;
