import { createAsyncThunk } from "@reduxjs/toolkit"
import { compareArray, fetchingPostDetail, loadKids, whatNew } from "../utils/utils";



export const getPostsDetails = createAsyncThunk (
    'posts/getPostsDetails',
    async (postList, {rejectWithValue}) => {
        try { 
            let result = await fetchingPostDetail(postList)
            result =  result.filter( item => item !== null)
            return  result
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

export const updateComments = createAsyncThunk(
    'posts/updateComments',
    async (_,{rejectWithValue, getState}) =>  {
        try {
            const { currentPage } = getState().posts
            const parentId = currentPage.id
            const updatedNews = (await fetchingPostDetail([parentId]))[0]
            if (currentPage.kids) {
                const baseArray = currentPage.kids.map( item => item.id)
                const isUpdateNeeded = compareArray(baseArray, updatedNews.kids)
                const loadedCommentsBranch =  currentPage.kids.reduce( (acc, items) => {
                    if (items.kids && typeof items.kids[0] === 'object' && items.kids[0] !== null) {
                        acc.push(items.id)
                    }
                    return acc
                }, [])
                const listForUpdate = [...loadedCommentsBranch, ...isUpdateNeeded]
               const updatedComments = await Promise.all(listForUpdate.map(async item => 
                   loadKids(item, loadedCommentsBranch.includes(item) )
               ))
               updatedNews.kids = updatedNews.map( item => item.id === updatedComments.id ? updatedComments : item)
            }
            return updatedNews           
        } catch (error) {
            return rejectWithValue(error.message) 
        }
    }
)
