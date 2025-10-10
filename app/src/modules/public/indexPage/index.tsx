import Head from "@global/head";
import { RootState } from "@global/store/store";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useSelector } from "react-redux";
import me from "/images/me.png";
import { ExplodingText } from "@common/explodingText";
import {
  IconArrowRight,
  IconBrandOffice,
  IconMusic,
  IconSchool,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ProjectsGrid from "@common/projectsGrid";

const audio = new Audio("/audio/lennert.mp3");
const handlePlayAudio = () => {
  audio.play().catch((error) => {
    console.error("Failed to play audio:", error);
  });
};

const IndexPage = () => {
  const { mainMargin, isBigTablet, isMobile, isSmallMobile } = useSelector(
    (state: RootState) => state.ui
  );
  const theme = useMantineTheme();
  return (
    <>
      <Head
        title="Portfolio"
        description="This is the personal portfolio of Lennert Van Geert, a software developer based in Flanders, Belgium. Here you can find information about me, my tech stack, and how to contact me."
        keyWords="Lennert Van Geert, Portfolio, homepage, information, techstack, contact me"
      />
      <Box mb="2rem" mt="2.5rem" mx={mainMargin}>
        <Flex
          gap="2rem"
          align={isBigTablet ? undefined : "center"}
          direction={isBigTablet ? "column" : "row"}
        >
          {isMobile ? (
            <Center>
              <Image
                style={{
                  borderRadius: "50%",
                  width: "17.5rem",
                  height: "17.5rem",
                }}
                src={me}
              />
            </Center>
          ) : (
            <Image
              style={{
                borderRadius: "50%",
                width: "17.5rem",
                height: "17.5rem",
              }}
              src={me}
            />
          )}

          <Stack>
            <Box>
              <Title
                order={1}
                size={
                  isSmallMobile
                    ? theme.headings.sizes.h2.fontSize
                    : theme.headings.sizes.h1.fontSize
                }
              >
                Hi, I'm {isMobile && <br />}{" "}
                <ExplodingText text="Lennert Van Geert" />
              </Title>
              <Group gap=".25rem">
                <Text size="sm">/ˈlɛn.ərt vɑn ˈxeːrt/</Text>
                <Button onClick={handlePlayAudio} variant="transparent" p={0}>
                  <IconMusic height={16} width={16} />
                </Button>
              </Group>
            </Box>
            <Text size={theme.headings.sizes.h4.fontSize} maw="50rem">
              I'm a software developer with a passion for creating innovative
              solutions based in Flanders, Belgium.
            </Text>
          </Stack>
        </Flex>

        <Title order={2} mt="2rem">
          Contact me
        </Title>
        <Flex mt="1.5rem" gap="1rem" wrap="wrap">
          <Button
            variant="outline"
            component={Link}
            to="https://www.linkedin.com/in/lennert-van-geert/"
            rightSection={
              <IconArrowRight
                style={{
                  transform: "rotate(-45deg)",
                }}
              />
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            variant="outline"
            component={Link}
            to="https://github.com/lennert-vangeert"
            rightSection={
              <IconArrowRight
                style={{
                  transform: "rotate(-45deg)",
                }}
              />
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            component={Link}
            to="mailto:lennert@lennertvg.be"
            rightSection={
              <IconArrowRight
                style={{
                  transform: "rotate(-45deg)",
                }}
              />
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </Button>
        </Flex>

        <Title order={2} mt="2rem">
          My journey so far
        </Title>
        <Timeline mt="1.5rem" active={10} bulletSize={24} lineWidth={2}>
          {/* <Timeline.Item
            lineVariant="dashed"
            bullet={<IconQuestionMark color="white" />}
            title={
              <span>
                <BlurredText length={4} /> What's next?{" "}
                <BlurredText length={5} />
              </span>
            }
          >
            <Text c="dimmed" size="sm">
              <BlurredText length={20} />
            </Text>
            <Text size="xs" mt={4}>
              <BlurredText length={15} />
            </Text>
          </Timeline.Item> */}
          <Timeline.Item
            bullet={<IconBrandOffice color="white" />}
            title="Full-Stack Developer"
          >
            <Text component={Link} to="https://www.codifly.be" c="dimmed" size="sm">
              Codifly
            </Text>
            <Text size="xs" mt={4}>
              oct 2025 - present
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconBrandOffice color="white" />}
            title="Web & Mobile Developer Student Job"
          >
            <Text component={Link} to="https://www.codifly.be" c="dimmed" size="sm">
              Codifly
            </Text>
            <Text size="xs" mt={4}>
              jul 2025 - aug 2025
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconBrandOffice color="white" />}
            title="Web & Mobile Developer Intern"
          >
            <Text component={Link} to="https://www.codifly.be" c="dimmed" size="sm">
              Codifly
            </Text>
            <Text size="xs" mt={4}>
              feb 2025 - apr 2025
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconSchool color="white" />}
            title="Bachelor Graphical and Digital Media: Multimedia production"
          >
            <Text component={Link} to="https://www.arteveldehogeschool.be/en" c="dimmed" size="sm">
              Artvelde University of Applied Sciences
            </Text>
            <Text size="xs" mt={4}>
              2022 - 2025
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconSchool color="white" />}
            title="Pre-university education - Business Economics"
          >
            <Text component={Link} to="https://www.sintjozefmere.be/" c="dimmed" size="sm">
              Sint-Jozefschool Mere
            </Text>
            <Text size="xs" mt={4}>
              2016 - 2022
            </Text>
          </Timeline.Item>
        </Timeline>

        <Title order={2} mt="2rem">
          My Techstack
        </Title>
        <Flex mt="1.5rem" maw={800} wrap="wrap" gap="1rem">
          {[
            // Front End Development
            "HTML5",
            "CSS3",
            "SASS",
            "TypeScript",
            "React",
            "Three.js",
            // Back End Development
            "Node.js",
            "MongoDB",
            "Docker",
            // Full-Stack Development
            "PHP",
            // IoT
            "Raspberry Pi",
            "Arduino",
            "MQTT",
            // Design
            "Adobe Illustrator",
            "Adobe Photoshop",
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
              c=""
            >
              {tech}
            </Badge>
          ))}
        </Flex>
        <Title order={2} mt="2rem">
          My Projects
        </Title>
        <ProjectsGrid />
      </Box>
    </>
  );
};

export default IndexPage;
