import Link from "next/link";

import NewsList from "@/components/NewsList";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/lib";

export default function FilteredNewsPage({ params }) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1]

    let news;
    let yearsList = getAvailableNewsYears()


    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear)
        yearsList = getAvailableNewsMonths(selectedYear)
        
    }
    
    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth)
        yearsList = []
    }

    let newsContent = <p>No news found for the selected period.</p>;

    if (news?.length) {
        newsContent = <NewsList news={news} />
    }

    if ((selectedYear && !getAvailableNewsYears().includes(+selectedYear))
        || (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))) {
        throw new Error('Invalid Filter!!!')
    }


    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {yearsList.map((item) => {

                            const href = selectedYear ? `/archive/${selectedYear}/${item}` : `/archive/${item}`

                            return (
                                <li key={item}>
                                    <Link href={href}>{item}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    );
};