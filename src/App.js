import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';

import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='gym-counter/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}
export default App;
