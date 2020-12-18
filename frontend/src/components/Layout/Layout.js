import React from 'react';
import HeaderAppBar from "../HeaderAppBar/HeaderAppBar";
import {Container, CssBaseline} from '@material-ui/core';

const Layout = (props) => {
    return (
        <>
            <HeaderAppBar />
            <main>
                <CssBaseline />
                <Container>
                    {props.children}
                </Container>
            </main>
        </>
    );
};

export default Layout;