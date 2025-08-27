'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSignupMutation } from "../apis/queries";
import { RegisterSchema } from "../apis/schemas";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const { mutate: signup, isPending } = useSignupMutation();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    signup(values, {
      onSuccess: () => {
        toast.success("Account created successfully.");
        form.reset();
        router.push("/verify-email");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    disabled={isPending}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={isPending}
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
                <Label htmlFor={field.name}>Password</Label>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    disabled={isPending}
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
        <Button disabled={isPending} type="submit" className="w-full">
          Create an account
        </Button>
      </form>
    </Form>
  );
};
