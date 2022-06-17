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
 * description  : CodeDeploy(AWS) define
 **/

/* Root */
export const config_code_deploy = (_in) => {

    let root = {};

    root['version'] = 0.0;
    root['os'] = 'linux';
    root['files'] = config_file(_in);
    root['file_exists_behavior'] = 'OVERWRITE';
    root['permissions'] = config_permissions(_in);
    root['hooks'] = config_hook(_in);

    return root;
};

/* Node File */
export const config_file = (_in) => {

    let node = {};
    let arr = [];

    node['source'] = '/dist';
    node['destination'] = _in.deploy_ssh_path;
    node['overwrite'] = 'yes';

    arr.push(node);

    return arr;
};

/* Node File */
export const config_permissions = (_in) => {

    let node = {};
    let arr = [];
    let sub_node = '';
    let sub_arr = [];

    node['object'] = _in.deploy_ssh_path;
    node['pattern'] = "*.war";
    node['owner'] = _in.deploy_ssh_account;
    node['group'] = _in.deploy_ssh_account;
    node['mode'] = 744;
    sub_node = 'file';
    sub_arr.push(sub_node);
    node['type'] = sub_arr;

    arr.push(node);

    return arr;
};

/* Node File */
export const config_hook = (_in) => {

    let node = {};
    let arr = [];

    node['ApplicationStop'] = config_stop(_in);
    node['ApplicationStart'] = config_start(_in);
    // node['ValidateService'] = config_vaildate(_in);

    arr.push(node);

    return arr;
};

/* Node File */
export const config_stop = (_in) => {

    let node = {};
    let arr = [];

    node['location'] = 'scripts/stop.sh';
    node['timeout'] = 60;
    node['runas'] = _in.deploy_ssh_account;

    arr.push(node);

    return arr;
};

/* Node File */
export const config_start = (_in) => {

    let node = {};
    let arr = [];

    node['location'] = 'scripts/start.sh';
    node['timeout'] = 60;
    node['runas'] = _in.deploy_ssh_account;

    arr.push(node);

    return arr;
};

/* Node File */
export const config_vaildate = (_in) => {

    let node = {};
    let arr = [];

    node['location'] = 'scripts/health.sh';
    node['timeout'] = 60;
    node['runas'] = _in.deploy_ssh_account;

    arr.push(node);

    return arr;
};