import { ExplodingText } from "@common/explodingText";
import Head from "@global/head";
import { RootState } from "@global/store/store";
import { Box, Center, Stack, Title } from "@mantine/core";
import { useSelector } from "react-redux";

const ProjectListPage = () => {
  const {mainMargin} = useSelector((state: RootState) => state.ui);
  return (
    <>
      <Head title="Projects" description="Explore my projects" />
      <Box mx={mainMargin}>
        <Center mt="5rem">
          <Stack align="center">
            <Title order={1} size="3rem">
              <ExplodingText text="To be announced!" />
            </Title>
            <Title order={2}>Maybe my AI can tell you more about it?</Title>
          </Stack>
        </Center>
      </Box>
    </>
  );
};

export default ProjectListPage;
