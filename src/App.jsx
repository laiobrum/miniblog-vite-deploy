import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/layouts/Navbar'
import NotFound from './pages/NotFound'
import Footer from './components/layouts/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
//Autenticação - firebase
import { onAuthStateChanged } from 'firebase/auth'//Mapeia se a autenticação do usuário foi feita com sucesso
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
//Context:
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePosts from './pages/CreatePosts/CreatePosts'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import Edit from './pages/Edit/Edit' 

function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loadingUser = user === undefined;//atribuo ao estado de loading do usuário o valor do usuário comparado com o undefined. Então se for undefined está carregando. Vou conseguir fazer que não exiba nada antes do usuário ser carregado.
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])
  if(loadingUser) {
    return <p>Carregando...</p>
  }
  return (
    <AuthProvider value={{user}}>
        <Router>
        <Navbar/>
          <main>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>

              <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
              <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>

              <Route path='/posts/edit/:id' element={user ? <Edit/> : <Navigate to='/login'/>}/>
              <Route path='/create' element={user ? <CreatePosts/> : <Navigate to='/login'/>}/>
              <Route path='/posts' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>

              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </main>
        <Footer/>
        </Router>
    </AuthProvider>
  )
}

export default App
