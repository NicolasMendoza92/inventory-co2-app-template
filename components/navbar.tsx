"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary w-full flex justify-between items-center p-4 rounded-xl shadow-md">
      <div className="flex gap-x-2">
      <Button asChild variant={pathname === "/dashboard" ? "default" : "outline"}>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
          <Link href="/client">User</Link>
        </Button>
      </div>
    </nav>
  );
};
