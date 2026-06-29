import { Title } from "@mantine/core";
import type { TitleProps } from "@mantine/core";

export type NeonColor =
  | "magenta"
  | "cyan"
  | "orange"
  | "yellow"
  | "lime"
  | "purple";

type GlowOpts = { soft?: boolean; flicker?: boolean };

/** Shared className builder so any element can pick up the neon glow recipe. */
export const neonTextClass = (
  color: NeonColor = "magenta",
  { soft, flicker }: GlowOpts = {}
) =>
  [
    soft ? "neon-text--soft" : "neon-text",
    `neon-text--${color}`,
    flicker ? "neon-flicker-hover" : "",
  ]
    .filter(Boolean)
    .join(" ");

type NeonTitleProps = TitleProps &
  GlowOpts & {
    neon?: NeonColor;
  };

/** Mantine Title with a neon glow — drops into existing <Title> call-sites. */
export const NeonTitle = ({
  neon = "magenta",
  soft,
  flicker,
  className,
  ...rest
}: NeonTitleProps) => (
  <Title
    className={[neonTextClass(neon, { soft, flicker }), className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  />
);

export default NeonTitle;
