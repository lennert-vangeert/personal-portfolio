import Head from "@global/head";
import { RootState } from "@global/store/store";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useSelector } from "react-redux";
import me from "/me.png";
import { ExplodingText } from "@common/explodingText";
import {
  IconArrowRight,
  IconBrandOffice,
  IconQuestionMark,
  IconSchool,
} from "@tabler/icons-react";
import BlurredText from "@common/blurredText";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { mainMargin, isBigTablet, isMobile, isSmallMobile } = useSelector(
    (state: RootState) => state.ui
  );
  const theme = useMantineTheme();
  return (
    <>
      <Head title="Home" description="This is the homepage" />
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
            <Text size={theme.headings.sizes.h4.fontSize}>
              I'm a software developer with a passion for creating innovative
              solutions.
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
          <Timeline.Item
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
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconBrandOffice color="white" />}
            title="Web & Mobile Developer Student Job"
          >
            <Text c="dimmed" size="sm">
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
            <Text c="dimmed" size="sm">
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
            <Text c="dimmed" size="sm">
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
            <Text c="dimmed" size="sm">
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
            >
              {tech}
            </Badge>
          ))}
        </Flex>
        <Title order={2} mt="2rem">
          My Projects
        </Title>
        <Text>
          To be announced! Maybe my AI can tell you more about it?
        </Text>
      </Box>
    </>
  );
};

export default IndexPage;
