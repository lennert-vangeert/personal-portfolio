import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslate, delocalizeURL } from "@global/localization";
import LanguageToggle from "./LanguageToggle";
import "./navigation.css";

const normalize = (path: string) => {
  const stripped = delocalizeURL(path).replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
};

const NeonNav = () => {
  const { t, tL } = useTranslate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const items = [
    { label: t("header.nav.home"), href: tL("/") },
    { label: t("header.nav.projects"), href: tL("/projects") },
    { label: t("header.nav.lennertai"), href: tL("/ask-a-question") },
  ];

  const isActive = (href: string) => normalize(pathname) === normalize(href);

  const renderLinks = (onClick?: () => void) =>
    items.map((item) => (
      <li key={item.href} role="none">
        <Link
          role="menuitem"
          to={item.href}
          className={`neon-link${isActive(item.href) ? " is-active" : ""}`}
          aria-current={isActive(item.href) ? "page" : undefined}
          onClick={onClick}
        >
          {item.label}
        </Link>
      </li>
    ));

  return (
    <nav className="neon-nav" aria-label="Primary">
      <Link
        to={tL("/")}
        className="neon-logo"
        aria-label={t("header.nav.home")}
        onClick={() => setOpen(false)}
      >
        <span className="neon-logo-l">L</span>
        <span className="neon-logo-v">V</span>
        <span className="neon-logo-g">G</span>
      </Link>

      <div className="neon-nav-right">
        <ul className="neon-nav-links" role="menubar">
          {renderLinks()}
        </ul>

        <LanguageToggle />

        <button
          className="neon-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="neon-mobile-menu"
        className={`neon-mobile-menu${open ? " is-open" : ""}`}
      >
        <ul role="menu">{renderLinks(() => setOpen(false))}</ul>
      </div>
    </nav>
  );
};

export default NeonNav;
