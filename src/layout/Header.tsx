"use client";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              JobBoard
            </span>
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
