import styles from '../pages/Home/Home.module.css'
import { Link } from "react-router-dom"

const PostDetail = ({post}) => {
  return (
    <div className={styles.postList}>
        <h2>{post.title}</h2>
        <img src={post.image} alt={post.title} />
        <i>{post.createdBy}</i>
        <p>{post.tags}</p>
        {post.tagsArray.map((tag, i)=>(
            <span key={tag+i}><span>#</span>{tag} </span>
        ))}
        <p><Link to={`/posts/${post.id}`} >Ler Post</Link></p>
    </div>
  )
}

export default PostDetail