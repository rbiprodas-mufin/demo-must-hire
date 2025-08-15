"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "~/components/ui/labels";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const role = sessionData?.role;
      const isProfileComplete = sessionData?.is_profile_complete;
      let fallbackRedirect = "";

      if (role === "candidate") {
        if (isProfileComplete) {
          fallbackRedirect = "/user/dashboard";
        } else {
          fallbackRedirect = "/onboarding";
        }
      } else if (role === "admin" || role === "hr") {
        fallbackRedirect = "/admin/dashboard";
      } else {
        fallbackRedirect = "/";
      }

      router.push(fallbackRedirect || `/onboarding/redirect=${redirectPath}`);
    } else {
      toast.error(res?.error || "Invalid login credentials");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center mb-5">
      <div className="max-w-xl w-full space-y-5">
        <div className="text-center">
          <div className="flex justify-center">
            <Briefcase className="h-12 w-12 text-blue-primary" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href={`/signup?redirect=${encodeURIComponent(
                redirectPath as string
              )}`}
              className="font-medium text-blue-primary hover:text-blue-primary/80"
            >
              create a new account
            </Link>
          </p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  {...register("email")}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  {...register("password")}
                  className="mt-1 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 cursor-pointer top-9 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-primary hover:text-blue-primary/80"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
