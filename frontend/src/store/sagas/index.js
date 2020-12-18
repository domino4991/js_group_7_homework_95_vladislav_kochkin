import {takeEvery} from 'redux-saga/effects';
import {
    CREATE_NEW_COCKTAIL, DELETE_COCKTAIL,
    GET_COCKTAIL_INFO,
    GET_COCKTAILS, GET_USERS_COCKTAILS,
    LOGIN_USER,
    LOGOUT_USER,
    PUBLISH_COCKTAIL, SET_RATING_COCKTAIL
} from "../actionTypes";
import {loginUserSaga, logoutUserSaga} from "./users";
import {
    createNewCocktailSaga,
    deleteCocktailSaga,
    getCocktailInfoSaga,
    getCocktailsSaga, getUsersCocktailsSaga,
    publishCocktailSaga, setRatingCocktailSaga
} from "./cocktails";

export function* rootSaga() {
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
    yield takeEvery(CREATE_NEW_COCKTAIL, createNewCocktailSaga);
    yield takeEvery(GET_COCKTAILS, getCocktailsSaga);
    yield takeEvery(GET_USERS_COCKTAILS, getUsersCocktailsSaga);
    yield takeEvery(GET_COCKTAIL_INFO, getCocktailInfoSaga);
    yield takeEvery(PUBLISH_COCKTAIL, publishCocktailSaga);
    yield takeEvery(DELETE_COCKTAIL, deleteCocktailSaga);
    yield takeEvery(SET_RATING_COCKTAIL, setRatingCocktailSaga);
}