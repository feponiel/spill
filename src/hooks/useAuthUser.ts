/* import { useEffect } from "react";
import { useAuthUserStore } from "@/store/useAuthUserStore";

export function useAuthUser() {
  const { user, isLoading, fetchUser } = useAuthUserStore();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  return { data: user, isLoading };
}
 */