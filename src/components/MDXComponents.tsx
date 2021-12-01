import { Tweet, YouTube } from "mdx-embed";
import { Viz } from "./Viz";
import { Text, Heading, Box } from "@chakra-ui/react";

export const MDXComponents = {
  p: (props: any) => <Text {...props} as="p" />,
  h1: (props: any) => <Heading {...props} as="h1" />,
  h2: (props: any) => <Heading {...props} as="h2" />,
  h3: (props: any) => <Heading {...props} as="h3" />,
  h4: (props: any) => <Heading {...props} as="h4" />,
  h5: (props: any) => <Heading {...props} as="h5" />,
  h6: (props: any) => <Heading {...props} as="h6" />,
  ul: (props: any) => <ul {...props} style={{ paddingLeft: "1rem" }} />,
  Tweet: ({ id, ...props }: { id: string }) => (
    <Tweet
      {...props}
      hideConversation
      tweetLink={`anyuser/status/${id}`}
      theme="dark"
      align="center"
    />
  ),
  Youtube: ({ id, ...props }: { id: string }) => (
    <Box marginY="5">
      <YouTube {...props} youTubeId={id} />
    </Box>
  ),
  Viz,
};
