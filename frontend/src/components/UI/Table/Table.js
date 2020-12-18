import React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {IconButton, makeStyles, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {deleteCocktail, publishCocktail} from "../../../store/actions/cocktailsActions";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        height: '300px',
        width: '100%'
    },
    table: {
        backgroundColor: '#fafafa',
        border: 'none',
        boxShadow: '0 0 7px 1px rgba(38, 50, 56, 0.2)'
    },
    iconBtn: {
        marginRight: '20px'
    }
}));

const Table = ({cocktails}) => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    let noCocktailsUser = null;

    user && user.role !== 'admin' && cocktails.map(cocktail => {
        if(cocktail.user.username !== user.username) {
            noCocktailsUser = 1;
        } else {
            noCocktailsUser = null;
        }
        return cocktail;
    });

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 250,
            hide: true
        },
        {
            field: 'cocktailName',
            headerName: 'Название коктейля',
            width: 250
        },
        {
            field: 'publish',
            headerName: 'Статус',
            width: 200
        },
    ];

    if(user.role === 'admin') {
        columns.push({
            field: 'author',
            headerName: 'Автор',
            width: 200
        }, {
            field: 'options',
            headerName: 'Опции',
            width: 300,
            renderCell: (params) => (
                <>
                    <IconButton
                        size="medium"
                        onClick={() => dispatch(publishCocktail(params.row.id))}
                        color="primary"
                        className={classes.iconBtn}
                    >
                        {
                            params.row.publish === 'Опубликован' ? <VisibilityOffIcon /> : <VisibilityIcon />
                        }
                    </IconButton>
                    <IconButton
                        size="medium"
                        onClick={() => dispatch(deleteCocktail(params.row.id))}
                        color="secondary"
                        className={classes.iconBtn}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                    <Button
                        variant='contained'
                        color='inherit'
                        component={NavLink}
                        to={`/cocktail/${params.row.id}`}
                        size='small'
                    >
                        Посмотреть
                    </Button>
                </>
            ),
        });
    }

    if(user && user.role === 'user') {
        columns.push({
            field: 'options',
            headerName: 'Опции',
            width: 300,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='inherit'
                    component={NavLink}
                    to={`/cocktail/${params.row.id}`}
                    size='small'
                >
                    Посмотреть
                </Button>
            ),
        })
    }

    const rows = cocktails && user && user.role === 'admin' ? cocktails.map(cocktail => ({
        id: cocktail._id,
        cocktailName: cocktail.cocktailName,
        publish: cocktail.isPublished ? 'Опубликован' : 'Не опубликован',
        author: cocktail.user.displayName
    })) : cocktails.map(cocktail => ({
        id: cocktail._id,
        cocktailName: cocktail.cocktailName,
        publish: cocktail.isPublished ? 'Опубликован' : 'Не опубликован',
    }));

    return (
        <div className={classes.root}>
            {!noCocktailsUser ?
                <DataGrid
                    columns={columns.map(column => ({
                        ...column,
                        disableClickEventBubbling: true
                    }))}
                    rows={rows}
                    autoHeight
                    pageSize={25}
                    className={classes.table}
                /> : null
            }
        </div>
    );
};

export default Table;