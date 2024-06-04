import NewsList from '@/components/NewsList';
import { getAllNews } from '@/lib/news';


export default async function NewsPage() {
    const news = await getAllNews();

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
