import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

interface AnnouncementProps {
  cta?: React.ReactNode;
  href: string;
}

export const Announcement: React.FC<AnnouncementProps> = ({
  cta,
  href,
  children,
}) => {
  return (
    <Flex
      bg="whiteAlpha.200"
      as="section"
      marginBlock="4"
      marginInline="-4"
      paddingInline="4"
      paddingBlock="4"
      marginTop="8"
      direction="column"
      gap="5"
      alignItems="center"
    >
      <Text margin="0!important" textAlign="left">{children}</Text>
      <Button
        justifyContent="center"
        bg="primary.500"
        _hover={{ bg: "primary.600", color: "white" }}
        _active={{ bg: "primary.600", color: "white" }}
        _focus={{ bg: "primary.600", color: "white" }}
        color="white"
        as="a"
        textDecoration="none"
        href={href}
        width="max-content"
      >
        {cta}
      </Button>
    </Flex>
  );
};
