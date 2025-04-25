import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import {doc, getDoc } from "firebase/firestore"

export const useFetchDocument = (docCollection, id) => {
    const [loading, setLoading] = useState(null)
    const [document, setDocument] = useState([])
    const [error, setError] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(()=>{
        async function loadDocument() {
            if(cancelled) return
            setLoading(true)

            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)//Snap é a resposta que o firestore dá!

                setDocument(docSnap.data())
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
            

        }
        loadDocument()
    }, [docCollection, id, cancelled])

    useEffect(()=>{
        return ()=>setCancelled(true)
    }, [])

    return {document, loading, error}
}