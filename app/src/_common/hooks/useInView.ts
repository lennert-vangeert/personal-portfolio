import { useEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
  /** Reveal once then stop observing (default). Set false to toggle both ways. */
  once?: boolean;
};

/**
 * Cheap scroll-reveal trigger. One IntersectionObserver per element, disconnected
 * after the first reveal. Returns inView=true immediately when IntersectionObserver
 * is unavailable or the user prefers reduced motion (content is never left hidden).
 */
export function useInView<T extends Element = HTMLDivElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}

export default useInView;
