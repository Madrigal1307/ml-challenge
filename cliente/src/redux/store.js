import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import itemReducer, {restoreItemsAction} from "./itemDuck";
import itemDetailReducer, {restoreItemDetailAction} from "./itemDetailDuck";


let rootReducer = combineReducers({
    item: itemReducer,
    itemDetail: itemDetailReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    //restablecer s
    restoreItemsAction()(store.dispatch)
    restoreItemDetailAction()(store.dispatch)
    return store;
}

export default generateStore;