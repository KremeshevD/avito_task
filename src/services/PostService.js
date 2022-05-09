import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchingPostDetail, loadKids, whatNew } from "../utils/utils";



export const getPostsDetails = createAsyncThunk (
    'posts/getPostsDetails',
    async (postList, {rejectWithValue}) => {
        try { 
           return await fetchingPostDetail(postList)  
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getPostList = createAsyncThunk (
    'posts/getPostList',
    async (_, {rejectWithValue }) => {
        try {
            const responce = await fetch('https://hacker-news.firebaseio.com//v0/newstories.json')
            if(!responce.ok) {
                throw new Error('Severe error!')
            }
            let postsId = await responce.json();
            postsId = postsId.splice(0,100)
            const postsData =  await fetchingPostDetail(postsId) 
            return {
                postsId,
                postsData
            }
        } catch (error) {
           return  rejectWithValue(error.message)
        }
    }
)

export const updatePostList = createAsyncThunk (
    'posts/updatePostList',
    async (_,{rejectWithValue, getState}) => {
        try {
            const result = {
                newIdList: [],
                newPosts: []
            }
            const prevPostIdList = getState().posts.postIdList
            
            const responce = await fetch('https://hacker-news.firebaseio.com//v0/newstories.json')
            if(!responce.ok) {
                throw new Error('Severe error!')
            }
            let newPostIdList = await responce.json();

            newPostIdList = newPostIdList.slice(0,100);
            const updateList =  whatNew(newPostIdList, prevPostIdList)
            result.newIdList = newPostIdList
            if (updateList.length) {
                result.newPosts = await fetchingPostDetail(updateList) 
            }
            return result
        } catch (error) {
            return  rejectWithValue(error.message)
        }
    }
)
export const getCurrentPage = createAsyncThunk (
    'posts/getCurrentPage',
    async (postId, {rejectWithValue}) => {
        try { 
           const [post] =  await fetchingPostDetail([postId])
           if (post.kids) {
                post.kids = await loadKids(post.kids) 
           }
           return post
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getComments = createAsyncThunk (
    'posts/getComments',
    async (parentId, {rejectWithValue, getState}) => {
        try {
            const [comments] = await fetchingPostDetail([parentId])
            comments.kids = await loadKids(comments.kids, true)
            const {posts}= getState()
            const index = posts.currentPage.kids.findIndex( item => item.id === +parentId)

            return {
                comments,
                index
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

