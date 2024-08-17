// import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MenuAppBar from './Components/MenuAppBar'
import CoursePage from './Pages/CoursePage'
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(JSON.parse(localStorage.getItem('isLogin') ?? 'false'));

  return (
    <>
      <MenuAppBar isLogin={isLogin} setIsLogin={setIsLogin}></MenuAppBar>
      <Routes>
        <Route path='/' Component={HomePage}></Route>
        <Route path='/course/:id' element={<CoursePage isLogin={isLogin} />}></Route>
      </Routes>
    </>
  )
}

export default App
