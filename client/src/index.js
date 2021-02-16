import React from 'react';
import RactDom from 'react-dom';
import App from './App';
import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './Store/reducers/authReducers'
import errorReducer from './Store/reducers/errorReducer'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    auth:authReducer,
    error:errorReducer
})

export const store = createStore(reducers,
    composeEnhancer(applyMiddleware(ReduxThunk))
    );

RactDom.render(<Provider store ={store} ><App/></Provider>,document.getElementById('root'));