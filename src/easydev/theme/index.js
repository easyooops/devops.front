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
 * description  : theme css index
 **/
import { colors } from '@mui/material';
import { createTheme  } from '@mui/material/styles';
import typography from './typography';
import shadows from './shadows';

const theme = createTheme ({
    palette: {
        background: {
            // dark: '#F4F6F8',
            default: colors.common.white,
            paper: colors.common.white
        },
        primary: {
            main: colors.indigo[500]
        },
        secondary: {
            main: colors.red[500]
        },
        success: {
            main: colors.green['A400']
        },
        text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600]
        }
    },
    overrides: {
        MuiTab: {
            root: {
                width: 130
            },
        },
        MuiTextField: {
            root: {
                fontSize: 12
            },
        },
        MuiInputBase: {
            root: {
                fontSize: 12
            }
        },
        MuiInputLabel: {
            shrink: {
                fontSize: 12,
                color: colors.green[900]
            },
            root: {
                fontSize: 12,
                color: colors.green[900]
            },
        },
        MuiSelect: {
            root: {
                fontSize: 12,
            },
        },
        MuiFormLabel: {
            root: {
                fontSize: 12,
                color: colors.green[900]
            },
        },
        MuiFormControlLabel: {
            label: {
                fontSize: 12,
                color: colors.green[900]
            },
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: 1200
            }
        },
        MuiCardMedia: {
            root: {
                width: '100%'
            }
        },
        MuiCardHeader: {
            root: {
                padding: 0,
                alignItems: 'flex-start',
            },
            title: {
                fontSize: 10,
                color: colors.deepOrange[900]
            },
            action: {
                fontSize: 10,
                marginTop: 0,
                marginRight: 4,
                color: colors.deepOrange[900]
            }
        },
    },
    shadows,
    typography
});

export default theme;