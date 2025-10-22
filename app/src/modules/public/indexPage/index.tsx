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
import { useTranslate } from "@global/localization";

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
  const { t } = useTranslate();
  const theme = useMantineTheme();
  return (
    <>
      <Head
        title={t("homepage.head.title")}
        description={t("homepage.head.description")}
        keyWords={t("homepage.head.keyWords")}
      />
      <Box mb="2rem" mt="2.5rem" mx={mainMargin}>
        <section aria-labelledby="intro-heading">
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
                  alt="Portrait of Lennert Van Geert, a software developer from Flanders, Belgium"
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
                alt="Portrait of Lennert Van Geert, a software developer from Flanders, Belgium"
              />
            )}

            <Stack>
              <Box>
                <Title
                  id="intro-heading"
                  order={1}
                  size={
                    isSmallMobile
                      ? theme.headings.sizes.h2.fontSize
                      : theme.headings.sizes.h1.fontSize
                  }
                >
                  {t("homepage.intro.greeting")} {isMobile && <br />}{" "}
                  <ExplodingText text="Lennert Van Geert" />
                </Title>
                <Group gap=".25rem">
                  <Text size="sm">/ˈlɛn.ərt vɑn ˈxeːrt/</Text>
                  <Button
                    onClick={handlePlayAudio}
                    variant="transparent"
                    p={0}
                    aria-label="Play pronunciation of Lennert Van Geert"
                    title="Play pronunciation"
                  >
                    <IconMusic height={16} width={16} aria-hidden="true" />
                  </Button>
                </Group>
              </Box>
              <Text size={theme.headings.sizes.h4.fontSize} maw="50rem">
                {t("homepage.intro.description")}
              </Text>
            </Stack>
          </Flex>
        </section>

        <section aria-labelledby="contact-heading">
          <Title id="contact-heading" order={2} mt="2rem">
            {t("homepage.contact.title")}
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
                  aria-hidden="true"
                />
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(
                "homepage.contact.linkedin"
              )} (opens in new tab)`}
            >
              {t("homepage.contact.linkedin")}
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
                  aria-hidden="true"
                />
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("homepage.contact.github")} (opens in new tab)`}
            >
              {t("homepage.contact.github")}
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
                  aria-hidden="true"
                />
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("homepage.contact.email")} (opens email client)`}
            >
              {t("homepage.contact.email")}
            </Button>
          </Flex>
        </section>

        <section aria-labelledby="journey-heading">
          <Title id="journey-heading" order={2} mt="2rem">
            {t("homepage.journey.title")}
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
              title={t("homepage.journey.jobs.fullstack.title")}
            >
              <Text
                component={Link}
                to="https://www.codifly.be"
                c="dimmed"
                size="sm"
              >
                {t("homepage.journey.jobs.fullstack.company")}
              </Text>
              <Text size="xs" mt={4}>
                {t("homepage.journey.jobs.fullstack.period")}
              </Text>
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconBrandOffice color="white" />}
              title={t("homepage.journey.jobs.studentJob.title")}
            >
              <Text
                component={Link}
                to="https://www.codifly.be"
                c="dimmed"
                size="sm"
              >
                {t("homepage.journey.jobs.studentJob.company")}
              </Text>
              <Text size="xs" mt={4}>
                {t("homepage.journey.jobs.studentJob.period")}
              </Text>
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconBrandOffice color="white" />}
              title={t("homepage.journey.jobs.intern.title")}
            >
              <Text
                component={Link}
                to="https://www.codifly.be"
                c="dimmed"
                size="sm"
              >
                {t("homepage.journey.jobs.intern.company")}
              </Text>
              <Text size="xs" mt={4}>
                {t("homepage.journey.jobs.intern.period")}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconSchool color="white" />}
              title={t("homepage.journey.education.bachelor.title")}
            >
              <Text
                component={Link}
                to="https://www.arteveldehogeschool.be/en"
                c="dimmed"
                size="sm"
              >
                {t("homepage.journey.education.bachelor.school")}
              </Text>
              <Text size="xs" mt={4}>
                {t("homepage.journey.education.bachelor.period")}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconSchool color="white" />}
              title={t("homepage.journey.education.preuni.title")}
            >
              <Text
                component={Link}
                to="https://www.sintjozefmere.be/"
                c="dimmed"
                size="sm"
              >
                {t("homepage.journey.education.preuni.school")}
              </Text>
              <Text size="xs" mt={4}>
                {t("homepage.journey.education.preuni.period")}
              </Text>
            </Timeline.Item>
          </Timeline>
        </section>

        <section aria-labelledby="techstack-heading">
          <Title id="techstack-heading" order={2} mt="2rem">
            {t("homepage.techstack.title")}
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
        </section>

        <section aria-labelledby="projects-heading">
          <Title id="projects-heading" order={2} mt="2rem">
            {t("homepage.projects.title")}
          </Title>
          <ProjectsGrid />
        </section>
      </Box>
    </>
  );
};

export default IndexPage;
