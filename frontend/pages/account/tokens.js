import React, { useState, useEffect, useLayoutEffect } from "react";
import TokensList from "../../src/components/TokensList";
import TokenRequest from "../../src/components/TokenRequest";
import { useTokens } from "../../src/core/hooks";
import {
  VStack,
  Box,
  Center,
  Spinner,
  ScaleFade,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { getLayout } from "../../src/layouts/AccountLayout";

const Tokens = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [newToken, setNewToken] = useState(null);
  const [tokens, setTokens] = useState();
  const { list, update, revoke, isLoading, data } = useTokens();

  useEffect(() => {
    list();
    //eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (newToken) {
      const newData = { ...tokens };
      newData.token.push(newToken);
      setTokens(newData);
      setNewToken(null);
    }
  }, [newToken, list, data, tokens]);

  useLayoutEffect(() => {
    if (data?.data?.user_id) {
      setTokens(data.data);
    }
  }, [data?.data, isLoading]);

  useEffect(() => {
    document.title = `Tokens`;
  }, []);

  return (
    <Box>
      {isLoading && !tokens ? (
        <Center>
          <Spinner
            hidden={false}
            my={8}
            size="lg"
            color="blue.500"
            thickness="4px"
            speed="1.5s"
          />
        </Center>
      ) : (
        <ScaleFade in>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New API access token</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <TokenRequest setNewToken={setNewToken} onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Heading variant="tokensScreen"> My access tokens </Heading>
          <VStack overflow="initial" maxH="unset" height="100%">
            <Button
              alignSelf="flex-end"
              onClick={onOpen}
              colorScheme="orange"
              variant="solid"
              size="sm"
            >
              Add new token
            </Button>
            <TokensList
              data={tokens}
              revoke={revoke}
              isLoading={isLoading}
              updateCallback={update}
            />
          </VStack>
        </ScaleFade>
      )}
    </Box>
  );
};

Tokens.getLayout = getLayout;
export default Tokens;
