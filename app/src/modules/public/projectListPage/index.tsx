import ProjectsGrid from "@common/projectsGrid";
import Head from "@global/head";
import { useTranslate } from "@global/localization";
import { RootState } from "@global/store/store";
import { Box, Title } from "@mantine/core";
import { useSelector } from "react-redux";

const ProjectListPage = () => {
  const { mainMargin } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslate();
  return (
    <>
      <Head
        title={t("projectsPage.head.title")}
        description={t("projectsPage.head.description")}
        keyWords={t("projectsPage.head.keyWords")}
      />
      <Box mx={mainMargin} mb="2rem">
        <Title order={1}>{t("projectsPage.title")}</Title>
        <ProjectsGrid />
      </Box>
    </>
  );
};

export default ProjectListPage;
