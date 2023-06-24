import Link from "next/link";

type NavbarLinkProps = {
    title: string,
    href: string,
}

function NavbarLink({ title, href }: NavbarLinkProps) {
    return (
        <Link
            href={href}
            className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            aria-current="page"
        >
            {title}
        </Link>
    );
}

export default NavbarLink;