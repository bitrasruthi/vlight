import allReducers from '../reducers/index.js';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';

const myreducers = allReducers();
let enhancers = compose(applyMiddleware(thunk));
let store = createStore(myreducers, enhancers);
export default store;