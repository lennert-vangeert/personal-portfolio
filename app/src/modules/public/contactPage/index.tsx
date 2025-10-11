import Head from "@global/head";
import { useTranslate } from "@global/localization";

const ContactPage = () => {
  const { t } = useTranslate();
  return (
    <>
      <Head
        title={t("contactPage.head.title")}
        description={t("contactPage.head.description")}
      />
    </>
  );
};

export default ContactPage;
