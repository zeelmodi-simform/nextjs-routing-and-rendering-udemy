import NewsList from "@/components/NewsList";
import { getNewsForYear } from "@/lib/lib";

export default function FilteredNewsPage({ params }) {
    const year = params.year || 0;
    const news = getNewsForYear(year)
    
    return (
        <NewsList news={news} />
    );
};