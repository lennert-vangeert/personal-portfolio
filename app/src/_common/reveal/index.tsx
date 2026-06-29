import { ElementType, ReactNode, CSSProperties } from "react";
import useInView from "@common/hooks/useInView";
import style from "./reveal.module.css";

type RevealProps = {
  as?: ElementType;
  from?: "up" | "left" | "right";
  /** stagger in ms */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  [key: string]: unknown;
};

/**
 * Scroll-reveal wrapper. Fades + slides its children into place once, the first
 * time it scrolls into view. Animates only opacity/transform (compositor-friendly).
 */
export const Reveal = ({
  as: Tag = "div",
  from = "up",
  delay = 0,
  className,
  style: styleProp,
  children,
  ...rest
}: RevealProps) => {
  const { ref, inView } = useInView<HTMLElement>();
  const Comp = Tag as ElementType;

  const cls = [
    style.reveal,
    from === "left" ? style.fromLeft : "",
    from === "right" ? style.fromRight : "",
    inView ? style.isVisible : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Comp
      ref={ref}
      className={cls}
      style={{ ...styleProp, transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
