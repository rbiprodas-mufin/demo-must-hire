"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const role = session?.role;
  const is_profile_complete = session?.is_profile_complete;
  console.log("is_profile_complete", is_profile_complete);

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              JobBoard
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {status === "authenticated" && user && is_profile_complete ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="cursor-pointer h-9 w-9">
                    <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        role === "candidate"
                          ? "/user/dashboard"
                          : "/admin/dashboard"
                      )
                    }
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push("/signup")}
                  className="cursor-pointer"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
