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
 * description  : circleci redux store
 **/
import {
    CIRCLECI_ADD,
    CIRCLECI_DEL,
    CIRCLECI_FAIL,
    CIRCLECI_GET,
    CIRCLECI_GET_INFO,
    CIRCLECI_UPD,
    CIRCLECI_STEP,
    CIRCLECI_CONFIG
} from "../types";
import { _isEmpty } from "./../../common";

// init
const initialState = {
    rows:[],
    info:{},
    step: 0,
    config: "1",
    isEdit: false
};
// store status
const reducers = (state = initialState, action) => {
    switch (action.type) {
        case CIRCLECI_GET:         // get list
            return {
                ...state,
                rows: action.payload
            };
        case CIRCLECI_GET_INFO:    // get info
            return {
                ...state,
                info: action.payload,
                isEdit: _isEmpty(action.payload) ? false : true
            };
        case CIRCLECI_ADD:         // inset
            return {
                ...state,
                info: action.payload,
                isOpen: false,
                isEdit: _isEmpty(action.payload) ? false : true
            };
        case CIRCLECI_UPD:         // update
            return {
                ...state,
                info: action.payload,
                isOpen: false,
                isEdit: _isEmpty(action.payload) ? false : true
            };
        case CIRCLECI_DEL:         // delete
            return {
                ...state
            };
        case CIRCLECI_STEP:         // step
            return {
                ...state,
                step : action.step
            };
        case CIRCLECI_CONFIG:         // config
            return {
                ...state,
                config : action.config
            };
        case CIRCLECI_FAIL:        // fail
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default reducers;