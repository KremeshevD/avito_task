import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsSlice } from './postsReducer';

const reducer = combineReducers({
  posts: postsSlice.reducer,
});
const store = configureStore({ reducer });

const getStore = () => store;

export default getStore;
