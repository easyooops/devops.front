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
 * description  : Base layout page
 **/
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';
import BaseHeader from './BaseHeader';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        // paddingTop: 64
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'hidden'
    }
}));

const BaseLayout = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        <BaseHeader />
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseLayout;
