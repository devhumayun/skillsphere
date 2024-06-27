"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

import defaultAvater from '@/public/images/avatar.jpeg';
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MainNav({ items, children, loggedInUser }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loggedInSession, setLoggedInSession] = useState(null)
    const { data: session } = useSession()

    const fullName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`

    const avatarFallBack = loggedInUser?.firstName.substring(0, 2)

    if (session?.error === "RefreshAccessTokenError") {
        redirect("/login")
    }

    useEffect(() => {
        setLoggedInSession(session)
    }, [session])

    return (
        <>
            <div className="flex gap-6 lg:gap-10">
                <Link href="/">
                    <Logo />
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 lg:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                                )}>
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}

                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
            <nav className="flex items-center gap-3">
                {
                    !loggedInSession &&
                    <div className="items-center gap-3 hidden lg:flex">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                            Login
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Register
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-4">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/register/student">Student</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/register/instructor">Instructor</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Avatar>
                                <AvatarImage
                                    src={loggedInUser?.image ? loggedInUser?.image : defaultAvater}
                                    className="object-cover"
                                    alt={fullName}
                                />
                                <AvatarFallback><span className="uppercase font-bold">{avatarFallBack}</span></AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/account/enrolled-courses">My Courses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="">Testimonials & Certificates</Link>
                        </DropdownMenuItem>
                        {
                            loggedInSession &&
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link href="#" onClick={() => { signOut() }}>Logout</Link>
                            </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <button
                    className="flex items-center space-x-2 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav >
        </>
    );
}
