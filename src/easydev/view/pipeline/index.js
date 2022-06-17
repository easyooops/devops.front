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
 * description  : devops ci/cd pipeline select
 **/
import {
    Grid, Typography, ToggleButtonGroup, ToggleButton, Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { _isEmpty } from "../../lib/common";

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const handleLink = (_url) => {
    window.open(_url);
};

const Start = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const handleInit = useCallback(() => {
        let payload = {};
        if (!circleci.info.hasOwnProperty('tool_type')) {
            payload['tool_type'] = '01';
            dispatch({
                type:'CIRCLECI_GET_INFO',
                payload: payload
            });
        }
    },[circleci.info, dispatch]);

    useEffect(() => {
        handleInit();
    }, [handleInit]);
    
    const handleChange = useCallback((e, v) => {
        let payload = {}
        if (!_isEmpty(v)) {
            if(v === '01') {
                payload['tool_type'] = v;
                dispatch({
                    type:'CIRCLECI_GET_INFO',
                    payload: payload
                });
            } else if(v === '02') {
                handleReady();
            }
        }
    },[dispatch]);

    const handleReady = () => {
        alert('Sorry, It is working.');
    };

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom spacing={2}>
                What DevOps tools will you use?
            </Typography>
            <Grid container
                  className={classes.root}
                  marginTop={1}
                  spacing={4}
                  justifyContent="center"
                  alignItems="center"
            >
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={5}>
                    <ToggleButtonGroup
                        color="primary"
                        value={circleci.info.tool_type}
                        exclusive
                        size={"large"}
                        onChange={handleChange}
                    >
                        <ToggleButton value="01">CircleCI</ToggleButton>
                        <ToggleButton value="02">Jenkins</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                        ● CircleCI - There is a cost to use the service. It provides easy UI/UX. <Button onClick={() => handleLink('https://circleci.com/')} >[Go CircleCI]</Button>
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        ● Jenkins - You need a server to use it. Jenkins must be installed on the server. Expansion is advantageous. <Button onClick={() => handleLink('https://www.jenkins.io/')} >[Go Jenkins]</Button>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Start;
