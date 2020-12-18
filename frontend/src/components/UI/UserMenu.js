import React, {useState} from 'react';
import { Button, Menu, MenuItem, Avatar, makeStyles } from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(1)
    }
}));

const UserMenu = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                color='inherit'
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                {user.avatar && <Avatar alt={user.displayName} src={user.avatar} className={classes.avatar}/>}
                Hello, {user && user.displayName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {user && user.role === 'admin' ? <MenuItem
                    component={NavLink}
                    to='/admin'
                    exact
                >
                    Админ-панель
                </MenuItem> : <MenuItem
                    component={NavLink}
                    to='/account'
                    exact
                >
                    Мои коктейли
                </MenuItem>}
                <MenuItem
                    component={NavLink}
                    to='/add-new-recipe'
                    exact
                >
                    Создать новый рецепт
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        dispatch(logoutUser())
                    }}
                >
                    Выход
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;