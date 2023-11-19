import { Session } from "@/entities/session";
import { MongoAbility, MongoQuery, defineAbility } from "@casl/ability";

type CRUD = "create" | "read" | "update" | "delete";
type Abilities =
  | ["sign-in-as" | "sign-out", "User" | { id: string }]
  | [
      CRUD | "update-access",
      "Board" | { ownerId: string; editorsIds: string[] },
    ]
  | [CRUD, "Task" | { authorId: string }];
type Conditions = MongoQuery;

export type Ability = MongoAbility<Abilities, Conditions>;

export const abilityFactory = (session: Session | undefined) => {
  return defineAbility<Ability>((can) => {
    if (!session) {
      can("sign-in-as", "User");

      return;
    }
    const userId = session.userId;

    can("sign-in-as", "User", { id: { $ne: userId } });
    can("sign-out", "User", { id: userId });

    // BOARD
    can("create", "Board");

    can("read", "Board", {
      ownerId: userId,
    });
    can("read", "Board", {
      editorsIds: { $in: [userId] },
    });

    can("delete", "Board", {
      ownerId: userId,
    });

    can("update", "Board", {
      ownerId: userId,
    });
    can("update-access", "Board", {
      ownerId: userId,
    });

    // TASK
    can("create", "Task");

    can("read", "Task", {
      authorId: userId,
    });

    can("delete", "Task", {
      authorId: userId,
    });

    can("update", "Task", {
      authorId: userId,
    });
  });
};
