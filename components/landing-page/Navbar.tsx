'use client';
import { useState } from "react";
import Image from "next/image"; // Import Image for the logo
import Link from "next/link"; // Ensure Link is imported if you're using it without the full path
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons"; // Keep if linking to a GitHub repo
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
// import { LogoIcon } from "./Icons"; // Remove LogoIcon, as we're using Image

interface RouteProps {
  href: string;
  label: string;
}

// Updated navigation links for a PKL/Internship landing page
const routeList: RouteProps[] = [
  {
    href: "#benefits", // e.g., Benefits of interning at Sarastya
    label: "Benefits",
  },
  {
    href: "#programs", // e.g., Details about PKL/Internship programs
    label: "Programs",
  },
  {
    href: "#how-to-apply", // e.g., Step-by-step application guide
    label: "How to Apply",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              href="/"
              className="ml-2 font-bold text-xl flex items-center gap-2"
            >
              <Image
                src="/sarastya-logo-warna.jpeg"
                alt="Sarastya Agility Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              Sarastya Agility
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Sarastya Agility
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <Link
                    href="/sign-in" // CHANGED: Updated to /sign-in to match /app/sign-in/page.tsx
                    onClick={() => setIsOpen(false)}
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    Sign In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              href="/sign-in" // CHANGED: Updated to /sign-in to match /app/sign-in/page.tsx
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              Sign In
            </Link>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};