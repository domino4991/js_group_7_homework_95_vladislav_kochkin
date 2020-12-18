import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import {push} from 'connected-react-router';
import {loginUserError, loginUserSuccess, logoutUserError, logoutUserSuccess} from "../actions/usersActions";
import axiosBase from "../../axiosBase";

export function* loginUserSaga({userData}) {
    try {
        let response;
        if(userData.id) {
            response = yield axiosBase.post('/users', userData);
        } else {
            response = yield axiosBase.post('/users/sessions', userData);
        }
        yield put(loginUserSuccess(response.data));
        yield push('/');
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(loginUserError(e.response.data));
        } else {
            yield put(loginUserError(e.message));
        }
    }
}

export function* logoutUserSaga() {
    try {
        const response = yield axiosBase.delete('/users/sessions');
        yield toast.success(response.data.message);
        yield put(logoutUserSuccess());
        yield push('/');
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(logoutUserError(e.response.data.error));
        } else {
            yield put(logoutUserError(e.message));
        }
    }
}