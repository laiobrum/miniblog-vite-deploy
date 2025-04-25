import { useState } from "react";
import { Link } from 'react-router-dom'
import '../Forms.css'
import { useAuthentication } from "../../hooks/useAuthentication";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const {login, error: authError} = useAuthentication()

    const handleSubmit=async(evt)=>{
        evt.preventDefault()
        const user = {
            email,
            password
        }
        login(user)
    }

    return (
        <>
        <h2>Faça seu login</h2>
        <div className="formContainer">
            <br />
            <form onSubmit={handleSubmit}>
                <label className="formControl">
                    <span htmlFor="email">E-mail: </span>
                    <input id="EmailInput" type="email" name="email" placeholder="Digite seu E-mail" onChange={(e)=>setEmail(e.target.value)}  />
                </label>
                <label className="formControl">
                    <span>Senha: </span>
                    <input type="password" name="password" placeholder="Digite sua senha" onChange={(e)=>setPassword(e.target.value)} />
                </label>

                <input className="standardBtn" type="submit" />
                {authError && <p className="errorMessage">{authError}</p>}
                <div className="leftIndent">
                    <p>Não é cadastrado? <Link to='/register'>Clique aqui</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login