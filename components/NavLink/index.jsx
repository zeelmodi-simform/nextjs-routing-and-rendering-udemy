'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({children, href}) {

    const path = usePathname()

    return (
        <Link className={path.startsWith(href) ? 'active' : ''} href={href}>
            {children}
        </Link>
    );
}
