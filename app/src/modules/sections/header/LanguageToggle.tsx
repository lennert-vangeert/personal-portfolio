import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import "./languageToggle.css";

const LANGS = ["en", "nl"] as const;

const LanguageToggle: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLanguageChangeEvent = () => {
      setCurrentLanguage(i18next.language);
    };

    i18next.on("languageChanged", handleLanguageChangeEvent);
    return () => {
      i18next.off("languageChanged", handleLanguageChangeEvent);
    };
  }, []);

  const active = currentLanguage === "nl" ? "nl" : "en";

  const setLang = (lang: "en" | "nl") => {
    if (lang === active) return;
    i18next.changeLanguage(lang);
    navigate(`/${lang}`);
  };

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label="Language"
      data-active={active}
    >
      <span className="lang-indicator" aria-hidden="true" />
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`lang-opt${active === lang ? " is-active" : ""}`}
          onClick={() => setLang(lang)}
          aria-pressed={active === lang}
          aria-label={`Switch to ${lang === "en" ? "English" : "Nederlands"}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
