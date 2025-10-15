"use client";

import { useState, useEffect, ReactNode } from "react";

type SafeMountWrapperProps = {
  children: ReactNode;
};

/**
 * SafeMountWrapper đảm bảo children chỉ được render sau khi component đã mount hoàn toàn.
 * Điều này giúp ngăn chặn các lỗi React state update on unmounted component.
 */
export function SafeMountWrapper({ children }: SafeMountWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Đánh dấu component đã được mount
    setIsMounted(true);

    // Cleanup khi unmount
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Chỉ render children khi component đã mount
  if (!isMounted) {
    return null; // Hoặc return loading indicator nếu cần
  }

  return <>{children}</>;
}
