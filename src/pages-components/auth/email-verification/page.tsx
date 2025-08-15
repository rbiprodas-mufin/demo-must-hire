"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function EmailVerification() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axiosInstance.post(
          `/auth/verify-email?token=${token}`
        );
        console.log("response", response);
        setStatus("success");
        setTimeout(() => {
          router.push(`/login?redirect=${response?.data?.data?.redirect_url}`);
        }, 3000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    if (token) {
      verify();
    } else {
      setStatus("error");
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center space-y-6 border border-gray-200">
        {status === "verifying" && (
          <>
            <div className="flex justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
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
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-green-700">
              Email Verified!
            </h2>
            <p className="text-gray-600">
              You’ll be redirected shortly. Welcome aboard! 🎉
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-500">
              The verification link is invalid or has expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
