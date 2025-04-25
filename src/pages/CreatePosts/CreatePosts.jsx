import styles from './CreatePost.module.css'
import { useState } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom'//Redirecionar
import { useAuthValue } from '../../context/AuthContext'//Pegar o usuário e atrelar ele no post
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePosts = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    setFormError('')

    //validade image url
    try {
      new URL(image)//JS nativo
    } catch (error) {
      setFormError('A imagem precisa ser uma URL')
    }
    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!(title && body && tags && image)){
      setFormError('Preencha todos os campos!')
      return 
    }

    if(formError) return

    insertDocument({
      title,
      body,
      image,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect to home page
    navigate('/')

  }

  return (
    <div>
        <div className='titlePage'>
          <h2>Crie seu post</h2>
        </div>
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
              <h3>Adicione uma imagem</h3>
              <input type="text" name='image' placeholder='Insira uma URL de uma imagem' value={image || ''} onChange={(e)=>setImage(e.target.value)} required />
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

export default CreatePosts