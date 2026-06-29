import ProjectsTerminal from "@common/projectsTerminal";
import Head from "@global/head";
import { useTranslate } from "@global/localization";
import { Box } from "@mantine/core";

const ProjectListPage = () => {
  const { t } = useTranslate();
  return (
    <>
      <Head
        title={t("projectsPage.head.title")}
        description={t("projectsPage.head.description")}
        keyWords={t("projectsPage.head.keyWords")}
      />
      <Box px="1.5rem" pb="2rem">
        <ProjectsTerminal />
      </Box>
    </>
  );
};

export default ProjectListPage;
