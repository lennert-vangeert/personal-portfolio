import { AppShellHeader, Box, Group } from "@mantine/core";
import AppIcon from "@common/appIcon/appIcon";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppShellHeader pos="relative" h="10vh" pl="2.5rem" pr="2.5rem">
      <Group justify="space-between" h="100%">
        <Box>
          <Link to={"/"}>
            <AppIcon />
          </Link>
        </Box>
      </Group>
    </AppShellHeader>
  );
};

export default Header;
