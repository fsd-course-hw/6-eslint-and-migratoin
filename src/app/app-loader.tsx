import { useSesson } from "@/entities/session";
import { useUsers } from "@/entities/user";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadUsers = useUsers((s) => s.loadUsers);
  const loadSession = useSesson((s) => s.loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([loadSession(), loadUsers()]).finally(() => {
      setIsLoading(false);
    });
  }, [loadSession, loadUsers]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
