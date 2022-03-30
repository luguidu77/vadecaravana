import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer } from '../reducers/AuthReducer'

const reducers = combineReducers({
    auth: AuthReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware(thunk)),
   
)