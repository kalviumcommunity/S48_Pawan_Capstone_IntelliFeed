import { useState } from 'react'
import './App.css'
import { Route,Routes,Link } from 'react-router-dom'
import {Landingpage,Footer,Header,Login,Navigation,Preferences,Profile,Signup,
        Chatbotpage,Chatcomponent,Feedpage,Newscard} from './Componentsindex'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Feedpage' element={<Feedpage/>}/>

    </Routes>
    </>
  )
}

export default App
