import { FOCUS_STYLES, HOVER_STYLES } from "./constants";

export default function Anchor({
  as: As = "a",
  children,
  className = "",
  styled = true,
  ...otherProps
}) {
  return (
    <As
      className={[
        styled ? ["text-teal-400/95", "hover:underline hover:underline-offset-2 hover:decoration-teal-800/80",
        HOVER_STYLES].join(" ") : null,
        FOCUS_STYLES,
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}