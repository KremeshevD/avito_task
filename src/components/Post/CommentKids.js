/* eslint import/no-cycle: [2, { maxDepth: '∞' }] */

import s from "./commentKids.module.css"
import { CommentItem } from "./CommentItem" /*eslint-disable-line*/


function  CommentKids ({comments})  {
    return (    
        <div className={s.comment_level}> 
        {comments.map((item) => <CommentItem comment={item} />)}
        </div>
    )
}


export default CommentKids