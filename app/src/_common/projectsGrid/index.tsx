import { Link } from "react-router-dom";
import style from "./projectsGrid.module.css";
import {
  Badge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import defcon from "/images/defcon.png";
import room from "/images/isometricRoom.png";
import deMol from "/images/deMol.png";
import sam from "/images/sam.png";
import plane from "/images/plane.png";
import quiz from "/images/quiz.png";
import LauraIcon from "./lauraIcon.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "@global/store/store";
import { useTranslate } from "@global/localization";

const ProjectsGrid = () => {
  const theme = useMantineTheme();
  const { isTablet } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslate();
  return (
    <Box mt="1.5rem" className={style.grid}>
      <Box
        // bg="white"
        component={Link}
        to="https://sam.clbwestvlaanderen.be"
        p="1rem"
        className={`${style.item} ${style.item1}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.sam.title")}</Title>
          <Image mah="30rem" src={sam} alt={t("projects.sam.title")} />
          <Box>
            <Text my="1rem">{t("projects.sam.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {["React", "Mantine", "Redux", "Vite"].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="#"
        p="1rem"
        className={`${style.item} ${style.item2}`}
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.molQuiz.title")}</Title>
          <Image
            fit="contain"
            mah="30rem"
            src={deMol}
            alt={t("projects.molQuiz.title")}
          />
          <Box>
            <Text my="1rem">{t("projects.molQuiz.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {[
                "React",
                "Mantine",
                "Redux",
                "Vite",
                "NodeJS",
                "Express",
                "MongoDB",
                "Zod",
              ].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="https://defcon1-mu.vercel.app/"
        p="1rem"
        className={`${style.item} ${style.item3}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.defcon.title")}</Title>
          <Image src={defcon} alt={t("projects.defcon.title")} />
          <Box>
            <Text my="1rem">{t("projects.defcon.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {[
                "SCRUM",
                "Arduino",
                "Raspberry Pi",
                "MQTT",
                "Linux",
                "UX design",
                "Blender",
              ].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="https://whiskerwings.vercel.app/"
        p="1rem"
        className={`${style.item} ${style.item4}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.whiskerWings.title")}</Title>
          <Image
            src={plane}
            alt={t("projects.whiskerWings.title")}
            mah="20rem"
            fit="contain"
          />
          <Box>
            <Text my="1rem" maw={isTablet ? undefined : "80%"}>
              {t("projects.whiskerWings.description")}
            </Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {[
                "React three Fiber",
                "Drei",
                "Three.js",
                "Zustand",
                "GSAP",
                "Rapier",
                "Blender",
              ].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="https://castle-isometric-room.vercel.app/"
        p="1rem"
        className={`${style.item} ${style.item5}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.isometricRoom.title")}</Title>
          <Image src={room} alt={t("projects.isometricRoom.title")} />
          <Box>
            <Text my="1rem">{t("projects.isometricRoom.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {["Three.js", "WebGL", "GSAP", "GLSL"].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="https://dev-quiz-y0am.onrender.com/"
        p="1rem"
        className={`${style.item} ${style.item6}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.devQuiz.title")}</Title>
          <Image src={quiz} alt={t("projects.devQuiz.title")} />
          <Box>
            <Text my="1rem">{t("projects.devQuiz.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {["Vanilla Typescript", "Quiz Api"].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Box
        // bg="white"
        component={Link}
        to="https://lauravolkaert.be/"
        p="1rem"
        className={`${style.item} ${style.item7}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Stack h="100%" justify="space-between">
          <Title order={2}>{t("projects.laura.title")}</Title>
          <LauraIcon />
          <Box>
            <Text my="1rem">{t("projects.laura.description")}</Text>
            <Flex maw="25rem" gap=".5rem" wrap="wrap">
              {[
                "React",
                "Mantine",
                "Redux",
                "Vite",
                "I18next",
                "Contentful CMS",
              ].map((tech) => (
                <Badge
                  variant="gradient"
                  gradient={{
                    from: theme.colors.default[5],
                    to: theme.colors.default[6],
                    deg: 45,
                  }}
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectsGrid;
