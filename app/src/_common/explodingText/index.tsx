import { useEffect, useRef } from "react";

export const ExplodingText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.innerHTML = "";

    text.split("").forEach((char) => {
      const outer = document.createElement("span");
      outer.className = "outer";

      // Random transform for explosion on hover
      const randomX = Math.floor(Math.random() * 100 - 50); // -50% to +50%
      const randomY = Math.floor(Math.random() * 100 - 50);
      const randomRotate = Math.floor(Math.random() * 20 - 10); // -10deg to +10deg
      outer.style.setProperty("--translate-x", `${randomX}%`);
      outer.style.setProperty("--translate-y", `${randomY}%`);
      outer.style.setProperty("--rotate", `${randomRotate}deg`);

      const inner = document.createElement("span");
      inner.className = "inner";

      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = char === " " ? "\u00A0" : char;

      inner.appendChild(letter);
      outer.appendChild(inner);
      element.appendChild(outer);
    });
  }, [text]);

  return (
    <>
      <style>{`
        .fancy span {
          display: inline-block;
        }

        .outer {
          display: inline-block;
          transition: transform 350ms ease;
        }

        .inner {
          display: inline-block;
        }

        .letter {
          display: inline-block;
        }

        .fancy:hover .outer {
          transform: translate(var(--translate-x), var(--translate-y)) rotate(var(--rotate));
          transition-duration: 800ms;
        }

        .fancy:hover .inner {
          animation: float 5s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0%); }
          50% { transform: translateY(-3%); }
        }
      `}</style>
      <span ref={elementRef} className={`fancy ${className}`} />
    </>
  );
};