import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from '../src/routes/Home';
import Search from './routes/Search';
import Login from './routes/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cars' element={<Search />} />
          <Route path='/cars/:id' />
          <Route path='/edit-car/:id' />
          <Route path='/create-car' />
          <Route path='/users' />
          <Route path='/user/:id' />
          <Route path='/login' element={<Login />} />
          <Route path='/register' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
