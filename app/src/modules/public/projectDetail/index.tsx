import Head from "@global/head";
import { useTranslate } from "@global/localization";

const ProjectDetailPage = () => {
  const { t } = useTranslate();
  return (
    <>
      <Head
        title={t("projectDetailPage.head.title")}
        description={t("projectDetailPage.head.description")}
      />
    </>
  );
};

export default ProjectDetailPage;
