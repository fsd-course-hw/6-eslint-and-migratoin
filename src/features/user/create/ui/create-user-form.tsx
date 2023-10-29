import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

import { UiButton } from "@/shared/ui/ui-button";
import { UiImageSelect } from "@/shared/ui/ui-image-select";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { getAvatarUrl, useUsers } from "@/entities/user";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function CreateUserForm({ className }: { className?: string }) {
  const { createUser } = useUsers();
  const { control, reset, handleSubmit } = useForm<CreateUserFormData>({
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Добавить пользователя</h2>
      <form
        onSubmit={handleSubmit((data) => {
          createUser?.(data);
          reset();
        })}
        className={clsx("flex flex-col gap-4")}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Имя пользователя - обязательное поле" }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Имя нового пользователя"
              inputProps={{ ...field }}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="avatarId"
          rules={{ required: "Аватар - обязательное поле" }}
          render={({ field: { value, onChange }, fieldState }) => (
            <UiImageSelect
              label="Выберете аватар пользователя"
              value={value}
              onChange={onChange}
              getSrc={getAvatarUrl}
              images={Array.from({ length: 8 }, (_, i) => i + 1)}
              error={fieldState.error?.message}
            />
          )}
        />
        <UiButton variant="primary" type="submit">
          Создать
        </UiButton>
      </form>
    </div>
  );
}
