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
 * description  : common util
 **/
/* get windows session */
import YAML from "yaml";

export const _getSession = (_key) => {
    let rtn = window.sessionStorage.getItem(_key);
    if(_isEmpty(rtn)) {
        rtn = '';
    } else {
        rtn = JSON.parse(rtn);
    }
    return rtn;
}

/* set windows session */
export const _setSession = (_key, _val) => {
    _val = JSON.stringify(_val)
    return window.sessionStorage.setItem(_key, _val);
}

/* remove windows session */
export const _removeSession = (_key) => {
    return window.sessionStorage.removeItem(_key);
}

/* all remove windows session */
export const _clearSession = () => {
    return window.sessionStorage.clear();
}

/* null check */
export const _isEmpty = (_data) => {

    let rtn = false;

    if(_data === null) {                          // server side
        rtn = true;
    } else if(_data === undefined) {              // script
        rtn = true;
    } else if(_data === 'undefined') {            // script
        rtn = true;
    } else if(_data === '') {                     // string
        rtn = true;
    } else if(Object.keys(_data).length === 0) {  // json type
        rtn = true;
    }
    return rtn;
}

/* yaml to json */
export const _yamlToJson = (_yaml) => {
    let yaml_obj = YAML.parse(_yaml);
    let json_str = JSON.stringify(yaml_obj);
    return json_str;
}

/* json to yaml */
export const _jsonToYaml = (_json) => {
    // let json_obj = JSON.parse(_json);
    let yaml_str = YAML.stringify(_json);
    return yaml_str;
}

/* file download */
export const _fileDownload = (_name, _val) => {

    let ele = document.createElement('a');
    ele.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(_val));
    ele.setAttribute('download', _name);
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
}