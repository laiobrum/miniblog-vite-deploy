import styles from '../Home/Home.module.css'
import { Link } from "react-router-dom"
import PostDetail from "../../components/PostDetail"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"

const Search = () => {
    const query = useQuery()
    const search = query.get('q')//Esse método get é do URLSearchParams no useQuery
    const {documents: posts} = useFetchDocuments('posts', search)
  return (
    <div>
        <h2>Search Results</h2>
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

export default Search