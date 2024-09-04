"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/LanguageProvider";
import { useTheme } from "next-themes";
import { LogoutButton } from "../auth/logout-button";
import { ExternalLinkIcon } from "lucide-react";

type ActionsProps = {
  username?: string | null;
};

export default function Actions({ username }: ActionsProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-4">
      {username && (
        <>
          <span className="mr-2">{username}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" icon="logOut"></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <LogoutButton>
                <DropdownMenuItem>
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" icon="globe"></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("es")}>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        variant="ghost"
        size="icon"
        icon={theme === "light" ? "moon" : "sun"}
      ></Button>
    </div>
  );
}
