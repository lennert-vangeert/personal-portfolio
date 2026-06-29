import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { Image } from "@mantine/core";
import { useTranslate } from "@global/localization";
import NeonTitle from "@common/neonText";
import { projects } from "@common/projectsData";
import style from "./projectsTerminal.module.css";

const ProjectsTerminal = () => {
  const { t } = useTranslate();
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const openRef = useRef<HTMLAnchorElement>(null);

  const project = projects[selected];
  const title = t(`projects.${project.key}.title`);
  const description = t(`projects.${project.key}.description`);

  // focus the list on mount so arrow-key navigation works immediately
  useEffect(() => {
    listRef.current?.focus({ preventScroll: true });
  }, []);

  // keep the highlighted entry in view (cheap, only on selection change)
  useEffect(() => {
    optionRefs.current[selected]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [selected]);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelected((i) => Math.min(i + 1, projects.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setSelected(0);
        break;
      case "End":
        e.preventDefault();
        setSelected(projects.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        openRef.current?.click(); // null (no-op) when the project has no live link
        break;
    }
  };

  return (
    <section className={style.window} aria-label="Projects browser">
      <header className={style.titlebar}>
        <div className={style.titleLeft}>
          <span className={style.windowDots} aria-hidden="true">
            <span className={style.dotMagenta} />
            <span className={style.dotYellow} />
            <span className={style.dotLime} />
          </span>
          <span className={style.titleName}>~/projects.dir</span>
          <span className={style.caret} aria-hidden="true">
            _
          </span>
        </div>
        <span className={style.status}>
          <span className={style.led} aria-hidden="true" />
          {projects.length} FILES // READY
        </span>
      </header>

      <div className={style.body}>
        <ul
          ref={listRef}
          className={style.listPane}
          role="listbox"
          tabIndex={0}
          aria-label="Projects"
          aria-activedescendant={`proj-opt-${selected}`}
          onKeyDown={handleKeyDown}
        >
          {projects.map((p, i) => {
            const pTitle = t(`projects.${p.key}.title`);
            return (
              <li
                key={p.key}
                id={`proj-opt-${i}`}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={i === selected}
                aria-label={`${p.file} — ${pTitle}${
                  p.external ? "" : " (no live link)"
                }`}
                className={style.fileRow}
                style={{ "--accent": `var(--neon-${p.color})` } as CSSProperties}
                onClick={() => setSelected(i)}
              >
                <span className={style.cursor} aria-hidden="true">
                  &gt;
                </span>
                <span className={style.fileName}>{p.file}</span>
              </li>
            );
          })}
        </ul>

        <div
          className={style.previewPane}
          style={{ "--accent": `var(--neon-${project.color})` } as CSSProperties}
        >
          <div className={style.previewFade} key={project.key}>
            <div className={style.previewImageWrap}>
              <Image
                className={style.previewImage}
                src={project.image}
                alt={title}
                fit="contain"
                decoding="async"
              />
            </div>
            <NeonTitle order={2} neon={project.color}>
              {title}
            </NeonTitle>
            <p className={style.previewDesc}>{description}</p>
            <div className={style.techRow}>
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className={`neon-pill neon-box--${project.color}`}
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.external ? (
              <a
                ref={openRef}
                className={`${style.openBtn} neon-glow-hover`}
                href={project.to}
                target="_blank"
                rel="noopener noreferrer"
              >
                [ OPEN PROJECT ↗ ]
              </a>
            ) : (
              <span className={style.openDisabled} aria-disabled="true">
                [ SOURCE UNAVAILABLE ]
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={style.hint} aria-hidden="true">
        ↑/↓ NAVIGATE · ENTER OPEN
      </div>
    </section>
  );
};

export default ProjectsTerminal;
