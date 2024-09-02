"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

  const onServerActionClick = () => {
    admin()
    .then((data) => {
      if (data.error) {
        toast.error(data.error)
      }
      if (data.success){
        toast.success(data.success)
      }
    })
  }

// POr si queremos usar una api externa , y no server actions.. 

  // const onApiRouteClick =  () => {
  //   fetch("/api/admin")
  //   .then((response) => {
  //     if (response.ok) {
  //       toast.success("Allowed API Route")
  //     } else {
  //       toast.error("Forbidden API route")
  //     }
  //   })
  // }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are allow to manage"/>
      </RoleGate>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium"> Register new user to Inventory </p>
        <Button onClick={onServerActionClick}>
          Create new one
        </Button>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium"> Manage forms  </p>
        <Button onClick={onServerActionClick}>
          Enable editor mode
        </Button>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium"> Import templates  </p>
        <Button onClick={onServerActionClick}>
          Add new tempalte
        </Button>
      </div>
      </CardContent>
      
    </Card>
  );
};

export default AdminPage;
