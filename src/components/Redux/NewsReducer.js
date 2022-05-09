import api from "../api/api"

const IS_FETCHING = "IS_FETCHING"
const SET_NEWSLIST = 'SET_NEWSLIST'
const SET_NEWS_DETAILS = 'SET_NEWS_DETAILS'
const SET_LAST_UPDATE_TIME = 'SET_LAST_UPDATE_TIME'
const SET_TIMER_ID = 'SET_TIMER_ID'
const IS_UPDATING = 'IS_UPDATING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const POST_FETCHING = 'POST_FETCHING'
const STOP_TIMER = "STOP_TIMER"

const initialState = {
    newsList: [],
    newsListData: [],
    isFetching: false,
    lastUpdateTime: '',
    timerId: '',
    isUpdating: false,
    currentPage: '',
    postFetching: false,
}

const newsReduser = (state = initialState, action) => {
        switch (action.type) {
            case IS_FETCHING: 
                return {...state, isFetching: action.payload}
            case SET_NEWSLIST:
                return {...state, newsList: action.payload}
            case SET_NEWS_DETAILS:
                return {...state, newsListData: action.payload}
            case SET_LAST_UPDATE_TIME: 
                return {...state, lastUpdateTime: new Date().getTime() }
            case SET_TIMER_ID:
                return {...state, timerId: action.payload}
            case IS_UPDATING: 
                return {...state, isUpdating: action.payload}
            case SET_CURRENT_PAGE:
                return {...state, currentPage: action.payload}
            case POST_FETCHING:
                return {...state, postFetching: action.payload}
            case STOP_TIMER: 
                clearInterval(state.timerId)
                return {...state, timerId: ''}
            default: 
                return state
        }
}


export const isFetching = (payload) => ({type: IS_FETCHING, payload});
export const setNewsList = (payload) => ({type: SET_NEWSLIST, payload});
export const setNewsDetails = (payload) => ({type: SET_NEWS_DETAILS, payload})
export const setLastUpdateTime = ()=>({type: SET_LAST_UPDATE_TIME})
export const setTimerId = (payload)=>({type: SET_TIMER_ID, payload})
export const isUpdating = (payload)=>({type: IS_UPDATING, payload})
export const setCurrentPage = (payload)=>({type: SET_CURRENT_PAGE, payload })
export const isPostFetching = (payload)=> ({type: POST_FETCHING, payload})
export const stopTimer = ()=> ({type: STOP_TIMER})

export const getNewsList = () => async (dispatch) => {
        dispatch(isFetching(true))
        const response = await api.getNewsList()
        dispatch(setNewsList(response.slice(0,110)))
        dispatch(getNewsDetails(response.slice(0,110)))
    }
export const getNewsDetails = (payload) => (dispatch) => {
            const res = payload.map(async(a) => await api.getNewsDetails(a) );
            Promise.all(res)
                .then( resp => {
                        resp = resp.filter( a => a !== null)
                        dispatch(setNewsDetails(resp.slice(0,100)))
                        dispatch(setLastUpdateTime())
                        dispatch(isFetching(false))
                })
                .catch(e => {
                    console.log(e)
                })

          
        }


export const getUpdateNews = (prevNewsListData) => async (dispatch) => {
        dispatch(isUpdating(true))
        const newsList = (await api.getNewsList()).slice(0,100)
        const comperedList = newsList.filter( el => el>prevNewsListData[0].id);
        const res = comperedList.map(async(a) => await api.getNewsDetails(a) );
        if (res.length > 0){
            Promise.all(res)
            .then( resp => {
                resp = resp.filter( a => a !== null)
                const newsListdata = [...resp, ...prevNewsListData ]
                dispatch(setNewsDetails(newsListdata.slice(0,100)))
                dispatch(setLastUpdateTime())
            }).catch( e => {
                console.log(e)
            })
        } else {
            dispatch(setLastUpdateTime())
        }
        dispatch(isUpdating(false))

    }

export const turnOffTimer = () => (dispatch) => {
        dispatch(stopTimer())
        dispatch(isUpdating(false))
    }

export const getCurrentPageData = (id) => async(dispatch) =>{
        const post = await api.getNewsDetails(id);
        if (post) {
            const kids = post.kids ? post.kids : []
            const comments = kids.map(async(a) => await api.getComment(a) );
            Promise.all(comments)
                .then( resp => {
                        post.kids = [...resp]
                        dispatch(setCurrentPage(post))
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            dispatch(setCurrentPage({error : true}))
        }
        dispatch(isPostFetching(false))
    }

export default newsReduser