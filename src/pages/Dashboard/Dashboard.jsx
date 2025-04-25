import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Dashboard.module.css'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import { useEffect } from 'react'


const Dashboard = () => {
  const {user} = useAuthValue()
  //FETCH documentos feitos pelo user logado
  const {documents: posts, loading, error} = useFetchDocuments('posts', null, user.uid)
  if(error) console.log(error)
  //DELETAR post
  const {deleteDocument} = useDeleteDocument('posts')

  

  return (
    <div>

      {loading && <p>Carregando...</p>}
      {error && <p>Alguma coisa deu errado</p>}

      <h1>Olá, {user.displayName}.</h1>
      <h2>Estes são seus posts: </h2>
      <div className={styles.dashboardContainer}>
        {posts && posts.map((post)=>(
          <div key={post.id} className={styles.dashboardPost}>
            <h3>{post.title}</h3>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`}>Ver Post</Link>
              <Link className='btn2 blue' to={`/posts/edit/${post.id}`}>Editar Post</Link>
              <button className='btn2 red' onClick={()=>deleteDocument(post.id)}>Excluir</button>
            </div>
            
            
          </div>
        ))}
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

export default Dashboard