import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Typography} from "@material-ui/core";
import {getCocktailInfo} from "../../store/actions/cocktailsActions";
import CocktailRecipeItem from "../../components/CocktailRecipeItem/CocktailRecipeItem";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3)
    }
}));

const CocktailRecipeInfo = (props) => {
    const classes = useStyles();
    const {cocktail} = useSelector(state => state.cocktails);
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getCocktailInfo(id));
    }, [dispatch, id]);

    return (
        <div>
            <Typography
                variant='h5'
                component='h5'
                className={classes.title}
                align='center'
            >
                Cocktail Recipe
            </Typography>
            {cocktail && <CocktailRecipeItem
                cocktailName={cocktail.cocktailName}
                cocktailImage={cocktail.cocktailImage}
                ingredients={cocktail.ingredients}
                recipe={cocktail.recipe}
                rating={cocktail.rating}
                idCocktail={id}
            />}
        </div>
    );
};

export default CocktailRecipeInfo;