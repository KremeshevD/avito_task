import { useDispatch, useSelector } from "react-redux"
import { Link ,useLocation} from "react-router-dom"
import { updateComments, updatePostList } from "../../services/PostService"
import s from "./header.module.css"


export function Header() {
    const isUpdating = useSelector(state => state.posts.isUpdating)
    const location = useLocation();
    const isHome = location.pathname === '/'
    const dispatch = useDispatch()
    const updateNewsHandler = () => {
        dispatch(updatePostList())
    }
    const updateCommentsHandler = () => {
        dispatch(updateComments())
    }


    return  (
    <div className={`${s.sticky} ${s.layout}`}> 
        <Link to="/"><div>HackerNews</div></Link>
        <div>
        {isHome ? 
        <button type="button" className={s.button} disabled={isUpdating}  onClick={updateNewsHandler}>Refresh</button> 
        :
        <button type="button" disabled={isUpdating} onClick={updateCommentsHandler} >Refresh Comments</button>}
        </div>
    </div>
    )
}