import Head from "@global/head";
import { RootState } from "@global/store/store";
import { Box, Button, Image, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import me from "/images/me.webp";
import { IconArrowRight, IconMusic } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ProjectsTeaser from "@common/projectsTeaser";
import { useTranslate } from "@global/localization";
import NeonTitle from "@common/neonText";
import type { NeonColor } from "@common/neonText";
import BlurredText from "@common/blurredText";
import Reveal from "@common/reveal";
import style from "./index.module.css";

const audio = new Audio("/audio/lennert.mp3");
const handlePlayAudio = () => {
  audio.play().catch((error) => {
    console.error("Failed to play audio:", error);
  });
};

// Decorative circuit-board traces behind the avatar.
const HeroCircuits = () => (
  <svg
    className={style.heroCircuits}
    viewBox="0 0 960 320"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <path d="M480 160 H360 V92 H250" stroke="#05d9e8" />
    <path d="M480 176 H300 V244 H176" stroke="#ff2d95" />
    <path d="M462 160 H410 V120 H330 V58" stroke="#05d9e8" />
    <path d="M480 160 H600 V92 H710" stroke="#ff2d95" />
    <path d="M480 176 H660 V244 H784" stroke="#05d9e8" />
    <path d="M498 160 H550 V120 H630 V58" stroke="#ff2d95" />
    <circle cx="250" cy="92" r="6" fill="#05d9e8" />
    <circle cx="176" cy="244" r="6" fill="#ff2d95" />
    <circle cx="330" cy="58" r="6" fill="#05d9e8" />
    <circle cx="710" cy="92" r="6" fill="#ff2d95" />
    <circle cx="784" cy="244" r="6" fill="#05d9e8" />
    <circle cx="630" cy="58" r="6" fill="#ff2d95" />
    <circle cx="480" cy="160" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

const techGroups: { label: string; color: NeonColor; items: string[] }[] = [
  {
    label: "Front End",
    color: "cyan",
    items: ["HTML5", "CSS3", "SASS", "TypeScript", "React", "Three.js"],
  },
  {
    label: "Back End",
    color: "lime",
    items: ["Node.js", "MongoDB", "(Postgre)SQL", "Docker", "GraphQL", "tRPC"],
  },
  { label: "Full-Stack", color: "magenta", items: ["PHP", "Laravel"] },
  {
    label: "IoT",
    color: "orange",
    items: ["Raspberry Pi", "Arduino", "MQTT", "Websockets"],
  },
  {
    label: "Design",
    color: "purple",
    items: ["Adobe Illustrator", "Adobe Photoshop", "Adobe XD", "Blender", "Figma"],
  },
];

const connectLinks: {
  key: "linkedin" | "github" | "email";
  href: string;
  color: NeonColor;
}[] = [
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/lennert-van-geert/",
    color: "cyan",
  },
  { key: "github", href: "https://github.com/lennert-vangeert", color: "magenta" },
  { key: "email", href: "mailto:lennert@lennertvg.be", color: "purple" },
];

const journey: {
  key: string;
  url: string;
  link: "company" | "school";
  current?: boolean;
}[] = [
  {
    key: "jobs.fullstack",
    url: "https://www.codifly.be",
    link: "company",
    current: true,
  },
  { key: "jobs.studentJob", url: "https://www.codifly.be", link: "company" },
  { key: "jobs.intern", url: "https://www.codifly.be", link: "company" },
  {
    key: "education.bachelor",
    url: "https://www.arteveldehogeschool.be/en",
    link: "school",
  },
  {
    key: "education.preuni",
    url: "https://www.sintjozefmere.be/",
    link: "school",
  },
];

const IndexPage = () => {
  const { mainMargin } = useSelector((state: RootState) => state.ui);
  const { t, tL } = useTranslate();
  const heroRef = useRef<HTMLElement>(null);

  // Pointer parallax — writes CSS vars directly (no re-render). Gated to fine
  // pointers + motion-allowed; only runs while the pointer is moving.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        hero.style.setProperty("--px", px.toFixed(3));
        hero.style.setProperty("--py", py.toFixed(3));
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Head
        title={t("homepage.head.title")}
        description={t("homepage.head.description")}
        keyWords={t("homepage.head.keyWords")}
      />
      <Box mb="3rem" mx={mainMargin}>
        {/* ===== HERO ===== */}
        <section ref={heroRef} className={style.hero} aria-labelledby="intro-heading">
          <div className={style.heroGrid}>
            <div className={style.heroText}>
              <p className={style.eyebrow}>{t("homepage.intro.greeting")}</p>
              <h1 id="intro-heading" className={style.sign}>
                <span className={style.signLine1}>
                  LENNER
                  <span className={`${style.flickerLetter} neon-flicker`}>T</span>
                </span>
                <span className={style.signLine2}>VAN GEERT</span>
              </h1>
              <p className={style.role}>{t("homepage.intro.role")}</p>
              <div className={style.ipaRow}>
                <Text c="inherit" size="sm">
                  /ˈlɛn.ərt vɑn ˈxeːrt/
                </Text>
                <Button
                  onClick={handlePlayAudio}
                  variant="transparent"
                  p={0}
                  c="cyan"
                  aria-label="Play pronunciation of Lennert Van Geert"
                  title="Play pronunciation"
                >
                  <IconMusic height={16} width={16} aria-hidden="true" />
                </Button>
              </div>
              <div className={style.ctas}>
                <Button
                  component="a"
                  href="#projects"
                  variant="outline"
                  color="default"
                  className={`${style.neonBtn} neon-glow-hover`}
                >
                  {t("homepage.intro.viewProjects")}
                </Button>
                <Button
                  component={Link}
                  to={tL("/ask-a-question")}
                  variant="outline"
                  color="cyan"
                  className={`${style.neonBtn} neon-glow-hover`}
                >
                  {t("homepage.intro.talkToAI")}
                </Button>
              </div>
            </div>
            <div className={style.heroVisual}>
              <HeroCircuits />
              <Image
                className={style.avatar}
                src={me}
                w={208}
                h={208}
                decoding="async"
                fetchPriority="high"
                alt="Portrait of Lennert Van Geert, a software developer from Flanders, Belgium"
              />
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className={style.section} aria-labelledby="about-heading">
          <Reveal>
            <NeonTitle id="about-heading" order={2} neon="cyan">
              {t("homepage.about.title")}
            </NeonTitle>
          </Reveal>
          <Reveal delay={80}>
            <div className={`${style.terminal} neon-box--cyan`}>
              <div className={style.terminalBar}>
                <span className={style.termName}>C:\&gt;TYPE ABOUT.TXT</span>
              </div>
              <p className={style.terminalBody}>
                <span className={style.prompt}>&gt;</span>{" "}
                {t("homepage.intro.description")}
                <span className={style.caret}>_</span>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== CONNECT ===== */}
        <section className={style.section} aria-labelledby="contact-heading">
          <Reveal>
            <NeonTitle id="contact-heading" order={2} neon="magenta">
              {t("homepage.contact.title")}
            </NeonTitle>
          </Reveal>
          <div className={style.connectGrid}>
            {connectLinks.map(({ key, href, color }, i) => (
              <Reveal key={key} delay={i * 80}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${style.connectCard} neon-box--${color} neon-glow-hover`}
                  aria-label={`${t(`homepage.contact.${key}`)} (opens in new tab)`}
                >
                  <span className={style.connectLabel}>
                    {t(`homepage.contact.${key}`)}
                  </span>
                  <IconArrowRight className={style.connectArrow} aria-hidden="true" />
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== JOURNEY ===== */}
        <section className={style.section} aria-labelledby="journey-heading">
          <Reveal>
            <NeonTitle id="journey-heading" order={2} neon="purple">
              {t("homepage.journey.title")}
            </NeonTitle>
          </Reveal>
          <div className={`${style.terminal} neon-box--purple`}>
            <div className={style.terminalBar}>
              <span className={style.termName}>C:\&gt;TYPE JOURNEY.LOG</span>
            </div>
            <div className={style.bootBody}>
              <p className={style.bootIntro}>&gt; LOADING CAREER.SYS...</p>
              <ul className={style.bootList}>
                {journey.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.key}
                    delay={i * 70}
                    className={style.bootLine}
                  >
                    <span className={style.okTag}>[ OK ]</span>
                    <div className={style.bootEntry}>
                      <div className={style.bootTitleRow}>
                        <span className={style.bootTitle}>
                          {t(`homepage.journey.${item.key}.title`)}
                        </span>
                        {item.current && (
                          <span className={style.activeTag}>
                            <span className={style.activeDot} aria-hidden="true" />
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className={style.bootMeta}>
                        <a
                          className={style.bootLink}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @ {t(`homepage.journey.${item.key}.${item.link}`)} ↗
                        </a>
                        <span className={style.bootPeriod}>
                          {t(`homepage.journey.${item.key}.period`)}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <p className={style.bootNext}>
                <span className={style.prompt}>&gt;</span> querying next...{" "}
                <BlurredText length={14} />
                <span className={style.caret}>_</span>
              </p>
            </div>
          </div>
        </section>

        {/* ===== ARSENAL / TECH STACK ===== */}
        <section className={style.section} aria-labelledby="techstack-heading">
          <Reveal>
            <NeonTitle id="techstack-heading" order={2} neon="lime">
              {t("homepage.techstack.title")}
            </NeonTitle>
          </Reveal>
          <div className={style.hudGrid}>
            {techGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <div className={`${style.hudModule} neon-box--${group.color}`}>
                  <span className={style.hudRail} aria-hidden="true" />
                  <span className={style.hudLabel}>{group.label}</span>
                  <div className={style.techPills}>
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className={`neon-pill neon-box--${group.color}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section
          id="projects"
          className={style.section}
          aria-labelledby="projects-heading"
        >
          <Reveal>
            <NeonTitle id="projects-heading" order={2} neon="orange">
              {t("homepage.projects.title")}
            </NeonTitle>
          </Reveal>
          <ProjectsTeaser />
        </section>
      </Box>
    </>
  );
};

export default IndexPage;
