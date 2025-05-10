import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

import Link from "next/link";


const navItems = [
    {
        name: "nmap",
        path: "/nmap",
    },
    {
        name: "log",
        path: "/nmap/log",
    },

];

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Tools</MenubarTrigger>
                <MenubarContent>
                    
                    
                    <MenubarItem
                    asChild
                    >
                        <Link
                            href={'/nmap/log'}
                        >
                            log
                        </Link>
                    </MenubarItem>

                    <MenubarItem
                    asChild
                    >
                        <Link
                            href={'/nmap'}
                        >
                            nmap
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
        {children}


        </>
    )
}



