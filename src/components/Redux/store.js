import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import commentReduser from './CommentsReduser';
import newsReduser from './NewsReducer';


const reducers = combineReducers({
    newsList: newsReduser,
    comment: commentReduser,
});

export const store = createStore(reducers, applyMiddleware(thunk));