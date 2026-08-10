"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { links } from "@/src/app/data/navLinks";

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        let finalHref = link.href;
        if (
          (link.href.includes('/compras') || link.href.includes('/responsaveis'))
          && queryString
        ) {
          finalHref = `${link.href}?${queryString}`;
        }

        return (
          <Link
            key={link.name}
            href={finalHref}
            className={`flex w-full grow items-center 
              gap-2 rounded-md p-3 text-md font-medium 
              hover:bg-sky-100 hover:text-violet-600 md:flex-none 
              justify-start md:p-2 md:px-3 cursor-pointer
            ${pathname === link.href ? "text-violet-600" : ""}
            `}
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}