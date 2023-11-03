import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { CreateUserForm, UsersList } from "@/features/users-list";
import { UsersPageProviers } from "./users-providers";

export function UsersPage() {
  return (
    <UsersPageProviers>
      <UiCetnerContentLayout className="py-10">
        <h1 className="text-3xl ">Пользователи</h1>
        <h2 className="text-lg mb-2 font-semibold mt-10">
          Добавить пользователя
        </h2>
        <CreateUserForm />
        <h2 className="text-lg mb-2 font-semibold mt-10">Все пользователи</h2>
        <UsersList />
      </UiCetnerContentLayout>
    </UsersPageProviers>
  );
}
