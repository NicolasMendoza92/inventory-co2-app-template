"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const user = useCurrentUser();

  return (
    <main className="flex h-full flex-col items-center justify-center bg-whitesomke ">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-primary drop-shadow-md",
            font.className
          )}
        >
          Company Name
        </h1>
        <p>Sing up to manage the inventory</p>
        <div>
          {!user? (
            <>
              <LoginButton>
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </LoginButton>
            </>
          ): <Button variant="outline"><Link href="/dashboard"> Go to Dashboard</Link></Button>}
        </div>
      </div>
    </main>
  );
}
