import {
    LOGIN_USER,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_SUCCESS
} from "../actionTypes";

export const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, data});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserError = error => ({type: LOGOUT_USER_ERROR, error});

export const loginUser = userData => ({type: LOGIN_USER, userData});
export const logoutUser = () => ({type: LOGOUT_USER});