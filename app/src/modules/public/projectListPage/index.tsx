import Head from "@global/head";
import { Link } from "react-router-dom";

const ProjectListPage = () => {
  return (
    <>
      <Head title="Ask me a question" description="This is the homepage" />
      <Link to="/ask-a-question">Ask a question</Link>
    </>
  );
};

export default ProjectListPage;
