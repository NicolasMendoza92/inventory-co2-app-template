"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "@/components/auth/login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: Boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent">
          <LoginForm/>
        </DialogContent>
        Hace modal
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
