import React from 'react';
import {
    makeStyles,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box
} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {apiUrl} from "../../constants";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {setRatingCocktail} from "../../store/actions/cocktailsActions";

const useStyles = makeStyles(theme => ({
    gridHeader: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2)
    },
    img: {
        width: 'auto',
        maxWidth: '400px',
        height: 'auto',
        display: 'block',
        marginRight: theme.spacing(5)
    },
    gridContainer: {
        width: '700px',
        margin: '0 auto',
        boxShadow: '0 0 5px 1px rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '5px'
    },
    cocktailNameTitle: {
        marginBottom: theme.spacing(3),
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.2)',
        paddingBottom: theme.spacing(1)
    },
    list: {
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.2)',
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    cocktailRating: {
        marginBottom: theme.spacing(3),
    },
    titleRecipe: {
        marginTop: '10px'
    },
    cocktailDetail: {
        flexGrow: 1
    }
}));

const CocktailRecipeItem = ({
    cocktailImage,
    cocktailName,
    ingredients,
    recipe,
    rating,
    idCocktail
}) => {
    const classes = useStyles();
    const path = apiUrl + '/uploads/' + cocktailImage;
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    let userRating = rating && rating.find(score => score.user === user.username);
    if(!userRating) {
        userRating = {
            score: 0
        };
    }

    let totalRating = rating && rating.length !== 0 ? rating.reduce((acc, rating) => acc + rating.score, 0) / rating.length : '0';

    return (
        <Grid
            container
            direction='column'
            className={classes.gridContainer}
        >
            <Grid
                item
                className={classes.gridHeader}
            >
                <Grid
                    item
                >
                    <img
                        src={path}
                        className={classes.img}
                        alt={cocktailName}
                    />
                </Grid>
                <Grid
                    item
                    className={classes.cocktailDetail}
                >
                    <Typography
                        variant='h5'
                        component='h2'
                        className={classes.cocktailNameTitle}
                    >
                        {cocktailName}
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                        className={classes.cocktailRating}
                    >
                        Рейтинг рецепта: {totalRating}
                    </Typography>
                    <Typography
                        variant='body2'
                        component='p'
                        gutterBottom
                    >
                        Ингредиенты
                    </Typography>
                    <List className={classes.list}>
                        {ingredients && ingredients.map((ing, i) => <ListItem
                            key={i}
                        >
                            <ListItemText
                                primary={ing.ingName + ' --- ' + ing.ingAmount}
                            />
                        </ListItem>)}
                    </List>
                    <Box>
                        <Typography>
                            Поставьте оценку рецепту:
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={userRating.score}
                            onChange={(event, newValue) => {
                                dispatch(setRatingCocktail(idCocktail, {
                                    user: user.username,
                                    score: newValue
                                }))
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid
                item
            >
                <Divider />
                <Typography
                    variant='h6'
                    component='h6'
                    className={classes.titleRecipe}
                >
                    Рецепт:
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                >
                    {recipe}
                </Typography>
            </Grid>
        </Grid>
    );
};

CocktailRecipeItem.propTypes = {
    cocktailName: PropTypes.string.isRequired,
    cocktailImage: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    rating: PropTypes.array.isRequired,
    idCocktail: PropTypes.string.isRequired
};

export default CocktailRecipeItem;