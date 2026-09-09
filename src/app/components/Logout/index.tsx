"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/src/backend/User/logout";
import { Loader, LogOut } from "lucide-react";
import { useState } from "react";

export function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await logout();
    setLoading(false);
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
      {loading && (
        <div className="absolute top-0 left-0 h-full w-screen backdrop-blur-xs flex items-center justify-center">
          <Loader size={100} className="animate-spin"/>
        </div>
      )}
    </form>
  );
}
