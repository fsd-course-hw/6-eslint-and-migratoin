import { useSession } from "@/entities/session";

import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { subject } from "@casl/ability";
import { useMemo } from "react";
import { Ability, abilityFactory } from "./ability-factory";

export const abilityContext = createStrictContext<Ability>();

export const useAbility = () => {
  return useStrictContext(abilityContext);
};
export { subject };

export const useAbilityFactory = () => {
  const session = useSession((s) => s.currentSession);

  const ability = useMemo(() => {
    return abilityFactory(session);
  }, [session]);

  return ability;
};
