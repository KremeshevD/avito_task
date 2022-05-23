import { Route, Routes } from 'react-router';
import { Header } from './components/Header/header';
import { PostsList } from './components/PostsList/PostsList';
import { Post } from './components/Post/Post';

function App() {

  return (

    <div>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/item/:id" element={<Post />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
