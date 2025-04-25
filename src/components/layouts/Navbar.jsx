import { NavLink } from 'react-router-dom'
import './NavFoot.css' //O CSS não pode ser modular. Tem que vazar para pegarmos a classe '.active'

import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'

const Navbar = () => {
  const { user } = useAuthValue()
  
  const { logout } = useAuthentication()

  return (
    <nav>
        <h3><NavLink to='/'>Mini <span>Blog</span></NavLink></h3>
        <ul>
          {!user && (
            <>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink  to='/register'>Registrar</NavLink></li>
            </>
          )}
          {user && (
            <>              
              <li><NavLink  to='/posts'>Meus Posts</NavLink></li>
              <li><NavLink to='/create'>Criar Post</NavLink></li>
            </>
          )}
            <li><NavLink to='/about'>About</NavLink></li>
            {user && (<li><button className='btnNav' onClick={logout}>Sair</button></li>)}
        </ul>
    </nav>
    
  )
}

export default Navbar