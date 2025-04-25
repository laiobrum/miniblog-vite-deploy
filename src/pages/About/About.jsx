import { Link } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {
  return (
    <>
    <h2>Sobre o Mini <span>Blog</span></h2>
    <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end</p>
    <button className='btn'><Link to='/create'>Criar post</Link></button>
    </>
    
  )
}

export default About