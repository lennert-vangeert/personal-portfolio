import { RouteObject } from "react-router-dom";
import PageWrapper from "../sections/pageWrapper";
import ChatPage from "./chatPage";
import ProjectListPage from "./projectListPage";
import IndexPage from "./indexPage";

const subPages: RouteObject[] = [
  {
    // path: "contact",
    // element: <ContactPage />,
  },
];

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
      // {
      //   path: "projects/:slug",
      //   element: <ProjectDetailPage />,
      // },
      {
        path: "ask-a-question",
        element: <ChatPage />,
        handle: "LennertAI",
      },
      ...subPages,
    ],
  },
];
