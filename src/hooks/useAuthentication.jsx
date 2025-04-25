//FIREBASE - quando trabalhamos com dados de autenticação, os usuários não ficam salvos no banco de dados da firestore, mas sim em um banco próprio do serviço de authentication

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //Cleanup: ao fazer a autenticação, não podemos deixar resquícios de funções sendo executadas ainda
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()
    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    //Login
    const login = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError('')
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            let systemErrorMessage
            if(error.message.includes("invalid-credential")) {
                systemErrorMessage = 'Usuário ou senha não encontrados'
            } else {
                systemErrorMessage = 'Ocorreu um erro. Por favor, tente mais tarde'
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    //Register
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, { //Faz atualização do usuário para colocar o nome (obrigatóio o firebase)
                displayName: data.displayName
            })
            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
            let systemErrorMessage
            if(error.message.includes('Password')) {
                systemErrorMessage = 'A Senha precisa conter pelo menos 6 caracters'
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado'
            } else  {
                systemErrorMessage = 'Ocorreu algum erro, por favor tente mais tarde.'
            }
            setError(systemErrorMessage)
        } finally {
            setLoading(false)
        }
    }

    //Logout
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    useEffect(()=>{
        return () => setCancelled(true)
    }, [])
    return { auth, createUser, error, loading, logout, login }
}