"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="w-full relative">
        <Header />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
