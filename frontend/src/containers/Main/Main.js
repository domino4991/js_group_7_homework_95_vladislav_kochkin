import React, {useEffect} from 'react';
import {
    Typography,
    makeStyles,
    Grid
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getCocktails} from "../../store/actions/cocktailsActions";
import CocktailItem from "../../components/CocktailItem/CocktailItem";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    cardGrid: {
        marginRight: '20px',
        marginBottom: '30px',
        '&:nth-child(4n)': {
            marginRight: 0
        }
    }
}))

const Main = () => {
    const classes = useStyles();
    const {cocktails, cocktailsError} = useSelector(state => state.cocktails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCocktails());
    }, [dispatch]);

    return (
        <>
            <Typography
                variant='h5'
                component='h2'
                className={classes.title}
                align='center'
            >Список рецептов коктелей</Typography>
            <Grid
                container
                direction='row'
                justify='center'
            >
                {cocktailsError && <Typography variant='body1' component='p'>{cocktailsError}</Typography>}
                {cocktails && cocktails.map(cocktail => cocktail.isPublished && <Grid
                    key={cocktail._id}
                    item
                    className={classes.cardGrid}
                >
                    <CocktailItem
                        cocktailName={cocktail.cocktailName}
                        cocktailImage={cocktail.cocktailImage}
                        id={cocktail._id}
                    />
                </Grid>)}
            </Grid>
        </>
    );
};

export default Main;