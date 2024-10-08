"use client"
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

import React from "react";

const ProfilePage =  () => {
  const user =  useCurrentUser();
  return <UserInfo label="User Information" user={user} />;
};

export default ProfilePage;