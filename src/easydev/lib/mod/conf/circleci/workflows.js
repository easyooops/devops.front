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
 * description  : CircleCI workflows define
 **/

/* workflows >> main */
import {_isEmpty} from "../../../common";

export const workflows_main = (_in) => {

    let jsonJobs = {};
    jsonJobs['version'] = 2;

    if(!_isEmpty(_in.wp_develop_name)) {
        jsonJobs['develop'] = workflows_jobs_main('01', _in);
    }

    if(!_isEmpty(_in.git_release_name)) {
        jsonJobs['staging'] = workflows_jobs_main('02', _in);
    }

    if(!_isEmpty(_in.git_master_name)) {
        jsonJobs['production'] = workflows_jobs_main('03', _in);
    }

    return jsonJobs;
}

/* workflows >> jobs >> main */
export const workflows_jobs_main = (_type, _in) => {

    let jsonJobs = {};
    let jsonArr = [];

    // temp data config
    if(_type === '01') {         // develop
        jsonArr.push(workflows_jobs_build(_in.wp_develop_name, _in.wp_develop_env));
        if(_in.jobs_test_used === '01') {
            jsonArr.push(workflows_jobs_test());
        }
        jsonArr.push(workflows_jobs_upload(_in.jobs_test_used, _in.wp_develop_env));
        jsonArr.push(workflows_jobs_deploy(_in.jobs_test_used, _in.wp_develop_env));
    } else if(_type === '02') {  // release
        jsonArr.push(workflows_jobs_build(_in.wp_release_name, _in.wp_release_env));
        jsonArr.push(workflows_jobs_upload(_in.jobs_test_used, _in.wp_release_env));
        jsonArr.push(workflows_jobs_hold(_in.jobs_test_used));
        jsonArr.push(workflows_jobs_deploy(_in.jobs_test_used, _in.wp_release_env));
    } else if(_type === '03') {  // master
        jsonArr.push(workflows_jobs_build(_in.wp_master_name, _in.wp_master_env));
        jsonArr.push(workflows_jobs_upload(_in.jobs_test_used, _in.wp_master_env));
        jsonArr.push(workflows_jobs_hold(_in.jobs_test_used));
        jsonArr.push(workflows_jobs_deploy(_in.jobs_test_used, _in.wp_master_env));
    }

    jsonJobs['jobs'] = jsonArr;
    return jsonJobs;
}

/* workflows >> jobs >> build */
export const workflows_jobs_build = (_name, _env) => {

    let jsonObj = {};
    let jsonFilters = {};
    let jsonBranches = {};
    let jsonOnly = {};

    jsonOnly['only'] = _name;
    jsonBranches['branches'] = jsonOnly;
    if(!_isEmpty(_env)) {
        jsonFilters['context'] = _env;
    }
    jsonFilters['filters'] = jsonBranches;

    jsonObj['build'] = jsonFilters;

    return jsonObj;
};

/* workflows >> jobs >> test */
export const workflows_jobs_test = () => {

    let jsonObj = {};
    let jsonRequires = {};
    let jsonBuild = [];

    jsonBuild.push('build');
    jsonRequires['requires'] = jsonBuild;
    jsonObj['test'] = jsonRequires;

    return jsonObj;
};

/* workflows >> jobs >> upload */
export const workflows_jobs_upload = (_type, _env) => {

    let jsonObj = {};
    let jsonRequires = {};
    let jsonBuild = [];

    jsonBuild.push('build');
    if(_type === '01') {
        jsonBuild.push('test');
    }
    if(!_isEmpty(_env)) {
        jsonRequires['context'] = _env;
    }
    jsonRequires['requires'] = jsonBuild;
    jsonObj['upload'] = jsonRequires;

    return jsonObj;
};

/* workflows >> jobs >> hold */
export const workflows_jobs_hold = (_type) => {

    let jsonObj = {};
    let jsonRequires = {};
    let jsonBuild = [];

    jsonRequires['type'] = 'approval';
    jsonBuild.push('build');
    if(_type === '01') {
        jsonBuild.push('test');
    }
    jsonRequires['requires'] = jsonBuild;

    jsonObj['hold'] = jsonRequires;

    return jsonObj;
};

/* workflows >> jobs >> deploy */
export const workflows_jobs_deploy = (_type, _env) => {

    let jsonObj = {};
    let jsonRequires = {};
    let jsonBuild = [];

    jsonBuild.push('build');
    if(_type === '01') {
        jsonBuild.push('test');
    }
    jsonBuild.push('upload');
    if(!_isEmpty(_env)) {
        jsonRequires['context'] = _env;
    }
    jsonRequires['requires'] = jsonBuild;

    jsonObj['deploy'] = jsonRequires;

    return jsonObj;
};