"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const NavbarSettings = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl w-[600px] shadow-md">
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/settings/user" ? "default" : "outline"}
        >
          <Link href="/settings/user">User</Link>
        </Button>
        
        <Button
          variant={pathname === "/settings/admin" ? "default" : "outline"}
        >
          <Link href="/settings/admin">Admin</Link>
        </Button>
        <Button
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
