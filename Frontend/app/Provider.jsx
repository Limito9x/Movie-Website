"use client";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function AppProvider({ children }) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </CookiesProvider>
  );
}