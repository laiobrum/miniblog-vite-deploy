import styles from './Home.module.css'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents: posts, loading} = useFetchDocuments('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) =>{ 
    e.preventDefault()
    if (query) {
      return navigate(`/search?q=${query}`)
    }
    
  }
  
  return (
    <div>        
      {!loading ? (<h2>Veja os nossos posts mais recentes</h2>) : (<p>Carregando posts...</p>)}

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input type="text" placeholder='Ou busque por tags...' onChange={(e)=>setQuery(e.target.value)} />
        <button className='btn'>Buscar</button>

      </form>

      <div className={styles.postsContainer}>
        <div>
          {posts && posts.map((post)=>( 
            <PostDetail key={post.id} post={post} /> 
            ))}
        </div>
      </div>

        {posts && posts.length === 0 && (
            <div className='titlePage'>
              <div>
                <p>Não foram encontrados posts</p>
                <Link to='/create' className='btn'>Criar primeiro post</Link>
              </div>
            </div>
          )}
    </div>
  )
}

export default Home
