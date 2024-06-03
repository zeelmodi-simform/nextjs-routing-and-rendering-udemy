import Link from "next/link";

import { getAvailableNewsYears } from "@/lib/lib";

export default function ArchiveNewsPage() {

    const yearsList = getAvailableNewsYears()

    return (
        <header id="archive-header">
            <nav>
                <ul>
                   {yearsList.map((year) => (
                        <li key={year}>
                            <Link href={`/archive/${year}`}>{year}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}