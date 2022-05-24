import { useDispatch } from "react-redux";
import { getComments } from "../../services/PostService";
import s from "./commentItems.module.css"
import CommentKids from "./CommentKids"; /*eslint-disable-line*/

export function CommentItem({comment}) {
    const haveKids = comment.kids && comment.kids.length > 0;
    const kidsIsloaded = haveKids &&  comment.kids[0].id
    
       
    
    
    const dispatch = useDispatch()
    const loadMore = (e) => {
        dispatch(getComments(e.target.dataset.id))
    }

    return (
        <div>
            { comment.deleted ?
                <div className={s.slowAppearance}>
                    The comment have been deleted
                </div> 
            :       
                <div className={`${s.textAlig} ${s.layout} ${s.slowAppearance}`}>
                    <div className={s.gray}>{comment.by} | {(new Date(comment.time*1000)).toLocaleString()}</div>
                    <div dangerouslySetInnerHTML={{__html: comment.text }} />
                    {haveKids && kidsIsloaded ? 
                        <CommentKids comments={comment.kids}/> 
                        : 
                        haveKids && <div className={s.loadMore} onClick={loadMore} role='button' data-id={comment.id}>Load more</div>} 
                </div>
            }
        </div>
    )
}