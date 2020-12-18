import React, {useState} from 'react';
import {makeStyles, Typography, Grid, Chip, Button} from "@material-ui/core";
import FormElement from "../../components/UI/FormElement/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {createNewCocktail} from "../../store/actions/cocktailsActions";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    gridIng: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3)
    },
    form: {
        width: '500px',
        margin: '0 auto',
        textAlign: 'right',
        marginBottom: '100px',
        backgroundColor: '#e8eaf6',
        padding: '20px',
        borderRadius: '10px'
    },
    ingName: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    },
    ingLabel: {
        marginRight: theme.spacing(2),
        color: '#000'
    },
    chip: {
        marginBottom: '10px',
        marginRight: '5px'
    }
}));

const CreateCocktail = () => {
    const classes = useStyles();
    const {cocktailsError} = useSelector(state => state.cocktails);
    const dispatch = useDispatch();

    const [newCocktail, setNewCocktail] = useState({
        cocktailName: '',
        recipe: '',
        cocktailImage: '',
        ingredients: [],
        ingName: '',
        ingAmount: ''
    });

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewCocktail(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangeFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setNewCocktail(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const getFieldError = fieldName => {
        try {
            return cocktailsError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const addIngredients = () => {
        if(newCocktail.ingName !== '' && newCocktail.ingAmount !== '') {
            setNewCocktail(prevState => ({
                ...prevState,
                ingredients: [
                    ...prevState.ingredients,
                    {ingName: newCocktail.ingName, ingAmount: newCocktail.ingAmount}
                ],
                ingName: '',
                ingAmount: ''
            }));
        }
    };

    const deleteIngredients = i => {
        const ingred = [...newCocktail.ingredients];
        ingred.splice(i, 1);
        setNewCocktail(prevState => ({
            ...prevState,
            ingredients: ingred
        }));
    }

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newCocktail).forEach(key => {
            if(key !== 'ingName' && key !== 'ingAmount') {
                if(key === 'ingredients') {
                    formData.append(key, JSON.stringify(newCocktail[key]));
                } else {
                    formData.append(key, newCocktail[key]);
                }
            }
        });
        dispatch(createNewCocktail(formData));
        setNewCocktail(prevState => ({
            ...prevState,
            cocktailName: '',
            cocktailImage: '',
            recipe: '',
            ingredients: []
        }));
    }

    return (
        <>
            <Typography
                variant='h5'
                component='h5'
                className={classes.title}
                align='center'
            >
                Создание нового рецепта
            </Typography>
            <form
                onSubmit={e => onSubmittedForm(e)}
                className={classes.form}
            >
                <FormElement
                    label='Название'
                    changed={onChangeField}
                    value={newCocktail.cocktailName}
                    name='cocktailName'
                    type='text'
                    error={getFieldError('cocktailName')}
                    required
                />
                <FormElement
                    label='Рецепт'
                    changed={onChangeField}
                    value={newCocktail.recipe}
                    name='recipe'
                    multiline={true}
                    rows={8}
                    type='text'
                    error={getFieldError('recipe')}
                    required
                />
                <Grid
                    container
                    direction='row'
                    justify='space-between'
                >
                    <Grid
                        item
                        className={classes.ingName}
                    >
                        <FormElement
                            label='Название ингредиента'
                            changed={onChangeField}
                            value={newCocktail.ingName}
                            name='ingName'
                            type='text'
                            error={getFieldError('ingredients')}
                        />
                    </Grid>
                    <Grid item>
                        <FormElement
                            label='Количество'
                            changed={onChangeField}
                            value={newCocktail.ingAmount}
                            name='ingAmount'
                            type='text'
                            error={getFieldError('ingredients')}
                        />
                    </Grid>
                </Grid>
                <Button
                    variant='contained'
                    onClick={() => addIngredients()}
                    fullWidth
                >
                    Добавить ингредиент
                </Button>
                <Grid container className={classes.gridIng}>
                    <Typography className={classes.ingLabel}>
                        Ингредиенты:
                    </Typography>
                    <Grid item>
                        {newCocktail.ingredients.map((ing, i) => <Chip
                            key={i}
                            label={ing.ingName + ' - ' + ing.ingAmount}
                            onDelete={() => deleteIngredients(i)}
                            classes={{
                                root: classes.chip
                            }}
                        />)}
                    </Grid>
                </Grid>
                <FormElement
                    label='Изображение'
                    changedFile={e => onChangeFile(e)}
                    value={newCocktail.cocktailImage}
                    name='cocktailImage'
                    type='file'
                    error={getFieldError('cocktailImage')}
                    required
                />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Создать рецепт
                </Button>
            </form>
        </>
    );
};

export default CreateCocktail;