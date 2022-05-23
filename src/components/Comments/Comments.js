import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateComments } from "../../services/PostService"
import { CommentItem } from "./CommentItem"

export function Comments({comments}) {
    const dispatch = useDispatch()

    useEffect( () => {
        const id = setInterval(() => {
                console.log(1)
                dispatch(updateComments())
            }, 60000)
        return  () => {
            clearInterval(id)
        }
    }, [])

    return (
        <div>
            {comments.map( a => <CommentItem comment={a} key={a.id}/>)}
        </div>
    )
}