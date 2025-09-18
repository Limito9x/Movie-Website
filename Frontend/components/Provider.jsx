"use client";
import { CookiesProvider } from "react-cookie";
export default function Provider({ children }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}