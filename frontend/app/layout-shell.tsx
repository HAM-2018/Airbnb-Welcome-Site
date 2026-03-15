"use client";

import { MenuIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import MainMenu from "./components/main-menu";
import MenuTitle from "./components/menu-title";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen md:grid md:grid-cols-[250px_1fr]">
      <MainMenu className="hidden md:flex md:flex-col" />

      {!isDesktop && (
        <div className="sticky top-0 left-0 z-40 flex justify-between border-b border-border bg-background p-4 md:hidden">
          <MenuTitle />
          <Drawer
            direction="right"
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <DrawerTrigger aria-label="Open menu">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <VisuallyHidden>
                <DrawerTitle>Navigation Menu</DrawerTitle>
              </VisuallyHidden>
              <MainMenu onNavigate={() => setMobileMenuOpen(false)} />
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div className="overflow-auto px-4 py-2">{children}</div>
    </div>
  );
}
