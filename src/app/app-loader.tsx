import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";
import { useTasks } from "@/entities/task";
import { useUsers } from "@/entities/user";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadUsers = useUsers((s) => s.loadUsers);
  const loadSession = useSession((s) => s.loadSession);
  const loadBoards = useBoards((s) => s.loadBoards);
  const loadTasks = useTasks((s) => s.loadTasks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      loadSession(),
      loadUsers(),
      loadBoards(),
      loadTasks(),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [loadSession, loadUsers, loadBoards, loadTasks]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
