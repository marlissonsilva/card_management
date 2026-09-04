"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { links } from "@/src/app/data/navLinks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const [clickedUrl, setClickedUrl] = useState<string | null>(null);

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

        const isActive = pathname === link.href;
        const isLoading = clickedUrl === finalHref && !isActive;

        return (
          <Link
            key={link.name}
            href={finalHref}
            className={isLoading ? "pointer-events-none opacity-80" : ""}
            onClick={(e) => {
              if (isLoading || isActive) {
                e.preventDefault();
                return;
              }
              setClickedUrl(finalHref);
            }}
          >
            <Button
              variant={"outline"}
              type="button"
              disabled={isLoading}
              className={`flex w-full items-center gap-2 rounded-md p-3 text-md font-medium justify-between md:p-2 md:px-3 cursor-pointer
              `}
            >
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                ) : (
                  <LinkIcon className="w-5 h-5" />
                )}
                <p>{link.name}</p>
              </div>

              {isActive && !isLoading && (
                <span className="w-3 h-3 bg-destructive rounded-full justify-items-end"></span>
              )}
            </Button>
          </Link>
        );
      })}
    </>
  );
}
