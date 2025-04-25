import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import styles from '../Home/Home.module.css'

const Post = () => {
    //get the post by the id url
    const {id} = useParams()
    
    const { document: post, error, loading } = useFetchDocument('posts', id)
  return (
    <div className={styles.postsContainer}>
      <div className={styles.fullPost}>

        {loading && <p>Carregando...</p>}

        {post && 
          <>
            <img src={post.image} alt={post.title} />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>
              {post?.tagsArray?.map((tag, i)=>(
                <span key={tag+i}><span><b>#</b></span>{tag} </span>
              ))}
            </p>
            <p>Criado por {post.createdBy}</p>
          </>
        }
      </div>
      
    </div>
  )
}

export default Post