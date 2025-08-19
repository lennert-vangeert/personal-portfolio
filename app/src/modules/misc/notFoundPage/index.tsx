import Head from "@global/head";
import { Center } from "@mantine/core";

const NotFoundPage = () => {
  return (
    <>
      <Head title={'404 - Not Found'} description={'This page was not found'} />
      <Center h="100vh">
        <h1>{'404 - Not Found'}</h1>
      </Center>
    </>
  );
};

export default NotFoundPage;
