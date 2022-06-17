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
 * description  : devops ci/cd pipeline result
 **/
import {
    Grid, Typography, TextareaAutosize, Tab, Box
} from '@mui/material';
import {
    TabContext, TabList, TabPanel
} from '@mui/lab';
import { makeStyles } from '@mui/styles';
import React, {useCallback} from 'react';
import { _jsonToYaml} from "../../../lib/common";
import { config_cricleci, config_ant, config_start, config_stop} from "../../../lib/mod/conf/circleci";
import { config_code_deploy } from "../../../lib/mod/conf/codedeploy";
import { useDispatch, useSelector} from "react-redux";

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
    paper: {
        padding: theme.spacing(1),
        width: '100%',
        height: '300px',
        justifyContent : "center",
        overflow: 'auto',
        alignContent : "center"
    },
}));

const Result = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const circleci = useSelector((state) => state.cricleci);

    const handleChange = useCallback((e, v) => {
        dispatch({type:'CIRCLECI_CONFIG', config:v});
    },[dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom spacing={2}>
                Check out the results. That's easy, right?
            </Typography>
            <Grid container
                  spacing={4}
                  justifyContent="center"
                  alignItems="center"
            >
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={circleci.config}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="circleci" value="1" />
                                    <Tab label="ant" value="2" />
                                    <Tab label="cd(aws)" value="3" />
                                    <Tab label="stop" value="4" />
                                    <Tab label="start" value="5" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● .circleci/config.yml - This is the default configuration file for CircleCI.
                                </Typography>
                                <TextareaAutosize
                                    maxRows={20}
                                    variant="outlined"
                                    className={classes.paper}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    defaultValue={_jsonToYaml(config_cricleci(circleci.info))}
                                    style={{ width: '100%' }}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● build.xml - This is the configuration file used when building Ant.
                                </Typography>
                                <TextareaAutosize
                                    maxRows={20}
                                    variant="outlined"
                                    className={classes.paper}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    defaultValue={config_ant()}
                                    style={{ width: '100%' }}
                                />
                            </TabPanel>
                            <TabPanel value="3">
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● appspec.yml - This is the configuration file used by AWS CodeDeploy.
                                </Typography>
                                <TextareaAutosize
                                    maxRows={20}
                                    variant="outlined"
                                    className={classes.paper}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    defaultValue={_jsonToYaml(config_code_deploy(circleci.info))}
                                    style={{ width: '100%' }}
                                />
                            </TabPanel>
                            <TabPanel value="4">
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● scripts/stop.sh - This is a shell script file for stopping the application.
                                </Typography>
                                <TextareaAutosize
                                    maxRows={20}
                                    variant="outlined"
                                    className={classes.paper}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    defaultValue={config_stop()}
                                    style={{ width: '100%' }}
                                />
                            </TabPanel>
                            <TabPanel value="5">
                                <Typography variant="caption" display="block" gutterBottom>
                                    ● scripts/start.sh - This is a shell script file for starting the application.
                                </Typography>
                                <TextareaAutosize
                                    maxRows={20}
                                    variant="outlined"
                                    className={classes.paper}
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    defaultValue={config_start()}
                                    style={{ width: '100%' }}
                                />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                        ● That's it, let's check each config file once.
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Result;
