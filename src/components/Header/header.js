import { useDispatch, useSelector } from "react-redux"
import { Link ,useLocation} from "react-router-dom"
import { updatePostList } from "../../services/PostService"
import s from "./header.module.css"


export function Header() {
    const isUpdating = useSelector(state => state.posts.isUpdating)
    const location = useLocation();
    const isHome = location.pathname === '/'
    const dispatch = useDispatch()
    const updateHandler = () => {
        dispatch(updatePostList())
    }


    return  (
    <div className={s.sticky}> 
        <Link to="/"><div>HackerNews</div></Link>
        {isHome ? 
        <button type="button" disabled={isUpdating}  onClick={updateHandler}>Refresh</button> 
        :
        <button type="button" disabled={isUpdating} >Refresh Comments</button>}
    </div>
    )
}