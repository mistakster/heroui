import type OriginalHeroInput from "../../components/input/src/input";
import type OriginalHeroTextarea from "../../components/input/src/textarea";

import {extendVariants} from "../../core/system";

export function extendInput(component: typeof OriginalHeroInput) {
  return extendVariants(component, {
    variants: {
      variant: {
        bordered: {
          inputWrapper: [
            "border-small",
            "border-default-900",
            "data-[hover=true]:border-default-800",
          ],
        },
      },
    },
    compoundVariants: [
      {
        variant: "bordered",
        color: "primary",
        class: ["border-primary", "data-[hover=true]:border-primary"],
      },
      {
        variant: "bordered",
        color: "secondary",
        class: ["border-secondary", "data-[hover=true]:border-secondary"],
      },
    ],
  });
}

export function extendTextarea(component: typeof OriginalHeroTextarea) {
  return extendVariants(component, {
    variants: {
      variant: {
        bordered: {
          inputWrapper: ["border-small", "border-primary", "data-[hover=true]:border-primary"],
        },
      },
    },
  });
}
