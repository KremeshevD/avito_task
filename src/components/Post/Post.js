import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostContent } from './PostContent';
import s from './post.module.css';
import { Comments } from '../Comments/Comments'
import { getCurrentPage } from '../../services/PostService';
import { clearCurrentPage } from '../../Redux/postsReducer';

export function Post() {
  const { id } = useParams();
  const currentPage = useSelector((state) => state.posts.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage(id))
    return () => {
      dispatch(clearCurrentPage())
    }
  }, [id]);

  return (
    <div className={s.layout}>
      { currentPage === ''
        ? <div>Loading</div>
        : <Content currentPage={currentPage} />}
    </div>
  );
}

function Content({ currentPage }) {
  return (
    <div>
      <PostContent postdata={currentPage} />
      <hr/>
      {currentPage.kids && <Comments comments={currentPage.kids} />}
    </div>
  );
}
