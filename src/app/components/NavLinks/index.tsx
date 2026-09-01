"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { links } from "@/src/app/data/navLinks";
import { buttonVariants } from "@/components/ui/button";

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
          (link.href.includes("/compras") ||
            link.href.includes("/responsaveis")) &&
          queryString
        ) {
          finalHref = `${link.href}?${queryString}`;
        }

        return (
          <Link
            key={link.name}
            href={finalHref}
            className={`${buttonVariants({ variant: "outline", size: "icon" })} flex w-full items-center border border-gray-200
              gap-2 rounded-md p-3 text-md font-medium 
              hover:text-violet-300
              justify-start md:p-2 md:px-3 cursor-pointer
            ${pathname === link.href ? "text-violet-300 bg-sky-100" : ""}
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
