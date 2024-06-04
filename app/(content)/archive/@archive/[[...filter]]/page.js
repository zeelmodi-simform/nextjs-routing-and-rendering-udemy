import { Suspense } from "react";

import Link from "next/link";

import NewsList from "@/components/NewsList";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

async function FilterHeader({year, month}) {
    const availableYears = await getAvailableNewsYears();
    let yearsList = availableYears

    if (year && !month) {
        yearsList = getAvailableNewsMonths(year)   
    }
    
    if (year && month) {
        yearsList = []
    }

    if (
        (year && !availableYears.includes(year)) ||
        (month &&
        !getAvailableNewsMonths(year).includes(month))
    ) {
        throw new Error('Invalid filter.');
    };

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {yearsList.map((item) => {

                        const href = year ? `/archive/${year}/${item}` : `/archive/${item}`

                        return (
                            <li key={item}>
                                <Link href={href}>{item}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    );
}

async function FilteredNews({ year, month }) {
    let news;
    if (year && !month) {
        news = await getNewsForYear(year)
    }
    else if (year && month) {
        news = await getNewsForYearAndMonth(year, month)
    }

    let newsContent = <p>No news found for the selected period.</p>;

    if (news?.length) {
        newsContent = <NewsList news={news} />
    }

    return newsContent
}

export default async function FilteredNewsPage({ params }) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1]
    
    return (
        <>
            <Suspense fallback={<p>Loading filter...</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
            </Suspense>
            <Suspense fallback={<p>Loading news...</p>}>
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
};