import { RouteObject } from "react-router-dom";
import PageWrapper from "../sections/pageWrapper";
import ProjectDetailPage from "./projectDetail";
import ChatPage from "./chatPage";
import ContactPage from "./contactPage";
import ProjectListPage from "./projectListPage";
import IndexPage from "./indexPage";

const subPages: RouteObject[] = [
  {
    path: "contact",
    element: <ContactPage />,
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
      {
        path: "projects/:slug",
        element: <ProjectDetailPage />,
      },
      {
        path: "ask-a-question",
        element: <ChatPage />,
        handle: "LennertAI",
      },
      ...subPages,
    ],
  },
];
