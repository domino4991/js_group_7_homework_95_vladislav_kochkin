import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";
import Main from "./containers/Main/Main";
import CreateCocktail from "./containers/CreateCocktail/CreateCocktail";
import CocktailRecipeInfo from "./containers/CocktailRecipeInfo/CocktailRecipeInfo";
import MyCocktails from "./containers/MyCocktails/MyCocktails";
import Login from "./containers/Login/Login";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
    return (
        <Layout>
            <ToastContainer autoClose={4000} />
            <Switch>
                <Route path='/' exact component={Main} />
                <ProtectedRoute
                    isAllowed={user}
                    path='/add-new-recipe'
                    exact
                    component={CreateCocktail}
                    redirectTo='/'
                />
                <ProtectedRoute
                    isAllowed={!user}
                    path='/login'
                    exact
                    component={Login}
                    redirectTo='/'
                />
                <ProtectedRoute
                    isAllowed={user}
                    path='/account'
                    exact
                    component={MyCocktails}
                    redirectTo='/'
                />
                <ProtectedRoute
                    isAllowed={user && user.role === 'admin'}
                    path='/admin'
                    exact
                    component={MyCocktails}
                    redirectTo='/'
                />
                <Route path='/cocktail/:id' component={CocktailRecipeInfo} />
                <Route render={() => <h1 style={{textAlign: 'center'}}>404 Page Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default Routes;