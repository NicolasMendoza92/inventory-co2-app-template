"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowCircleLeft, FaBackward } from "react-icons/fa";

export const NavbarSettings = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-md">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/profile/client" ? "default" : "outline"}
        >
          <Link href="/profile/client">User</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile/settings" ? "default" : "outline"}
        >
          <Link href="/profile/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile/admin" ? "default" : "outline"}
        >
          <Link href="/profile/admin">Admin</Link>
        </Button>
        <Button asChild variant="ghost" className="gap-1">
          <Link href="/dashboard">
            <FaArrowCircleLeft /> Back dashboard
          </Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
