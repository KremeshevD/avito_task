import { Link } from 'react-router-dom';
import s from './newsItem.module.css';

export function PostItem({ post, index }) {
  return (
    <div className={s.slowAppearance}>
      <Link to={`item/${post.id}`} className={s.decorationRemove}>
        <div
          className={s.layoutGrid}
          data-id={post.id}
        >
          <span className={s.item_num}>
            {index + 1}
            .
          </span>
          <div className={s.item_title}>{post.title}</div>
          <div className={`${s.info} ${s.gray}`}>
            {`by: ${post.by} | Date: ${(new Date(post.time * 1000)).toLocaleString()} | rating: ${post.score}`}
          </div>
        </div>
      </Link>
    </div>
  );
}
