"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/src/backend/User/logout";
import { LogOut } from "lucide-react";

export function Logout() {
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logout();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button
        type="submit"
        className="flex w-full grow items-center gap-2 rounded-md p-3 border border-gray-200 text-sm font-medium hover:bg-sky-100 hover:text-violet-600 justify-start md:p-2 md:px-3 cursor-pointer"
      >
        <LogOut className="w-6" />
        <span>Sair</span>
      </Button>
    </form>
  );
}
