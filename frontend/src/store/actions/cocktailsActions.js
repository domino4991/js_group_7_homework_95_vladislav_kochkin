import {
    CREATE_NEW_COCKTAIL,
    CREATE_NEW_COCKTAIL_ERROR,
    CREATE_NEW_COCKTAIL_SUCCESS,
    DELETE_COCKTAIL,
    DELETE_COCKTAIL_ERROR,
    DELETE_COCKTAIL_SUCCESS,
    GET_COCKTAIL_INFO,
    GET_COCKTAIL_INFO_ERROR,
    GET_COCKTAIL_INFO_SUCCESS,
    GET_COCKTAILS,
    GET_COCKTAILS_ERROR,
    GET_COCKTAILS_SUCCESS,
    GET_USERS_COCKTAILS,
    PUBLISH_COCKTAIL,
    PUBLISH_COCKTAIL_ERROR,
    PUBLISH_COCKTAIL_SUCCESS, SET_RATING_COCKTAIL, SET_RATING_COCKTAIL_ERROR,
    SET_RATING_COCKTAIL_SUCCESS
} from "../actionTypes";

export const createNewCocktailSuccess = () => ({type: CREATE_NEW_COCKTAIL_SUCCESS});
export const createNewCocktailError = error => ({type: CREATE_NEW_COCKTAIL_ERROR, error});
export const getCocktailsSuccess = data => ({type: GET_COCKTAILS_SUCCESS, data});
export const getCocktailsError = error => ({type: GET_COCKTAILS_ERROR, error});
export const getCocktailInfoSuccess = data => ({type: GET_COCKTAIL_INFO_SUCCESS, data});
export const getCocktailInfoError = error => ({type: GET_COCKTAIL_INFO_ERROR, error});
export const publishCocktailSuccess = () => ({type: PUBLISH_COCKTAIL_SUCCESS});
export const publishCocktailError = error => ({type: PUBLISH_COCKTAIL_ERROR, error});
export const deleteCocktailSuccess = () => ({type: DELETE_COCKTAIL_SUCCESS});
export const deleteCocktailError = error => ({type: DELETE_COCKTAIL_ERROR, error});
export const setRatingCocktailSuccess = () => ({type: SET_RATING_COCKTAIL_SUCCESS});
export const setRatingCocktailError = error => ({type: SET_RATING_COCKTAIL_ERROR, error});

export const createNewCocktail = data => ({type: CREATE_NEW_COCKTAIL, data});
export const getCocktails = () => ({type: GET_COCKTAILS});
export const getCocktailInfo = id => ({type: GET_COCKTAIL_INFO, id});
export const publishCocktail = id => ({type: PUBLISH_COCKTAIL, id});
export const deleteCocktail = id => ({type: DELETE_COCKTAIL, id});
export const getUsersCocktails = () => ({type: GET_USERS_COCKTAILS});
export const setRatingCocktail = (id, data) => ({type: SET_RATING_COCKTAIL, id, data});