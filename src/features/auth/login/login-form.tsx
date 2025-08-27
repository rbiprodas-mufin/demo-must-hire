'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
                  <Link href="/forgot-password" className="text-xs text-gray-700 font-medium hover:underline">Forgot your password?</Link>
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
  );
};
