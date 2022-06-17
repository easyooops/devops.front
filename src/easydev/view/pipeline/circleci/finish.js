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
 * description  : CircleCI Guide (Finished)
 **/
import {
    Button, Box, Typography, Grid, Chip
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector} from "react-redux";
import {Check} from "@mui/icons-material";
import {_jsonToYaml} from "../../../lib/common";
import {config_ant, config_cricleci, config_start, config_stop} from "../../../lib/mod/conf/circleci";
import {config_code_deploy} from "../../../lib/mod/conf/codedeploy";
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const handleLink = (_url) => {
    window.open(_url);
};

const handleHome = () => {
    window.location.href = '/';
};

const Finished = () => {
    const classes = useStyles();

    const circleci = useSelector((state) => state.cricleci);

    const handleDownload = () => {

        const zip = new JSZip();

        zip.folder(".circleci").file('config.yml', _jsonToYaml(config_cricleci(circleci.info)));
        zip.folder("").file('appspec.yml', _jsonToYaml(config_code_deploy(circleci.info)));
        zip.folder("").file('build.xml', config_ant());
        zip.folder("scripts").file('stop.sh', config_stop());
        zip.folder("scripts").file('start.sh', config_start());

        zip.generateAsync({type:"blob"})
            .then((resZip) => {
                saveAs(resZip, "EasyOops.zip");
            });
    };

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Thank you. How was it? Shall we check if it works now?
            </Typography>
            <Grid container
                  className={classes.root}
                  marginTop={1}
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography variant="h4" color={"darkblue"} spacing={1} gutterBottom>
                        <Chip icon={<Check />} label="First" />
                    </Typography>
                    <Typography variant="h5" display="block" gutterBottom>
                        ● Let's push the files we set up so far to the repository (GIT).
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <Button variant="contained" color={"info"} size={"small"} onClick={handleDownload} >Config Download</Button>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" color={"darkblue"} spacing={1} gutterBottom>
                        <Chip icon={<Check />} label="Second" />
                    </Typography>
                    <Typography variant="h5" display="block" gutterBottom>
                        ● Now, let's set up some settings on the site (CircleCI). that's very easy.
                    </Typography>
                    <Typography variant="h6" display="block" gutterBottom>
                         1. Let's go to the site (CircleCI) and create and set basic settings.<Button color={"info"} size={"small"} onClick={() => handleLink('https://circleci.com/docs/2.0/getting-started/')} >[guide]</Button>
                    </Typography>
                    <Typography variant="h6" display="block" gutterBottom>
                         2. If you are using CodeDeploy (AWS), let's configure additional settings.<Button color={"info"} size={"small"} onClick={() => handleLink('https://circleci.com/docs/2.0/deployment-examples/#aws')} >[guide]</Button>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" color={"darkblue"} spacing={1} gutterBottom>
                        <Chip icon={<Check />} label="Third" />
                    </Typography>
                    <Typography variant="h5" display="block" gutterBottom>
                        ● If you are using CodeDeploy (AWS), let's add some settings below. that's very easy.<Button color={"info"} size={"small"} onClick={() => handleLink('https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-codedeploy.html')} >[guide]</Button>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" color={"darkblue"} spacing={1} gutterBottom>
                        <Chip icon={<Check />} label="Finished" />
                    </Typography>
                    <Typography variant="h5" display="block" gutterBottom>
                        ● Done!! Now push your source to the repository (GIT), merge and check. If not, should I study more? ^^.
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        onClick={handleHome}
                >
                    Try Again
                </Button>
                <Button variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        onClick={() => handleLink('https://www.opsnow.com/')}
                >
                    OpsNow
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default Finished;
