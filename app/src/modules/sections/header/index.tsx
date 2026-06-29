import { AppShellHeader } from "@mantine/core";
import NeonNav from "./navigation";

export const headerHeight = "10vh";

const Header = () => {
  return (
    <AppShellHeader
      withBorder={false}
      h={headerHeight}
      px="2.5rem"
      py="0.75rem"
      style={{
        background: "rgba(7, 6, 15, 0.5)",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(5, 217, 232, 0.22)",
        boxShadow: "0 6px 20px -10px rgba(255, 45, 149, 0.55)",
      }}
    >
      <NeonNav />
    </AppShellHeader>
  );
};

export default Header;
