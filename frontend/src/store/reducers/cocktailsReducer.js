import {
    CREATE_NEW_COCKTAIL_ERROR,
    CREATE_NEW_COCKTAIL_SUCCESS,
    DELETE_COCKTAIL_ERROR,
    DELETE_COCKTAIL_SUCCESS,
    GET_COCKTAIL_INFO_ERROR,
    GET_COCKTAIL_INFO_SUCCESS,
    GET_COCKTAILS_ERROR,
    GET_COCKTAILS_SUCCESS,
    PUBLISH_COCKTAIL_ERROR,
    PUBLISH_COCKTAIL_SUCCESS, SET_RATING_COCKTAIL_ERROR, SET_RATING_COCKTAIL_SUCCESS
} from "../actionTypes";

const initialState = {
    cocktails: null,
    cocktail: null,
    cocktailsError: null
};

export const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COCKTAILS_SUCCESS:
            return {
                ...state,
                cocktails: action.data,
                cocktailsError: null
            };
        case GET_COCKTAIL_INFO_SUCCESS:
            return {
                ...state,
                cocktail: action.data,
                cocktailsError: null
            };
        case CREATE_NEW_COCKTAIL_SUCCESS:
        case PUBLISH_COCKTAIL_SUCCESS:
        case DELETE_COCKTAIL_SUCCESS:
        case SET_RATING_COCKTAIL_SUCCESS:
            return {
                ...state,
                cocktailsError: null
            };
        case DELETE_COCKTAIL_ERROR:
        case PUBLISH_COCKTAIL_ERROR:
        case GET_COCKTAILS_ERROR:
        case CREATE_NEW_COCKTAIL_ERROR:
        case GET_COCKTAIL_INFO_ERROR:
        case SET_RATING_COCKTAIL_ERROR:
            return {
                ...state,
                cocktailsError: action.error
            };
        default:
            return state;
    }
};