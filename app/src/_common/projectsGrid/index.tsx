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

const ProjectsGrid = () => {
  const theme = useMantineTheme();
  const { isTablet } = useSelector((state: RootState) => state.ui);
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
          <Title order={2}>The Sam Website</Title>
          <Image mah="30rem" src={sam} alt="The Sam Website" />
          <Box>
            <Text my="1rem">
              An informative website that helps students and their parents with
              the transfer to high school in Belgium. A project for the CLB
              (Centrum voor Leerlingenbegeleiding) of West Flanders.
            </Text>
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
          <Title order={2}>The Mol Quiz</Title>
          <Image fit="contain" mah="30rem" src={deMol} alt="De Mol Quiz" />
          <Box>
            <Text my="1rem">
              A Webapp and api where friends and family could test their
              knowledge of the popular Belgian TV show "De Mol" after every
              weekly episode.
            </Text>
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
          <Title order={2}>Defcon IoT Escape Room</Title>
          <Image src={defcon} alt="Defcon IoT Escape Room" />
          <Box>
            <Text my="1rem">
              An IoT escape room where players solve puzzles to save the world
              from the Soviet Union during the Cold War. The game is played in a
              real room with physical devices and a web interface.
            </Text>
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
          <Title order={2}>Whisker Wings</Title>
          <Image src={plane} alt="Whisker Wings" mah="20rem" fit="contain" />
          <Box>
            <Text my="1rem" maw={isTablet ? undefined : "80%"}>
              A 3D browser game where you fly a plane operated by a bunny. The
              goal is to collect all rings as fast as possible. Without crashing
              of course.
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
          <Title order={2}>Isometric Castle Room</Title>
          <Image src={room} alt="Isometric Castle Room" />
          <Box>
            <Text my="1rem">
              An isometric 3D room built with Three.js. Explore the room,
              interact with Points of Interest and explore the small story.
            </Text>
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
          <Title order={2}>Dev Quiz</Title>
          <Image src={quiz} alt="Dev Quiz" />
          <Box>
            <Text my="1rem">
              A quiz application built with Vanilla TypeScript. Test your
              knowledge on various development topics.
            </Text>
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
          <Title order={2}>Laura's Portfolio</Title>
          <LauraIcon />
          <Box>
            <Text my="1rem">
              A personal portfolio i built for my girlfriend. Showcasing her
              design projects. This website makes use of the Contentful CMS so
              she can manage the content herself.
            </Text>
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
