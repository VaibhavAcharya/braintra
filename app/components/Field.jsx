import { forwardRef } from "react";

import Input from "./Input";

// import Lock from "../icons/Lock";
// import Ban from "../icons/Ban";
// import Beaker from "../icons/Beaker";

function Field(
  {
    component: Component = Input,
    id,
    label,
    required = true,
    // private = false,
    disabled = false,
    error = null,
    children,
    ...otherProps
  },
  ref
) {
  return (
    <div className="min-w-0 flex-1 flex flex-col items-stretch justify-start gap-1">
      {label ? (
        <label
          htmlFor={id}
          className="flex flex-row items-center justify-start gap-2"
        >
          <span
            className={[
              "font-bold text-sm uppercase whitespace-nowrap",
              disabled ? "opacity-40 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {label}
          </span>
          {/* {disabled ? <Ban size={12} className="text-white/75" /> : null} */}
          {/* {private ? <Lock size={12} className="text-white/75" /> : null} */}
          {!required ? (
            <span className="text-xs text-white/75">(Optional)</span>
          ) : null}
        </label>
      ) : null}

      <Component
        ref={ref}
        id={id}
        required={required}
        disabled={disabled}
        {...otherProps}
      />

      {error ? (
        <p className="text-xs text-red-400/95 font-medium">{error}</p>
      ) : null}

      {children}
    </div>
  );
}

export default forwardRef(Field);