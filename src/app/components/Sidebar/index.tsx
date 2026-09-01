import {
  Sidebar as SidebarUi,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NavLinks from "../NavLinks";
import { Logo } from "../Logo";
import { Logout } from "../Logout";
import { Suspense } from "react";

export function Sidebar() {
  return (
    <SidebarUi className="p-2">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-4 md:p-0">
        <Suspense>
          <NavLinks />
        </Suspense>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </SidebarUi>
  );
}
