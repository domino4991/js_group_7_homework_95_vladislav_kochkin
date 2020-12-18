import {
    createNewCocktailError,
    createNewCocktailSuccess,
    deleteCocktailError,
    deleteCocktailSuccess, getCocktailInfo,
    getCocktailInfoError,
    getCocktailInfoSuccess,
    getCocktails,
    getCocktailsError,
    getCocktailsSuccess,
    publishCocktailError,
    publishCocktailSuccess, setRatingCocktailError, setRatingCocktailSuccess
} from "../actions/cocktailsActions";
import {put} from "redux-saga/effects";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

export function* createNewCocktailSaga({data}) {
    try {
        const response = yield axiosBase.post('/cocktails', data);
        yield toast.success(response.data.message);
        yield put(createNewCocktailSuccess());
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(createNewCocktailError(e.response.data));
        } else {
            yield put(createNewCocktailError(e.message));
        }
    }
}

export function* getCocktailsSaga() {
    try {
        const response = yield axiosBase.get('/cocktails');
        yield put(getCocktailsSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(getCocktailsError(e.response.data.error));
        } else {
            yield put(getCocktailsError(e.message));
        }
    }
}

export function* getUsersCocktailsSaga() {
    try {
        const response = yield axiosBase.get('/cocktails/users');
        yield put(getCocktailsSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(getCocktailsError(e.response.data.error));
        } else {
            yield put(getCocktailsError(e.message));
        }
    }
}

export function* getCocktailInfoSaga({id}) {
    try {
        const response = yield axiosBase.get(`/cocktails/${id}`);
        yield put(getCocktailInfoSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(getCocktailInfoError(e.response.data.error));
        } else {
            yield put(getCocktailInfoError(e.message));
        }
    }
}

export function* publishCocktailSaga({id}) {
    try {
        const response = yield axiosBase.put(`/cocktails/${id}/publish`);
        yield toast.success(response.data.message);
        yield put(getCocktails());
        yield put(publishCocktailSuccess());
    } catch (e) {
        if(e.response && e.response.data) {
            yield toast.error(e.response.data.error);
            yield put(publishCocktailError(e.response.data.error));
        } else {
            yield toast.error(e.message);
            yield put(publishCocktailError(e.message));
        }
    }
}

export function* deleteCocktailSaga({id}) {
    try {
        const response = yield axiosBase.delete(`/cocktails/${id}`);
        yield toast.success(response.data.message);
        yield put(deleteCocktailSuccess());
        yield put(getCocktails());
    } catch (e) {
        if(e.response && e.response.data) {
            yield toast.error(e.response.data.error);
            yield put(deleteCocktailError(e.response.data.error));
        } else {
            yield toast.error(e.message);
            yield put(deleteCocktailError(e.message));
        }
    }
}

export function* setRatingCocktailSaga({id, data}) {
    try {
        const response = yield axiosBase.put(`/cocktails/${id}/score`, data);
        yield toast.success(response.data.message);
        yield put(getCocktailInfo(id));
        yield put(setRatingCocktailSuccess());
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(setRatingCocktailError(e.response.data.error));
        } else {
            yield put(setRatingCocktailError(e.message));
        }
    }
}