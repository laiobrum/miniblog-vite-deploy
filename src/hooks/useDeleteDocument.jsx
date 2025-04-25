import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config'
import { deleteDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case 'LOADING':
            return {loading: true, error: null}
        case 'DELETE_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {//Vem do CreatePosts, e o docCollection é o "posts" lá!
    const [response, dispatch] = useReducer(deleteReducer, initialState)//A função insertReducer acima vai definir o que quando e como se deve mudar o estado
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    }
    const deleteDocument = async(id) =>{//Essa função é chamada no CreatePosts e passa em document tudo o que foi preenchido no formulário.
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const response = await deleteDoc(doc(db, docCollection, id))
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: response
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

    return {deleteDocument}
}