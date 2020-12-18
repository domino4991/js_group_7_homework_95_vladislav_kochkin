import React, {useState} from 'react';
import {Typography, makeStyles, Button} from "@material-ui/core";
import FormElement from "../../components/UI/FormElement/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    form: {
        maxWidth: '400px',
        margin: '0 auto'
    }
}));

const Login = () => {
    const classes = useStyles();
    const {cocktailsError} = useSelector(state => state.cocktails);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const getFieldError = fieldName => {
        try {
            return cocktailsError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
        setUser({
            username: '',
            password: ''
        });
    }

    return (
        <>
            <Typography
                variant='h5'
                component='h5'
                align='center'
                className={classes.title}
            >
                Вход
            </Typography>
            <form
                onSubmit={e => onSubmittedForm(e)}
                className={classes.form}
            >
                <FormElement
                    label='Логин'
                    name='username'
                    type='text'
                    value={user.username}
                    changed={e => onChangeField(e)}
                    error={getFieldError('username')}
                />
                <FormElement
                    label='Пароль'
                    name='password'
                    type='password'
                    value={user.password}
                    changed={e => onChangeField(e)}
                    error={getFieldError('password')}
                />
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Вход
                </Button>
                <Typography
                    variant='body1'
                    component='p'
                    style={{margin: '15px 0'}}
                >
                    Или войти с помощью Facebook
                </Typography>
                <FacebookLogin />
            </form>
        </>
    );
};

export default Login;