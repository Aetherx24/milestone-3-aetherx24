"use client"

import { CartProvider } from "@/context/CartContext"
import { ReactNode, useEffect, useState } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <CartProvider>{children}</CartProvider> : null;
}