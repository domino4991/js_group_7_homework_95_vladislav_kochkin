import React from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Button,
    CardActions,
    makeStyles
} from "@material-ui/core";
import {apiUrl} from "../../constants";
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    img: {
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        objectFit: 'cover'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    imgBox: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    }
});

const CocktailItem = ({cocktailName, cocktailImage, id}) => {
    const classes = useStyles();
    const imgPath = apiUrl + '/uploads/' + cocktailImage;
    return (
        <Card className={classes.root}>
            <CardActionArea
                component={NavLink}
                to={`/cocktail/${id}`}
                className={classes.content}
            >
                <div className={classes.imgBox}>
                    <CardMedia
                        component="img"
                        alt={cocktailName}
                        image={imgPath}
                        title={cocktailName}
                        className={classes.img}
                    />
                </div>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {cocktailName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    color="primary"
                    component={NavLink}
                    to={`/cocktail/${id}`}
                    variant='contained'
                    size='small'
                >
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
};

CocktailItem.propTypes = {
    cocktailName: PropTypes.string.isRequired,
    cocktailImage: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default CocktailItem;