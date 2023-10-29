import { useSesson } from "@/entities/session";
import { getAvatarUrl } from "@/entities/user";

export function Profile() {
  const { currentSesson } = useSesson();

  if (!currentSesson) return null;

  return (
    <div className="flex gap-2 items-center justify-end">
      <img className="w-8 h-8" src={getAvatarUrl(currentSesson.avatarId)} />
      <div className="text-lg">{currentSesson.name}</div>
    </div>
  );
}
