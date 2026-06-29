import type {
  MantineBreakpointsValues,
  MantineThemeOverride,
} from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import type * as React from "react";

// Color information — 80's synthwave neon palette.
// NOTE: the app fakes dark mode by inverting `white`/`black`, so `mainBackground`
// is the actual page background and `text` is the body text color.
const colors = {
  text: "#e8e6ff",
  white: "#FFFFFF",
  black: "#000000",
  dark: "#0d0a1a",
  medium: "#6F7881",
  light: "#B9C2CC",
  mainBackground: "#07060f", // near-black indigo → drives --mantine-color-body
  backgroundTransparent: "transparent",
  warning: "#ffd319",
  // neon border tone for inputs/checkboxes (translucent cyan)
  neonBorder: "rgba(5, 217, 232, 0.4)",
  default: {
    primary: "#ff2d95", // neon magenta (primaryColor)
    hover: "#ff5ca9",
    focus: "#ff5ca9",
    active: "#e31f80",
    disabled: "#8e0d4f",
  },
};

const breakpoints: MantineBreakpointsValues = {
  xs: "20rem",
  sm: "36rem",
  md: "48rem",
  lg: "58.75rem",
  xl: "87.5rem",
};

const spacing: MantineBreakpointsValues = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
};

const borderRadii = {
  button: "4px",
  input: "4px",
};

const borderWidths = {
  buttonOutlineVariant: "2px",
  input: "1px",
};

const theme: MantineThemeOverride = {
  primaryColor: "default",
  primaryShade: 5,
  white: colors.mainBackground,
  black: colors.text,
  colors: {
    // primaryColor "default" === neon magenta (pure hex at index 5)
    default: [
      "#ffe6f3",
      "#ffb8da",
      "#ff8ac2",
      "#ff5ca9",
      "#ff4a9f",
      "#ff2d95",
      "#e31f80",
      "#c0136a",
      "#8e0d4f",
      "#5c0833",
    ],
    cyan: [
      "#d6fbfd",
      "#a3f4f8",
      "#6deaf2",
      "#38e0ec",
      "#1bdaea",
      "#05d9e8",
      "#04b3c0",
      "#038c97",
      "#02646b",
      "#013c40",
    ],
    orange: [
      "#ffe9da",
      "#ffc9a8",
      "#ffa876",
      "#ff8744",
      "#ff7a2f",
      "#ff6b1a",
      "#e0560f",
      "#b3430b",
      "#803007",
      "#4d1c04",
    ],
    yellow: [
      "#fff8d9",
      "#ffeea6",
      "#ffe573",
      "#ffdb40",
      "#ffd72c",
      "#ffd319",
      "#e0b800",
      "#ad8f00",
      "#7a6500",
      "#473b00",
    ],
    lime: [
      "#e2ffd9",
      "#b8ffa6",
      "#8dff73",
      "#63ff40",
      "#4eff2a",
      "#39ff14",
      "#2ce00a",
      "#21b307",
      "#178005",
      "#0c4d02",
    ],
    purple: [
      "#f3ddff",
      "#e0b0ff",
      "#cd83ff",
      "#ba56ff",
      "#b13eff",
      "#b026ff",
      "#9512e0",
      "#730db3",
      "#520980",
      "#31054d",
    ],
    error: [
      "#ffebee",
      "#fbd8da",
      "#edb0b3",
      "#df858a",
      "#d46167",
      "#cd4950",
      "#cb3d45",
      "#b42f36",
      "#a1262f",
      "#8e1c26",
    ],
    success: [
      "#f3faed",
      "#e8f0de",
      "#cfe1bc",
      "#b4cf97",
      "#9ec078",
      "#90b764",
      "#88b458",
      "#759e47",
      "#678c3e",
      "#567930",
    ],
  },
  fontFamily: "Oxanium, sans-serif",
  fontSizes: {
    xs: "0.6875rem",
    sm: "0.875rem",
    md: "0.875rem",
    lg: "1rem",
    xl: "1.25rem",
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.5",
    lg: "1.6",
    xl: "1.65",
  },
  headings: {
    fontFamily: "Orbitron, Oxanium, sans-serif",
    textWrap: "wrap",
    sizes: {
      h1: {
        fontSize: "2rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
      h3: {
        fontSize: "1.6rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: "900",
        lineHeight: "1.5",
      },
    },
  },
  spacing,
  breakpoints,
  focusRing: "auto",
  defaultRadius: borderRadii.input,
  components: {
    Input: {
      styles: {
        input: {
          borderWidth: borderWidths.input,
          borderColor: colors.neonBorder,
        },
        invalid: {
          color: "error",
        },
      },
    },
    Checkbox: {
      styles: {
        input: {
          borderWidth: borderWidths.input,
          borderColor: colors.neonBorder,
        },
      },
    },
    Radio: {
      styles: {
        radio: {
          borderWidth: borderWidths.input,
          borderColor: colors.neonBorder,
        },
      },
    },
    Button: {
      styles: {
        root: {
          borderRadius: borderRadii.button,
        },
        outline: {
          borderRadius: borderRadii.button,
          borderImage: borderWidths.buttonOutlineVariant,
        },
      },
    },
    Modal: {
      styles: {
        header: {
          left: 0,
          right: 0,
        },
        title: {
          fontWeight: "bold",
          fontSize: "1.375rem",
          lineHeight: "1.5",
        },
        body: {
          minWidth: "15rem",
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          minWidth: breakpoints.xs,
        },
      },
    },
    SegmentedControl: {
      styles: {
        root: {
          borderRadius: "2rem",
        },
        indicator: {
          borderRadius: "2rem",
          backgroundColor: colors.default.primary,
          color: colors.white,
        },
      },
    },
  },
};

type MantineStylesProps = {
  children: React.ReactNode;
};

export const MantineStyles = ({ children }: MantineStylesProps) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);
