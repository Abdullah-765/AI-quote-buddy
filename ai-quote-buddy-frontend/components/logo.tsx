"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a placeholder
  }

  return (
    <Image
      src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
      alt="Logo"
      width={100}
      height={100}
      priority
    />
  );
}
