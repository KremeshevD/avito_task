import './App.css';
import { Route, Routes } from 'react-router';
import { Header } from './components/Header/header';
import { NewsList } from './components/NewsList/NewsList';
import { Post } from './components/Post/Post';

function App() {
  console.log('render');

  return (

    <div className="App">
      <div className="app-wrapper-content">
        <Header />
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/item/:id" element={<Post />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
