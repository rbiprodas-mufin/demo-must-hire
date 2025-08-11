"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/layout/Header";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const path = usePathname();

  const isAdminRoute = path.includes("/admin");

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {!isAdminRoute && <Header />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Provider;
