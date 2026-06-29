import type { NeonColor } from "@common/neonText";
import defcon from "/images/defcon.webp";
import room from "/images/isometricRoom.webp";
import deMol from "/images/deMol.webp";
import sam from "/images/sam.webp";
import plane from "/images/plane.webp";
import quiz from "/images/quiz.webp";

export type Project = {
  /** translation key under `projects.<key>.title` / `.description` */
  key: string;
  /** presentational filename shown in the terminal browser */
  file: string;
  to: string;
  external: boolean;
  image: string;
  techs: string[];
  color: NeonColor;
};

export const projects: Project[] = [
  {
    key: "sam",
    file: "sam_site.exe",
    to: "https://sam.clbwestvlaanderen.be",
    external: true,
    image: sam,
    techs: ["React", "Mantine", "Redux", "Vite"],
    color: "cyan",
  },
  {
    key: "molQuiz",
    file: "mol_quiz.exe",
    to: "#",
    external: false,
    image: deMol,
    techs: ["React", "Mantine", "Redux", "Vite", "NodeJS", "Express", "MongoDB", "Zod"],
    color: "magenta",
  },
  {
    key: "defcon",
    file: "defcon.iso",
    to: "https://defcon1-mu.vercel.app/",
    external: true,
    image: defcon,
    techs: ["SCRUM", "Arduino", "Raspberry Pi", "MQTT", "Linux", "UX design", "Blender"],
    color: "orange",
  },
  {
    key: "whiskerWings",
    file: "whisker_wings.exe",
    to: "https://whiskerwings.vercel.app/",
    external: true,
    image: plane,
    techs: ["React three Fiber", "Drei", "Three.js", "Zustand", "GSAP", "Rapier", "Blender"],
    color: "lime",
  },
  {
    key: "isometricRoom",
    file: "iso_room.exe",
    to: "https://castle-isometric-room.vercel.app/",
    external: true,
    image: room,
    techs: ["Three.js", "WebGL", "GSAP", "GLSL"],
    color: "purple",
  },
  {
    key: "devQuiz",
    file: "dev_quiz.exe",
    to: "https://dev-quiz-y0am.onrender.com/",
    external: true,
    image: quiz,
    techs: ["Vanilla Typescript", "Quiz Api"],
    color: "yellow",
  },
];
