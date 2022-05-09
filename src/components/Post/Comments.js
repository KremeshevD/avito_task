import { CommentItem } from "./CommentItem"

export function Comments({comments}) {
    
    return (
        <div>
            {comments.map( a => <CommentItem comment={a} key={a.id}/>)}
        </div>
    )
}