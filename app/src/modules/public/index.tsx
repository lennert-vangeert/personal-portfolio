import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import PageWrapper from "../sections/pageWrapper";

// Lazy-loaded route pages → each becomes its own async chunk, keeping the
// initial bundle small (the AI page's markdown deps leave the first load).
const IndexPage = lazy(() => import("./indexPage"));
const ProjectListPage = lazy(() => import("./projectListPage"));
const AIPage = lazy(() => import("./aiPage"));

export const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <PageWrapper />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        handle: "Home",
      },
      {
        path: "projects",
        element: <ProjectListPage />,
        handle: "Projects",
      },
      {
        path: "ask-a-question",
        element: <AIPage />,
        handle: "LennertAI",
      },
    ],
  },
];
