"use client"

import { useEffect } from "react";
import { useAuthUserStore } from "@/store/useAuthUserStore";

export function AuthUserLoader() {
  useEffect(() => {
    useAuthUserStore.getState().fetchUser();
  }, []);

  return null;
}
