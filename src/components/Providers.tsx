"use client"

import { CartProvider } from "@/context/CartContext"
import { SessionProvider } from "next-auth/react"
import { ReactNode, useEffect, useState } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider>
      <CartProvider>
        <div suppressHydrationWarning style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </CartProvider>
    </SessionProvider>
  );
}