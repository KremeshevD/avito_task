import { createSlice } from '@reduxjs/toolkit';
import {
  getComments,
  getCurrentPage, getPostList,  updateComments,  updatePostList,
} from '../services/PostService';

/* eslint-disable no-param-reassign */
export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: 0,
    isFetching: false,
    error: '',
    postIdList: [],
    postList: [],
    isUpdating: false,
    timer: '',
    currentPage: '',
  },
  reducers: {
    setTimer(state, { payload }) {
      state.timer = payload;
    },
    cleartimer(state) {
      clearInterval(state.timer);
      state.timer = '';
    },
    clearCurrentPage(state) {
      state.currentPage = '';
    }
  },
  extraReducers: {
    [getPostList.pending]: (state) => {
      state.isFetching = true;
      state.isUpdating = true;
      state.error = '';
    },
    [getPostList.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isUpdating = false;
      state.postIdList = action.payload.postsId;
      state.postList = action.payload.postsData
      state.error = '';
    },
    [getPostList.rejected]: (state, action) => {
      state.isFetching = false;
      state.isUpdating = false;
      state.error = action.payload;
    },
    [updatePostList.pending]: (state) => {
      state.isUpdating = true;
      state.error = '';
    },
    [updatePostList.fulfilled]: (state, action) => {
      state.isUpdating = false;
      state.postList = [...action.payload.newPosts, ...state.postList].slice(0, 100);
      state.postIdList = action.payload.newIdList;
      state.error = '';
    },
    [updatePostList.rejected]: (state, action) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
    [getCurrentPage.pending]: (state) => {
      state.isFetching = true;
      state.isUpdating = true;
      state.error = '';
    },
    [getCurrentPage.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.isUpdating = false;
      state.currentPage = payload;
      state.error = '';
    },
    [getCurrentPage.rejected]: (state, action) => {
      state.isUpdating = false;
      state.isFetching = false;
      state.error = action.payload;
    },
    [getComments.pending]: (state) => {
      state.isUpdating = true
      state.error = '';
    },
    [getComments.fulfilled]: (state, {payload}) => {
      state.currentPage.kids[payload.index] = payload.comments
      state.isUpdating = false
      state.error = '';
    },
    [getComments.rejected]: (state, action) => {
      state.isUpdating = false
      state.error = action.payload;
    },
    [updateComments.pending]: (state) => {
      state.isUpdating = true
      state.error = '';
    },
    [updateComments.fulfilled]: (state, {payload}) => {
      state.currentPage = payload
      state.isUpdating = false
      state.error = '';
    },
    [updateComments.rejected]: (state, action) => {
      state.isUpdating = false
      state.error = action.payload;
    },
  },
});


export const { setTimer, cleartimer, clearCurrentPage } = postsSlice.actions;
