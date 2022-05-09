import s from "./postContent.module.css"



export function PostContent({ postdata }) {
    return (
        <div>
            <div  key={postdata.id} className={s.textAlign}>
             <div  
                    className={s.layoutGrid} 
                    data-id={postdata.id}>
                    <div className={s.item_title}>{postdata.title}</div>
                    <a className={s.item_url} href={postdata.url}>{postdata.url}</a>
                    <div className={s.info}>
                    by: {postdata.by} | 
                    Date: {`${(new Date(postdata.time*1000)).toLocaleString()}`} |
                    rating: {postdata.score}
                    </div>
                </div>
             </div>
        </div>
    )
}