"use client";

import MenuItem from "./menu-Item";
import MenuTitle from "./menu-title";
import { cn } from "@/lib/utils";

export default function MainMenu({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav
      className={cn(
        "overflow-auto rounded-2xl border border-[#e8d8c7] bg-[#fff8f0] p-4",
        className,
      )}
    >
      <header className="border-b border-[#e8d8c7] pb-4">
        <MenuTitle />
      </header>

      <div className="py-4">
        <MenuItem href="/" onNavigate={onNavigate}>
          Home
        </MenuItem>
        <MenuItem href="/recommendations" onNavigate={onNavigate}>
          Recommendations
        </MenuItem>
        <MenuItem href="/interactive_map" onNavigate={onNavigate}>
          Interactive Map of Austin
        </MenuItem>
        <MenuItem href="/virtual_guestbook" onNavigate={onNavigate}>
          Virtual Guestbook
        </MenuItem>
        <MenuItem href="/report_issue" onNavigate={onNavigate}>
          Report an Issue
        </MenuItem>
      </div>
    </nav>
  );
}
