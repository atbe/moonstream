import React from "react";
import { Flex, Text, Link, Heading } from "@chakra-ui/react";
import CustomIcon from "../components/CustomIcon";
import RouterLink from "next/link";

const ICONS = [
  {
    social: "discord",
    link: "https://discord.gg/K56VNUQGvA",
  },

  { social: "twit", link: "https://twitter.com/moonstreamto" },
];

const SITEMAP_FLEX_PROPS = {
  px: 2,
  alignItems: "flex-start",
  flexGrow: 1,
  pb: 4,
  color: "white.300",
  fontWeight: "600",
  direction: "column",
  mr: 12,
};

const LINKS_SIZES = {
  fontWeight: "300",
  fontSize: "lg",
};

const Footer = () => (
  <Flex
    bg="brand.200"
    flexGrow="1"
    px="7%"
    width="100%"
    align="center"
    alignItems="self-end"
    justify={["center", "center", null, "space-between"]}
    direction={["column", "column", "row", null, "row"]}
    py="2.5rem"
  >
    <Flex
      p={0}
      direction={["column", "row", null, "row"]}
      flexGrow="2"
      flexWrap="wrap"
      maxW="40rem"
    >
      <Flex {...SITEMAP_FLEX_PROPS}>
        <Heading pb={8} size="md">
          About
        </Heading>{" "}
        <RouterLink passHref href="/team">
          <Link {...LINKS_SIZES}>Team</Link>
        </RouterLink>
        <RouterLink passHref href="/product">
          <Link {...LINKS_SIZES}>Product</Link>
        </RouterLink>
      </Flex>

      <Flex {...SITEMAP_FLEX_PROPS}>
        <Heading pb={8} size="md">
          News
        </Heading>
        <RouterLink passHref href="http://blog.moonstream.to">
          <Link {...LINKS_SIZES}>Blog</Link>
        </RouterLink>
        {/* <RouterLink passHref href="/privacy-policy">
          <Link {...LINKS_SIZES}>Privacy policy</Link>
        </RouterLink> */}
      </Flex>
      {/* <Flex {...SITEMAP_FLEX_PROPS}>
        <Heading pb={8} size="md">
          Product
        </Heading>
        <RouterLink href="/pricing" passHref>
          <Link {...LINKS_SIZES}>Pricing</Link>
        </RouterLink>
        <RouterLink passHref href={"/case-studies/activeloop"}>
          <Link {...LINKS_SIZES}>Case studies</Link>
        </RouterLink>
      </Flex> */}
    </Flex>
    <Flex
      direction="column"
      flexGrow="1"
      w="100%"
      maxW="40rem"
      alignItems={["flex-end", "flex-end", null, "flex-end"]}
      pr={[0, null, 8]}
    >
      <Text
        color="white"
        pt={[24, 24, null, 0]}
        pb={8}
        fontSize="xl"
        fontWeight="500"
      >
        All the crypto data you care about{` `}
        <span role="img" aria-label="heart">
          💙
        </span>
      </Text>
      <Flex px={2} width="100%" maxW="30rem" justifyContent="flex-end">
        {ICONS.map((icon, index) => (
          <Link
            key={`social-footer-icons-${index}`}
            display="flex"
            mx={2}
            mb={2}
            borderRadius="13px"
            bg="blue.800"
            boxSize={["3rem", "4rem", "6rem", null, "6rem"]}
            _hover={{ bg: "blue.600" }}
            alignItems="center"
            justifyContent="center"
            href={icon.link}
            isExternal
            p={4}
          >
            <CustomIcon icon={icon.social} />
          </Link>
        ))}
      </Flex>
      <Text pt={24} alignSelf="flex-end" textColor="blue.500">
        All rights reserved.2021
      </Text>
    </Flex>
  </Flex>
);

export default Footer;
