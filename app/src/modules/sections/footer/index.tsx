import { useTranslate } from "@global/localization";
import "./footer.css";

const links = [
  { key: "linkedin", href: "https://www.linkedin.com/in/lennert-van-geert/" },
  { key: "github", href: "https://github.com/lennert-vangeert" },
  { key: "email", href: "mailto:lennert@lennertvg.be" },
] as const;

const Footer = () => {
  const { t } = useTranslate();
  const year = new Date().getFullYear();

  return (
    <footer className="neon-footer">
      <div className="neon-footer-divider" aria-hidden="true" />
      <div className="neon-footer-inner">
        <span className="neon-footer-logo" aria-hidden="true">
          <span className="footL">L</span>
          <span className="footV">V</span>
          <span className="footG">G</span>
        </span>

        <ul className="neon-footer-links">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-footer-link"
                aria-label={`${t(`homepage.contact.${link.key}`)} (opens in new tab)`}
              >
                {t(`homepage.contact.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <span className="neon-footer-copy">© {year} Lennert Van Geert</span>
      </div>
    </footer>
  );
};

export default Footer;
