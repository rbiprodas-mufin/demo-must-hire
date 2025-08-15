"use client";

import { MailCheck } from "lucide-react";

const VerifyEmailPage = () => {
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="bg-white shadow-xl rounded-xl border border-gray-200 p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <MailCheck className="h-12 w-12 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>

        <p className="text-gray-600 text-base">
          We’ve sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>

        <p className="text-sm text-gray-400">
          Once verified, you&apos;ll be redirected automatically.
        </p>

        <div className="text-sm text-gray-500">
          Didn’t get the email?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Resend verification
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
