import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import i18next from "i18next";
import BelgiumFlag from "./_assets/belgium.svg?react";
import UKFlag from "./_assets/uk.svg?react";
import "./languageToggle.css";

interface LanguageToggleProps {
  ease?: string;
  onLanguageChange?: (lang: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  ease = "power3.easeOut",
  onLanguageChange,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flagTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const handleLanguageChangeEvent = () => {
      setCurrentLanguage(i18next.language);
    };

    i18next.on("languageChanged", handleLanguageChangeEvent);
    return () => {
      i18next.off("languageChanged", handleLanguageChangeEvent);
    };
  }, []);

  const handleLanguageChange = () => {
    const newLang = currentLanguage === "en" ? "nl" : "en";
    i18next.changeLanguage(newLang);
    navigate(`/${newLang}`);
    onLanguageChange?.(newLang);
  };

  const handleFlagEnter = () => {
    const container = containerRef.current;
    if (!container) return;
    flagTweenRef.current?.kill();
    gsap.set(container, { rotate: 0 });
    flagTweenRef.current = gsap.to(container, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  return (
    <button
      className="language-toggle"
      onClick={handleLanguageChange}
      onMouseEnter={handleFlagEnter}
      aria-label={`Switch to ${currentLanguage === "en" ? "Dutch" : "English"}`}
      title={`Switch to ${currentLanguage === "en" ? "Nederlands" : "English"}`}
    >
      <div className="flag-container" ref={containerRef}>
        {currentLanguage === "en" ? (
          <UKFlag className="flag-icon" />
        ) : (
          <BelgiumFlag className="flag-icon" />
        )}
      </div>
    </button>
  );
};

export default LanguageToggle;
