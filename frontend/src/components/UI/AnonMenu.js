import React from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const AnonMenu = () => {
    return (
        <>
            <Button
                color='inherit'
                component={NavLink}
                to='/login'
                exact
            >
                Вход
            </Button>
        </>
    );
};

export default AnonMenu;