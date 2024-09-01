'use client'
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      DashboardPage
      <p className="m-6">{JSON.stringify(user)}</p>
      <LogoutButton>
        <Button variant="outline">
        Sing out
        </Button>
        
      </LogoutButton>
    </div>
  );
};

export default DashboardPage;
