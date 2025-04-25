import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case 'LOADING':
            return {loading: true, error: null}
        case 'INSERTED_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {//Vem do CreatePosts, e o docCollection é o "posts" lá!
    const [response, dispatch] = useReducer(insertReducer, initialState)//A função insertReducer acima vai definir o que quando e como se deve mudar o estado
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    }
    const insertDocument = async(document) =>{//Essa função é chamada no CreatePosts e passa em document tudo o que foi preenchido no formulário.
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(()=>{
        return () => setCancelled(true)
    }, [])

    return {insertDocument, response}
}