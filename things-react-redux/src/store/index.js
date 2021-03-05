import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import customMiddleware from '../middleware/';

const store = createStore(rootReducer, applyMiddleware(customMiddleware));
export default store;
