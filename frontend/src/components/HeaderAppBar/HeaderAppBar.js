import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import AnonMenu from "../UI/AnonMenu";
import UserMenu from "../UI/UserMenu";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3),
        backgroundColor: '#37474f',
        color: '#e8eaf6'
    },
    title: {
        flexGrow: 1,
    },
}));

const HeaderAppBar = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Рецепты коктелей
                </Typography>
                <Button
                    color='inherit'
                    component={NavLink}
                    to='/'
                    exact
                >
                    Home
                </Button>
                {!user ?
                    <AnonMenu />
                    :
                    <UserMenu />
                }
            </Toolbar>
        </AppBar>
    );
};

export default HeaderAppBar;