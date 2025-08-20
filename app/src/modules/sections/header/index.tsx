import { RootState } from "@global/store/store";
import { AppShellHeader, Center, SegmentedControl } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const headerHeight = "10vh";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useSelector((state: RootState) => state.ui);
  return (
    <AppShellHeader
      withBorder={false}
      h={headerHeight}
      px="2.5rem"
      py="1rem"
      bg="transparent"
    >
      <Center>
        <SegmentedControl
          ta="center"
          size={isMobile ? "sm" : "xl"}
          withItemsBorders={false}
          value={location.pathname}
          onChange={(value) => navigate(value)}
          data={[
            { label: "Home", value: "/" },
            { label: "Projects", value: "/projects" },
            { label: "LennertAI", value: "/ask-a-question" },
          ]}
        />
      </Center>
    </AppShellHeader>
  );
};

export default Header;
