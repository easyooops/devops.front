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
 * description  : redux Action
 **/
import { _ajaxPostJsonAsync } from "../../axios/axios";
import {
    SAMPLE_ADD,
    SAMPLE_DEL,
    SAMPLE_FAIL,
    SAMPLE_GET,
    SAMPLE_GET_INFO,
    SAMPLE_UPD
} from "../types";

/* api path */
const API_PATH = "/api/v1/";

/* list */
export const getSample = async (body) => {
    body['limit'] = '1000';
    return await _ajaxPostJsonAsync("post", API_PATH+"/search/", body, SAMPLE_GET, SAMPLE_FAIL);
}

/* select */
export const getSampleInfo = async (body) => {
    body['limit'] = '1';
    return await _ajaxPostJsonAsync("post", API_PATH+"/search/", body, SAMPLE_GET_INFO, SAMPLE_FAIL);
}

/* insert */
export const addSample = async (d) => {
    return await _ajaxPostJsonAsync("post", API_PATH+"/", d, SAMPLE_ADD, SAMPLE_FAIL);
}

/* update */
export const updSample = async (d) => {
    return await _ajaxPostJsonAsync("put", API_PATH+"/"+d, d, SAMPLE_UPD, SAMPLE_FAIL);
}

/* delete */
export const delSample = async (d) => {
    return await _ajaxPostJsonAsync("delete", API_PATH+"/"+d, d, SAMPLE_DEL, SAMPLE_FAIL);
}