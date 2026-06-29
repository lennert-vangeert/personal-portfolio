import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { useTranslate } from "@global/localization";
import { projects } from "@common/projectsData";
import Reveal from "@common/reveal";
import style from "./projectsTeaser.module.css";

const ProjectsTeaser = () => {
  const { tL } = useTranslate();

  return (
    <Reveal>
      <div className={style.teaser}>
        <div className={style.bar}>
          <span className={style.name}>C:\&gt;DIR PROJECTS</span>
        </div>
        <div className={style.body}>
          <p className={style.cmd}>
            <span className={style.prompt}>$</span> ls projects.dir
          </p>
          <ul className={style.list}>
            {projects.map((p) => (
              <li
                key={p.key}
                className={style.file}
                style={{ "--accent": `var(--neon-${p.color})` } as CSSProperties}
              >
                {p.file}
              </li>
            ))}
          </ul>
          <p className={style.count}>
            {projects.length} files <span className={style.caret}>_</span>
          </p>
          <Button
            component={Link}
            to={tL("/projects")}
            variant="outline"
            color="cyan"
            className={`${style.browseBtn} neon-glow-hover`}
          >
            [ BROWSE PROJECTS.DIR ↗ ]
          </Button>
        </div>
      </div>
    </Reveal>
  );
};

export default ProjectsTeaser;
