import NewsList from '@/components/NewsList';


export default async function NewsPage() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/news`);

    if (!response.ok) {
        throw new Error('Failed to fetch news!')
    }
    
    const news = await response.json();

  
    
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
