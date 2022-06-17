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
 * description  : devops ci/cd pipeline jobs define (deploy)
 **/
import {
    Button, Grid, Typography, Chip
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

const Jobs = forwardRef((props, ref)  => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const formRef = useRef(null);
    useImperativeHandle(ref, () => formRef.current);

    const handleInit = useCallback(() => {
        let payload = {};

        if (!circleci.info.hasOwnProperty('deploy_ssh_host')
            || !circleci.info.hasOwnProperty('deploy_ssh_port')
            || !circleci.info.hasOwnProperty('deploy_ssh_path')
            || !circleci.info.hasOwnProperty('deploy_ssh_account')
            || !circleci.info.hasOwnProperty('deploy_aws_access')
            || !circleci.info.hasOwnProperty('deploy_aws_secret')
            || !circleci.info.hasOwnProperty('deploy_aws_region')
            || !circleci.info.hasOwnProperty('deploy_aws_cd_name')
            || !circleci.info.hasOwnProperty('deploy_aws_cd_group')
        ) {
            payload = circleci.info;
            payload['jobs_deploy_type'] = '01';
            payload['deploy_ssh_host'] = '';
            payload['deploy_ssh_port'] = '';
            payload['deploy_ssh_path'] = '';
            payload['deploy_ssh_account'] = '';
            payload['deploy_aws_access'] = '';
            payload['deploy_aws_secret'] = '';
            payload['deploy_aws_region'] = '';
            payload['deploy_aws_cd_name'] = '';
            payload['deploy_aws_cd_group'] = '';
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
        payload['jobs_deploy_type'] = v.jobs_deploy_type;
        payload['deploy_ssh_host'] = v.deploy_ssh_host;
        payload['deploy_ssh_port'] = v.deploy_ssh_port;
        payload['deploy_ssh_path'] = v.deploy_ssh_path;
        payload['deploy_ssh_account'] = v.deploy_ssh_account;
        payload['deploy_aws_access'] = v.deploy_aws_access;
        payload['deploy_aws_secret'] = v.deploy_aws_secret;
        payload['deploy_aws_region'] = v.deploy_aws_region;
        payload['deploy_aws_cd_name'] = v.deploy_aws_cd_name;
        payload['deploy_aws_cd_group'] = v.deploy_aws_cd_group;

        dispatch({
            type:'CIRCLECI_GET_INFO',
            payload: payload
        });
        dispatch({type:'CIRCLECI_STEP', step: (circleci.step+1)});
    },[circleci.info, circleci.step, dispatch]);

    const handleChangeDeploy = (_val,_touched,_errors,_onBlur,_onChange) => {
        let layer;

        if(_val.jobs_deploy_type === '01') {
            layer = <React.Fragment>
                        <Grid item xs={8}>
                            <FormText
                                id={"deploy_ssh_host"}
                                label={"SSH(HOST)"}
                                placeholder={"user@192.168.1.100"}
                                value={_val.deploy_ssh_host}
                                touched={_touched.deploy_ssh_host}
                                errors={_errors.deploy_ssh_host}
                                onBlur={_onBlur}
                                onChange={_onChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormText
                                id={"deploy_ssh_port"}
                                label={"SSH(PORT)"}
                                placeholder={"21"}
                                value={_val.deploy_ssh_port}
                                touched={_touched.deploy_ssh_port}
                                errors={_errors.deploy_ssh_port}
                                onBlur={_onBlur}
                                onChange={_onChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <FormText
                                id={"deploy_ssh_path"}
                                label={"Path(Deploy)"}
                                placeholder={"/home/tomcat/project"}
                                value={_val.deploy_ssh_path}
                                touched={_touched.deploy_ssh_path}
                                errors={_errors.deploy_ssh_path}
                                onBlur={_onBlur}
                                onChange={_onChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormText
                                id={"deploy_ssh_account"}
                                label={"Account(Deploy)"}
                                placeholder={"root"}
                                value={_val.deploy_ssh_account}
                                touched={_touched.deploy_ssh_account}
                                errors={_errors.deploy_ssh_account}
                                onBlur={_onBlur}
                                onChange={_onChange}
                            />
                        </Grid>
            </React.Fragment>
        } else if(_val.jobs_deploy_type === '02') {
            layer = <React.Fragment>
                <Grid item xs={4}>
                    <FormText
                        id={"deploy_aws_access"}
                        label={"AWS(ACCESS)"}
                        placeholder={"TEST7AAAAAAA23B4F"}
                        value={_val.deploy_aws_access}
                        touched={_touched.deploy_aws_access}
                        errors={_errors.deploy_aws_access}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormText
                        id={"deploy_aws_secret"}
                        label={"AWS(SECRET)"}
                        placeholder={"TEST7AAAAAAA23B4FTEST7AAAAAAA23B4F"}
                        value={_val.deploy_aws_secret}
                        touched={_touched.deploy_aws_secret}
                        errors={_errors.deploy_aws_secret}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormText
                        id={"deploy_aws_region"}
                        label={"AWS(REGION)"}
                        placeholder={"ap-northeast-2"}
                        value={_val.deploy_aws_region}
                        touched={_touched.deploy_aws_region}
                        errors={_errors.deploy_aws_region}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormText
                        id={"deploy_aws_cd_name"}
                        label={"CodeDeploy(NAME)"}
                        placeholder={"prd-project"}
                        value={_val.deploy_aws_cd_name}
                        touched={_touched.deploy_aws_cd_name}
                        errors={_errors.deploy_aws_cd_name}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormText
                        id={"deploy_aws_cd_group"}
                        label={"CodeDeploy(GROUP)"}
                        placeholder={"prd-project-group"}
                        value={_val.deploy_aws_cd_group}
                        touched={_touched.deploy_aws_cd_group}
                        errors={_errors.deploy_aws_cd_group}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <FormText
                        id={"deploy_ssh_path"}
                        label={"Path(Deploy)"}
                        placeholder={"/home/tomcat/project"}
                        value={_val.deploy_ssh_path}
                        touched={_touched.deploy_ssh_path}
                        errors={_errors.deploy_ssh_path}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormText
                        id={"deploy_ssh_account"}
                        label={"Account(Deploy)"}
                        placeholder={"root"}
                        value={_val.deploy_ssh_account}
                        touched={_touched.deploy_ssh_account}
                        errors={_errors.deploy_ssh_account}
                        onBlur={_onBlur}
                        onChange={_onChange}
                    />
                </Grid>
            </React.Fragment>
        }

        return layer;
    }

    return (
        <React.Fragment>
            <Formik
                innerRef={formRef}
                enableReinitialize
                initialValues={{
                    /* deploy */
                    jobs_deploy_type: _isEmpty(circleci.info.jobs_deploy_type) ? '01' : circleci.info.jobs_deploy_type,

                    deploy_ssh_host: _isEmpty(circleci.info.deploy_ssh_host) ? '' : circleci.info.deploy_ssh_host,
                    deploy_ssh_port: _isEmpty(circleci.info.deploy_ssh_port) ? '' : circleci.info.deploy_ssh_port,
                    deploy_ssh_path: _isEmpty(circleci.info.deploy_ssh_path) ? '' : circleci.info.deploy_ssh_path,
                    deploy_ssh_account: _isEmpty(circleci.info.deploy_ssh_account) ? '' : circleci.info.deploy_ssh_account,

                    deploy_aws_access: _isEmpty(circleci.info.deploy_aws_access) ? '' : circleci.info.deploy_aws_access,
                    deploy_aws_secret: _isEmpty(circleci.info.deploy_aws_secret) ? '' : circleci.info.deploy_aws_secret,
                    deploy_aws_region: _isEmpty(circleci.info.deploy_aws_region) ? '' : circleci.info.deploy_aws_region,
                    deploy_aws_cd_name: _isEmpty(circleci.info.deploy_aws_cd_name) ? '' : circleci.info.deploy_aws_cd_name,
                    deploy_aws_cd_group: _isEmpty(circleci.info.deploy_aws_cd_group) ? '' : circleci.info.deploy_aws_cd_group
                }}
                validationSchema={Yup.object().shape({
                    //s3_access: Yup.string().required('Please enter your s3 access information to upload.'),
                    //aws_region: Yup.string().required('Please enter your aws region information to deploy.'),
                    //aws_instance: Yup.string().required('Please enter your aws instance information to deploy.')
                })}
                onSubmit={(v) => {

                    // CircleCI Env Setting
                    v.deploy_ssh_host = _isEmpty(v.deploy_ssh_host) ? '$DEPLOY_SSH_HOST' : v.deploy_ssh_host;
                    v.deploy_ssh_port = _isEmpty(v.deploy_ssh_port) ? '$DEPLOY_SSH_PORT' : v.deploy_ssh_port;

                    v.deploy_aws_access = _isEmpty(v.deploy_aws_access) ? '$AWS_ACCESS_KEY' : v.deploy_aws_access;
                    v.deploy_aws_secret = _isEmpty(v.deploy_aws_secret) ? '$AWS_SECRET_KEY' : v.deploy_aws_secret;
                    v.deploy_aws_region = _isEmpty(v.deploy_aws_region) ? '$AWS_REGION' : v.deploy_aws_region;
                    v.deploy_aws_cd_name = _isEmpty(v.deploy_aws_cd_name) ? '$APPLICATION_NAME' : v.deploy_aws_cd_name;
                    v.deploy_aws_cd_group = _isEmpty(v.deploy_aws_cd_group) ? '$APPLICATION_GROUP' : v.deploy_aws_cd_group;

                    handleNext(v);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom spacing={2}>
                            Let's set up deploy first.
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
                                    <Chip icon={<Check />} label="DEPLOY" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormOption
                                    id={"jobs_deploy_type"}
                                    item={[{"value":"01", "label":"SSH"},{"value":"02", "label":"CodeDeploy(AWS)"}]}
                                    value={values.jobs_deploy_type}
                                    touched={touched.jobs_deploy_type}
                                    errors={errors.jobs_deploy_type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {handleChangeDeploy(values, touched, errors, handleBlur, handleChange)}
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

export default Jobs;
