import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import '../Forms.css'
import { useAuthentication } from "../../hooks/useAuthentication";

function Register() {
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()

    const {createUser, error: authError, loading} = useAuthentication()

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setError('')

        const user = {
            displayName,
            email,
            password
        }
        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais')
            console.log(error)
            return
        }
        const res = await createUser(user)
        console.log(res)
    }
    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    }, [authError])

    return (
        <>
        <h2>Faça seu login</h2>
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label className="formControl">
                    <span htmlFor="email">Nome Completo: </span>
                    <input id="name" type="text" name="displayName" placeholder="Digite seu E-mail" value={displayName || ''} onChange={(e)=>setDisplayName(e.target.value)} required />
                </label>
                <label className="formControl">
                    <span htmlFor="email">E-mail: </span>
                    <input id="EmailInput" type="email" name="email" placeholder="Digite seu E-mail" value={email || ''} onChange={(e)=>setEmail(e.target.value)} required />
                </label>
                <label className="formControl">
                    <span>Senha: </span>
                    <input type="password" name="password" placeholder="Digite sua senha" value={password || ''} onChange={(e)=>setPassword(e.target.value)} required/>
                </label>
                <label className="formControl">
                    <span>Confirmação de senha: </span>
                    <input type="password" name="confirmPassword" placeholder="Confirme sua senha" value={confirmPassword || ''} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </label>
                
                {!loading ? (<input className="standardBtn" value="Cadastrar" type="submit"/>) : (<input className="standardBtn" value="Aguarde..." type="submit" disabled/>)}
                <div className="leftIndent">
                    <p>Já tem cadastro? <Link to='/login'>Clique aqui</Link></p>
                </div>
                {error && <p className="errorMessage">As senhas não coincidem</p>}
            </form>
        </div>
        </>
    )
}

export default Register