import { useEffect, useState } from "react"
import styles from '../CreatePosts/CreatePost.module.css'
import { useAuthValue } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"


const Edit = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')
    const {user} = useAuthValue()

    //PEGAR OS DADOS:
    const {id} = useParams()
    const { document: post, error, loading } = useFetchDocument('posts', id) 
    useEffect(() => {
        if(post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)
            const textTags = Array.isArray(post.tagsArray) ? post.tagsArray.join(", ") : ''
            
            setTags(textTags)
        }
        
    }, [post])
    

    //UPDATE DE DADOS: 
    const {updateDocument, response} = useUpdateDocument('posts', id) 

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
    e.preventDefault()
    setFormError('')

    //validade image url
    try {
      new URL(image)//JS nativo
    } catch (error) {
      setFormError('A imagem precisa ser uma URL')
      console.log(error)
    }
    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!(title && body && tags && image)){
      setFormError('Preencha todos os campos!')
      return 
    }

    if(formError) return

    const data = {
      title,
      body,
      image,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data)

    //redirect to home page
    navigate('/posts')

  }

  return (
    <div>
        <div className='titlePage'>
          <h2>Edite seu post</h2>
        </div>

        {loading && <p>Carregando...</p>}

        <form className={styles.postForm} onSubmit={handleSubmit}>
          <label htmlFor="title">
            <div className={styles.postControl}>
              <h3>Título</h3>
              <input type="text" name='title' placeholder='Digite o título' value={title || ''} onChange={(e)=>setTitle(e.target.value)} required/>
            </div>
          </label>
          <label htmlFor="body">
            <div className={styles.postControl}>
              <h3>Escreva seu post</h3>
              <textarea type="textarea" name='body' placeholder='Escreva seu post aqui' value={body || ''} onChange={(e)=>setBody(e.target.value)} required/>
            </div>
          </label>
          <label htmlFor="tags">
            <div className={styles.postControl}>
              <h3>Escreva as tags</h3>
              <input type="text" name='tags' placeholder='Escreva as tags' value={tags || ''} onChange={(e)=>setTags(e.target.value)} required/>
            </div>
          </label>
          <label htmlFor="image">
            <div className={styles.postControl}>
              <h3>Adicione ou mude a imagem através da URL</h3>
              <input type="text" name='image' placeholder='Insira uma URL de uma imagem' value={image || ''} onChange={(e)=>setImage(e.target.value)} required />
              {image && <img src={image} alt={title} />}
            </div>
          </label>
          <div className={styles.postBtn}>
            {!response.loading && <button className='btn'>Enviar Post</button>}
            {response.loading && <button className='btn'>Aguarde...</button>}
          </div>
        </form>
        {formError && <p className='errorMessage'>{formError}</p>}
        {response.error && <p className='errorMessage'>{response.error}</p>}
        
    </div>
  )
}

export default Edit