"use client";

import { CheckCircleIcon, Loader2Icon, MailCheckIcon, XCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import apiClient from "~/utils/axios";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      const response = await apiClient.post(`/auth/verify-email?token=${token}`,
        {},
        { validateStatus: () => true }
      );
      if (response?.status === 200) {
        setStatus("success");
        setTimeout(() => {
          router.push(`/login?redirect=${response?.data?.data?.redirect_url}`);
        }, 3000);
      } else {
        setStatus("error");
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <Card className="max-w-md pt-5">
          <CardContent className="flex flex-col gap-3 justify-center items-center text-center">
            <MailCheckIcon className="h-12 w-12 text-teal-600" />

            <h2 className="text-2xl font-bold text-blue-950">Verify Your Email</h2>
            <p className="text-gray-600">
              We&apos;ve sent a verification link to your email address. Please check
              your inbox and click the link to verify your account.
            </p>

            <p className="text-sm text-gray-400">
              Once verified, you&apos;ll be redirected automatically.
            </p>

            <div className="text-sm text-gray-500">
              Didn&apos;t get the email?{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                Resend verification
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)]">
      <Card className={cn("w-sm pt-5", {
        "border-gray-300": status === "verifying",
        "border-red-200": status === "error",
        "border-emerald-200": status === "success",
      })}>
        <CardContent className="flex flex-col gap-4 justify-center items-center text-center">
          {status === "verifying" && (
            <>
              <div className="flex justify-center">
                <Loader2Icon className="h-10 w-10 animate-spin text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Verifying your email...
              </h2>
              <p className="text-gray-500">
                Please wait while we confirm your email address.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center">
                <CheckCircleIcon className="h-10 w-10 text-emerald-500" />
              </div>
              <h2 className="text-xl font-semibold text-teal-700">
                Email Verified!
              </h2>
              <p className="text-gray-600">
                You&apos;ll be redirected shortly. Welcome aboard! 🎉
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center">
                <XCircleIcon className="h-10 w-10 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-red-500">
                Verification Failed
              </h2>
              <p className="text-gray-500">
                The verification link is invalid or has expired.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
