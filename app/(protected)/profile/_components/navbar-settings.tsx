"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const NavbarSettings = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full justify-between items-center p-4 rounded-xl shadow-md md:w-[600px]">
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/profile" ? "default" : "outline"}
        >
          <Link href="/profile">User</Link>
        </Button>
        <Button
          variant={pathname === "/profile/settings" ? "default" : "outline"}
        >
          <Link href="/profile/settings">Settings</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
