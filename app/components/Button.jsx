import { forwardRef } from "react";

import { DISABLED_STYLES, FOCUS_STYLES, HOVER_STYLES } from "./constants";

export const ButtonSizes = {
  small: "px-2 py-1 text-xs",
  medium: "px-4 py-1",
  large: "px-6 py-2 text-lg",
};
export const ButtonAppearances = {
  primary: "bg-teal-900/95",
  secondary: "bg-white/20",
};

function Button(
  {
    as: As = "button",
    children,
    size = "medium",
    primary = false,
    className = "",
    ...otherProps
  },
  ref
) {
  return (
    <As
      ref={ref}
      className={[
        "font-medium rounded-lg",
        ButtonSizes[size],
        ButtonAppearances[primary ? "primary" : "secondary"],
        HOVER_STYLES,
        FOCUS_STYLES,
        DISABLED_STYLES,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}

export default forwardRef(Button);
