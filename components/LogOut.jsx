"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { DropdownMenuItem } from "./ui/dropdown-menu"

const LogOut = () => {
    return (
        <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="#" onClick={() => { signOut() }}>Logout</Link>
        </DropdownMenuItem>
    )
}

export default LogOut
