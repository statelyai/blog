import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageHeader } from "../src/components/PageHeader";
import { Sidebar } from "../src/components/Sidebar";
import { getAllPostNames } from "../src/posts";

const Home: NextPage<{ postNames: string[] }> = ({ postNames }) => {
  return (
    <Box display="flex" flexDir="column" height="100%">
      <PageHeader />
      <Box as="main" flex="1" display="flex">
        <Sidebar postNames={postNames} />
        <Box></Box>
      </Box>
    </Box>
  );
};

export const getStaticProps = async () => {
  const postNames = await getAllPostNames();
  return { props: { postNames } };
};

export default Home;
