import { ExplodingText } from "@common/explodingText";
import Head from "@global/head";
import { Center, Stack, Title } from "@mantine/core";

const ProjectListPage = () => {
  return (
    <>
      <Head title="Projects" description="Explore my projects" />

      <Center mt="5rem">
        <Stack align="center">
          <Title order={1} size="3rem">
            <ExplodingText text="To be announced!" />
          </Title>
          <Title order={2}>Maybe my AI can tell you more about it?</Title>
        </Stack>
      </Center>
    </>
  );
};

export default ProjectListPage;
