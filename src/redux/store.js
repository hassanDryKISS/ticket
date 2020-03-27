import reducer from './reducer';
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import { loadState } from './localStorage'

const persistedState = loadState();
export default createStore(reducer,persistedState,applyMiddleware(thunkMiddleware))
