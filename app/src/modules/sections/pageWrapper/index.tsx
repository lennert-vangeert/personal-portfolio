import { AppShell, Box, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useEffect, useMemo, useRef, TouchEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header, { headerHeight } from "../header";

import ScrollToTop from "@common/scrollToTop";
import { AppDispatch } from "@global/store/store";
import {
  setGridCols,
  setIsBigTablet,
  setIsMobile,
  setIsSmallMobile,
  setIsTablet,
  setLastPageVisited,
  setMainMargin,
} from "@global/store/uiSlice";
import { useDispatch } from "react-redux";
import { publicRoutes } from "../../public/index";

type PageWrapperProps = {
  /** Children to be rendered inside the PageWrapper */
  children?: ReactNode;
};

const runHealthCheck = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_ORIGIN}/test`);
  } catch (error) {
    return;
  }
};
runHealthCheck();

/**
 * PageWrapper component
 * @param {PageWrapperProps} props - Props for the PageWrapper component
 * @returns {JSX.Element}
 * This component is used to wrap the main content of the application.
 * It also pushes various UI-related flags into Redux.
 */
const PageWrapper = ({ children }: PageWrapperProps) => {
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const previousPathRef = useRef<string | undefined>(undefined);

  // ----- MEDIA QUERY BOOLEANS -----
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isSmallMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  const isBigTablet = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);

  const margin = useMemo(() => {
    if (isMobile) return "1rem";
    if (isTablet) return "3.5rem";
    return "15rem";
  }, [isMobile, isTablet]);

  const gridCols = useMemo(() => {
    if (isTablet) return 1;
    if (isBigTablet) return 2;
    return 3;
  }, [isTablet, isBigTablet]);

  // Sync UI-related flags into Redux whenever any of these change
  useEffect(() => {
    dispatch(setIsMobile(isMobile));
    dispatch(setIsSmallMobile(isSmallMobile));
    dispatch(setIsTablet(isTablet));
    dispatch(setIsBigTablet(isBigTablet));
    dispatch(setGridCols(gridCols));
    dispatch(setMainMargin(margin));
  }, [
    dispatch,
    isMobile,
    isSmallMobile,
    isTablet,
    isBigTablet,
    gridCols,
    margin,
  ]);

  useEffect(() => {
    if (previousPathRef.current !== undefined) {
      dispatch(setLastPageVisited(previousPathRef.current));
    }
    previousPathRef.current = pathname;
  }, [pathname, dispatch]);

  const enableSwipe = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window;
  }, []);

  // -------- Swipe logic --------
  // Refs to hold touch positions & state
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const hasSwipedRef = useRef<boolean>(false);

  // Settings
  const SWIPE_THRESHOLD = 70; // px - minimum horizontal movement to count as swipe
  const VERTICAL_RATIO = 1.5; // horizontal movement must be at least this * vertical movement

  // Normalize publicRoutes to an array of path strings
  const routePaths = useMemo(
    () =>
      publicRoutes
        .map((r) => (typeof r === "string" ? r : (r as any).path))
        .filter(Boolean)
        .map((p) => (p.startsWith("/") ? p : `/${p}`)),
    []
  );

  // Try to match pathname with route path (supports :param segments)
  const findCurrentRouteIndex = (path: string) => {
    // exact match first
    for (let i = 0; i < routePaths.length; i++) {
      if (routePaths[i] === path) return i;
    }
    // match dynamic segments (":id") -> regex
    for (let i = 0; i < routePaths.length; i++) {
      const route = routePaths[i];
      // build regex from route: convert /users/:id/profile -> ^/users/[^/]+/profile$
      const regexStr =
        "^" + route.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
      try {
        const re = new RegExp(regexStr);
        if (re.test(path)) return i;
      } catch (e) {
        // fallback
      }
    }
    // fallback: startsWith (for nested routes)
    for (let i = 0; i < routePaths.length; i++) {
      if (path.startsWith(routePaths[i])) return i;
    }
    return -1;
  };

  const goToIndex = (index: number) => {
    if (routePaths.length === 0) return;
    const safeIndex =
      ((index % routePaths.length) + routePaths.length) % routePaths.length;
    const target = routePaths[safeIndex];
    if (target && target !== pathname) {
      navigate(target);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    if (!enableSwipe) return;
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
    hasSwipedRef.current = false;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!enableSwipe) return;
    if (touchStartXRef.current === null || touchStartYRef.current === null)
      return;
    if (hasSwipedRef.current) return;

    const t = e.touches[0];
    const dx = t.clientX - touchStartXRef.current;
    const dy = t.clientY - touchStartYRef.current;

    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) < Math.abs(dy) * VERTICAL_RATIO) return; // more vertical than horizontal

    const currentIndex = findCurrentRouteIndex(pathname);
    if (currentIndex === -1) return; // only swipe when on publicRoutes

    hasSwipedRef.current = true;

    if (dx < 0) {
      // swipe left -> next page
      goToIndex(currentIndex + 1);
    } else {
      // swipe right -> previous page
      goToIndex(currentIndex - 1);
    }

    // small timeout to avoid multiple quick navigations
    setTimeout(() => {
      hasSwipedRef.current = false;
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    }, 300);
  };

  const onTouchEnd = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    hasSwipedRef.current = false;
  };

  // --------------------------------

  return (
    <>
      <ScrollToTop />
      <AppShell>
        <Header />
        <Box
          style={{
            paddingTop: headerHeight,
          }}
          // Attach touch handlers only when swipe is enabled
          onTouchStart={enableSwipe ? onTouchStart : undefined}
          onTouchMove={enableSwipe ? onTouchMove : undefined}
          onTouchEnd={enableSwipe ? onTouchEnd : undefined}
        >
          {/* Render direct children if provided, otherwise fallback to nested routes */}
          {children ?? <Outlet />}
        </Box>
        {/* <Footer /> */}
      </AppShell>
    </>
  );
};

export default PageWrapper;
