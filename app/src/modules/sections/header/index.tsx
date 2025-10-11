import { useTranslate } from "@global/localization";
import { AppShellHeader, Center, useMantineTheme } from "@mantine/core";
import PillNav from "./navigation";

export const headerHeight = "10vh";

const Header = () => {
  const theme = useMantineTheme();
  const { t, tL } = useTranslate();
  return (
    <AppShellHeader
      withBorder={false}
      h={headerHeight}
      px="2.5rem"
      py="1rem"
      bg="transparent"
    >
      <Center>
        <PillNav
          items={[
            { label: t("header.nav.home"), href: tL("/") },
            { label: t("header.nav.projects"), href: tL("/projects") },
            { label: t("header.nav.lennertai"), href: tL("/ask-a-question") },
          ]}
          baseColor="#434243ff"
          pillColor={theme.colors.default[5]}
          pillTextColor="#fff"
        />
      </Center>
    </AppShellHeader>
  );
};

export default Header;
