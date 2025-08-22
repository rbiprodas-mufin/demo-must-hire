'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LoginSchema } from "../apis/schemas";
import { BackButton } from "../components/back-button";
import Link from "next/link";

export const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: absoluteUrl("/dashboard"),
    });

    if (res?.error) {
      toast.error("Invalid login credentials");
      setIsLoading(false);
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const sessionData = await sessionRes.json();
    const user = sessionData?.user;
    let fallbackRedirect = "";

    if (user?.role === "candidate") {
      if (user?.is_profile_complete) {
        fallbackRedirect = "/user/dashboard";
      } else {
        fallbackRedirect = "/onboarding";
      }
    } else if (user?.role === "admin" || user?.role === "hr") {
      fallbackRedirect = "/admin/dashboard";
    } else {
      fallbackRedirect = "/";
    }

    router.push(fallbackRedirect || `/onboarding/redirect=${redirectPath}`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-1 text-blue-950">Welcome back!</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={field.name}>Email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={isLoading || isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name}>Password</Label>
                    <Link href="/forgot-password" className="text-xs text-gray-700 font-medium hover:underline">Forgot Your password?</Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={isLoading || isPending}
                      placeholder="******"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isLoading || isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      {/* <Divider>Or continue with</Divider>
      <SocialAuth /> */}

      <div className="text-center">
        <BackButton label="Don&apos;t have an account? Signup" href="/signup" />
      </div>
    </div>
  );
};
