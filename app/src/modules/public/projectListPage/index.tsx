import ProjectsGrid from "@common/projectsGrid";
import Head from "@global/head";
import { RootState } from "@global/store/store";
import { Box, Title } from "@mantine/core";
import { useSelector } from "react-redux";

const ProjectListPage = () => {
  const { mainMargin } = useSelector((state: RootState) => state.ui);
  return (
    <>
      <Head
        title="Projects"
        description="Explore my projects"
        keyWords="Lennert Van Geert, Portfolio, projects, web development, node"
      />
      <Box mx={mainMargin} mb="2rem">
        <Title order={1}>My Projects</Title>
        <ProjectsGrid />
      </Box>
    </>
  );
};

export default ProjectListPage;
