import { forwardRef } from "react";

import { DISABLED_STYLES, FOCUS_STYLES, HOVER_STYLES } from "./constants";

function Input({ className = "", ...otherProps }, ref) {
  return (
    <input
      ref={ref}
      className={[
        "font-medium px-4 py-1 bg-white/20 rounded-lg",
        "min-w-0 placeholder:text-white/75",
        HOVER_STYLES,
        DISABLED_STYLES,
        FOCUS_STYLES,
        className,
      ].join(" ")}
      {...otherProps}
    />
  );
}

export default forwardRef(Input);
