"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Link from "next/link";
import { useWebSocket } from "@/hooks/useWebSocket";

const navItems = [
  {
    name: "nmap",
    path: "/nmap",
  },
  {
    name: "action",
    path: "/nmap/action2",
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  const { connectionStatus } = useWebSocket();

 

  return (
    <>
      <div className="container mx-auto ">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Tools</MenubarTrigger>
            <MenubarContent>
              {navItems.map((data, index) => (
                <MenubarItem key={index} asChild>
                  <Link href={data.path}>{data.name}</Link>
                </MenubarItem>
              ))}

              <MenubarSeparator />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div
          className={`p-2 rounded-2xl mt-5 mb-8 text-white text-center ${
            connectionStatus ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {connectionStatus
            ? "Connected to server"
            : "Disconnected from server - Trying to reconnect..."}
        </div>
        {children}
      </div>
    </>
  );
}
