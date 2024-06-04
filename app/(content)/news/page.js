'use client'

import NewsList from '@/components/NewsList';
import { useEffect, useState } from 'react';


export default function NewsPage() {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [news, setNews] = useState([])

    useEffect(() => {
        
        async function fetchNews() {
            setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/news`);

            if (!response.ok) {
                setError('Failed to fetch news.')
                setIsLoading(false)
            }
            const news = await response.json();
            setNews(news)
            setIsLoading(false)

        }

        fetchNews()
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }
    
    let newsContent;
    if (news.length) {
        newsContent = <NewsList news={news} />
    }

    return (
        <>
            <h1>News Page</h1>
            {newsContent}
        </>
    );
}
