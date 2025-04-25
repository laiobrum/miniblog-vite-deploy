import { useLocation } from "react-router-dom";//Acessa a URL atual, incluindo o pathname, search, hash, etc
import { useMemo } from "react";// Importa useMemo, que serve para memorizar valores derivados — nesse caso, evita recriar o objeto URLSearchParams toda vez que o componente renderiza.

export function useQuery() {
    const {search} = useLocation()
    return useMemo(()=> new URLSearchParams(search), [search])//Só vai executar quando o search for alterado, igual o useEffect
}