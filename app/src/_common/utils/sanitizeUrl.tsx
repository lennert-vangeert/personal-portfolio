import { ReactNode, useCallback } from "react";
import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

/**
 * Hook that converts:
 *  - Markdown links: [text](url)  => <Anchor component={Link} to={url}>{text}</Anchor>
 *  - HTML anchor tags in a string: <a href="...">text</a> => same Anchor component
 *
 * Returns a ReactNode safe to render directly.
 */
export default function useSanitizeURL() {
  return useCallback((input: string): ReactNode => {
    if (!input) return null;

    // If the string contains HTML tags, try to parse them and convert <a> tags into Anchor components.
    if (/<\/?[a-z][\s\S]*>/i.test(input)) {
      try {
        // Parse HTML and walk nodes
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, "text/html");
        const nodes = Array.from(doc.body.childNodes);

        const reactNodes: ReactNode[] = [];
        let key = 0;

        const walk = (node: ChildNode) => {
          if (node.nodeType === Node.TEXT_NODE) {
            reactNodes.push(node.textContent || "");
            return;
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.tagName.toLowerCase() === "a") {
              const href = (el.getAttribute("href") || "").trim();
              const inner = el.textContent || href || "";
              reactNodes.push(
                <Anchor
                  key={`a-${key++}`}
                  component={Link}
                  to={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {inner}
                </Anchor>
              );
            } else {
              // For non-anchor elements, preserve their text content (simple approach).
              // If you want to preserve more complex structure (bold, italics), extend this block.
              reactNodes.push(el.textContent || "");
            }
            return;
          }
        };

        nodes.forEach(walk);

        // If nothing converted, fall back to raw text
        if (reactNodes.length === 0) return input;
        return <>{reactNodes}</>;
      } catch {
        // If parser fails, fall back to markdown parsing below
      }
    }

    // Markdown parser for [text](url). Allows typical URL forms.
    const mdRegex = /\[([^\]]+)\]\((\s*([^)\s]+(?:\s+"[^"]*")?)\s*)\)/g;
    // Explanation: capture link text in group 1, capture url (group 3) allowing optional title (we ignore title).
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    // Use a fresh regex (above) each call so lastIndex isn't shared.
    while ((match = mdRegex.exec(input)) !== null) {
      const matchStart = match.index;
      const matchEnd = mdRegex.lastIndex;
      const linkText = match[1];
      // match[2] contains the whole url + optional title; match[3] is the bare url
      const rawUrl = (match[3] || "").trim();

      // push text before match
      if (matchStart > lastIndex) {
        parts.push(input.slice(lastIndex, matchStart));
      }

      let url = rawUrl;
      // If protocol-relative URL ("//domain"), add current protocol
      if (url.startsWith("//") && typeof window !== "undefined") {
        url = window.location.protocol + url;
      }
      // If URL is missing protocol but looks like a domain, you may want to add https://
      // -- but be conservative: only prepend https:// for strings starting with "www." or containing a dot.
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url) && /^(www\.|.*\..+)/.test(url)) {
        url = "https://" + url;
      }

      parts.push(
        <Anchor
          key={`md-${key++}`}
          component={Link}
          to={url}
          target={url.startsWith("http") ? "_blank" : undefined}
          rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkText}
        </Anchor>
      );

      lastIndex = matchEnd;
    }

    // push remaining text
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }

    // if no markdown matches, just return the original string
    if (parts.length === 0) return input;

    return <>{parts}</>;
  }, []);
}
