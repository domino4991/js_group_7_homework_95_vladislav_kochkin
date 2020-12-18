import {compose, createStore, applyMiddleware, combineReducers} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {saveToLocalStorage, loadFromLocalStorage} from "./localStorage";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";
import {usersReducer} from "./reducers/usersReducer";
import {cocktailsReducer} from "./reducers/cocktailsReducer";

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    cocktails: cocktailsReducer
});

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, persistedState, enhancers);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

export default store;