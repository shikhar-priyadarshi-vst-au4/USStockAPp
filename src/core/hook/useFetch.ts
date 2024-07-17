import { useEffect, useState } from "react";
import { Pagination } from "../providers/appProvider";

export interface Status{
    error: boolean;
    loading: boolean;
    message: string;
}

export type Articles = Record<string, string>[]; 

export default function useArticles(setPagination:  React.Dispatch<React.SetStateAction<Pagination>>){
    
    const [articles, setArticles] = useState<Articles>([]);
    const [categories, setCategories] = useState<Array<string>>([]);
    const [authors, setAuthors] = useState<Array<string>>([]);

    const [status, setStatus] = useState<Status>({
        error: false,
        loading: true,
        message: ""
    })

    useEffect(() => {
        getArticles();
    },[])

    const getArticles = async () => {
        
        try{
            const response = await fetch('https://dummy-rest-api.specbee.site/api/v1/news', {
                method: "GET",
            }) 
    
            const dataResponse = await response.json();
            if(response.ok){
                setArticles(dataResponse)
                setPagination((previous) => ({
                    ...previous,
                    pageTotal: dataResponse.length
                }))
                setAuthors(Array.from(new Set(dataResponse?.map((data) => data.author))));
                setCategories(Array.from(new Set(dataResponse?.map((data) => data.source))));
                setStatus({
                    error: false,
                    loading: false,
                    message: 'Success Response'
                })
            }
            else{
                setArticles([]);
                setAuthors([]);
                setCategories([]);
                setStatus({
                    error: true,
                    loading: false,
                    message: 'Failed Response'
                })
            }
        }
        catch(error: unknown){
            setArticles([]);
            setAuthors([]);
            setCategories([]);
            setStatus({
                error: true,
                loading: false,
                message: error?.message || 'Failed Response'
            })
        }
    }

    return {
        status,
        articles,
        categories,
        authors
    }
}