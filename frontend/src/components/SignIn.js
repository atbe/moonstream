/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Text,
  Stack,
  Box,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Button,
  Input,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import CustomIcon from "./CustomIcon";
import { useLogin } from "../core/hooks";
import PasswordInput from "./PasswordInput";
import Modal from "./Modal";

const SignIn = ({ toggleModal }) => {
  const { handleSubmit, errors, register } = useForm();
  const { login, isLoading, data } = useLogin();

  useEffect(() => {
    if (!data) {
      return;
    }

    toggleModal(null);
  }, [data, toggleModal]);

  return (
    <Modal onClose={() => toggleModal(null)}>
      <Heading mt={2} size="md">
        Login now
      </Heading>
      <Text color="gray.1200" fontSize="md">
        To your Moonstream account
      </Text>
      <form onSubmit={handleSubmit(login)}>
        <Stack width="100%" pt={4} spacing={3}>
          <FormControl isInvalid={errors.username}>
            <InputGroup>
              <Input
                _placeholder={{ textColor: "gray.1200" }}
                autoComplete="username"
                variant="filled"
                colorScheme="blue"
                placeholder="Your Moonstream username"
                name="username"
                {...register("username", { required: true })}
                ref={register({ required: "Username is required!" })}
              />
              <InputRightElement>
                <CustomIcon icon="name" />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage color="red.400" pl="1">
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <PasswordInput
              placeholder="Your Moonstream password"
              name="password"
              ref={register({ required: "Password is required!" })}
            />
            <FormErrorMessage color="red.400" pl="1">
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          my={8}
          type="submit"
          width="100%"
          variant="solid"
          colorScheme="blue"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
      <Text textAlign="center" fontSize="md" color="gray.1200">
        {" "}
        <Box
          cursor="pointer"
          color="blue.800"
          as="span"
          onClick={() => toggleModal("forgot")}
        >
          Forgot your password?
        </Box>
        <Box height="1px" width="100%" background="#eaebf8" mb="1.875rem" />
      </Text>
      <Text textAlign="center" fontSize="md" color="gray.1200">
        {/* Don`t have an account?{" "} */}
        We are in early access. If you would like to use Moonstream,{" "}
        <Link href={"https://discord.gg/V3tWaP36"} color="orange.900">
          contact us on Discord.
        </Link>
        {/* <Box
          cursor="pointer"
          color="blue.800"
          as="span"
          onClick={() => toggleModal("register")}
        >
          Register
        </Box> */}
      </Text>
    </Modal>
  );
};

export default SignIn;
