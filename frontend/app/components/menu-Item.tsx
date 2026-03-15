"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  href: string;
  onNavigate?: () => void;
};

export default function MenuItem({ children, href, onNavigate }: Props) {
  const pathName = usePathname();
  const normalize = (value: string) => value.replace(/\/+$/, "") || "/";
  const currentPath = normalize(pathName);
  const targetPath = normalize(href);
  const isActive =
    targetPath === "/" ? currentPath === targetPath : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

  return (
    <Link
      className={cn(
        "block rounded-md p-2 text-muted-foreground hover:bg-white hover:text-foreground",
        isActive &&
          "bg-green-500 text-primary-foreground hover:bg-green-600 hover:text-primary-foreground"
      )}
      href={href}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
