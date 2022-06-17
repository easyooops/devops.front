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
 * description  : CircleCI defaults define
 **/
/* defaults >> main */
export const defaults_main = () => {

    let jsonJobs = {};

    jsonJobs['docker'] = defaults_docker('easyooops/easy_oops:0.1');
    jsonJobs['environment'] = defaults_environment();
    jsonJobs['working_directory'] = '~/projects';
    jsonJobs['resource_class'] = 'large';

    return jsonJobs;
}

/* defaults >> docker */
export const defaults_docker = (_in) => {

    let jsonObj = {};
    let jsonArr = [];

    jsonObj['image'] = _in;
    jsonArr.push(jsonObj);

    return jsonArr;
};

/* defaults >> environment */
export const defaults_environment = () => {

    let jsonObj = {};

    jsonObj['JVM_OPTS'] = '-Xmx4096m';
    jsonObj['TERM'] = 'dumb';

    return jsonObj;
};
