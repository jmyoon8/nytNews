import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import getArticleSlice from './getArticleSlice';

const reducers = combineReducers({ getArticleSlice });
const configureStroe = configureStore({
   reducer: reducers,
});
export default configureStroe;
