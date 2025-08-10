"use client";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar>
        <Menu>
          {mobileMenuData.map((item) =>
            item.items ? (
              // Nếu có items → dùng SubMenu
              <SubMenu
                key={item.id}
                label={item.label}
                className={
                  isActiveParentChaild(item.items, usePathname())
                    ? "menu-active"
                    : ""
                }
              >
                {item.items.map((subItem, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => router.push(subItem.routePath)}
                    className={
                      isActiveLink(subItem.routePath, usePathname())
                        ? "menu-active-link"
                        : ""
                    }
                  >
                    {subItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              // Nếu chỉ có routePath → dùng MenuItem
              <MenuItem
                key={item.id}
                onClick={() => router.push(item.routePath)}
                className={
                  isActiveLink(item.routePath, usePathname())
                    ? "menu-active-link"
                    : ""
                }
              >
                {item.label}
              </MenuItem>
            )
          )}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;
