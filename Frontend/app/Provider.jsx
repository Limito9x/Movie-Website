"use client";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "@/redux/store";
export default function AppProvider({ children }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </CookiesProvider>
  );
}