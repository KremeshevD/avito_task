
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { cleartimer, setTimer } from "../../Redux/postsReducer";
import { getPostList, updatePostList } from "../../services/PostService";
import { PostItem } from "./PostItem";


export function PostsList() {
  const isFetching = useSelector( state => state.posts.isFetching)
  const postList = useSelector( state => state.posts.postList)
  const timerId = useSelector( state => state.posts.timer)
  const listIsReady = Boolean(postList.length)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getPostList())
    const timer = setInterval(()=>{
      dispatch(updatePostList())
    }, 60000)
    dispatch(setTimer(timer))
    return () => {
      dispatch(cleartimer(timerId))
    }
  }, [])
    return  (
    <div>
        {isFetching && !listIsReady ? <div>Loading...</div>:
        postList.map( (post, index) => <PostItem post={post} index = {index} key={post.id}/>)
        }
    </div>

    )
}
