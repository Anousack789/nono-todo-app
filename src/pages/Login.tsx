import {
  Button,
  Container,
  Flex,
  Input,
  useToast,
  Box,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../auth/AuthProvider";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { NavLink } from "react-router-dom";
import AppConfig from "../AppConfig";
type LoginType = {
  username: string;
  password: string;
};

function Login() {
  const toast = useToast();

  const auth = useContext(AuthContext);
  const [token, setToken] = useState("");

  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Captcha is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (auth) {
      toast.promise(auth.handleLogin(data), {
        success: { title: "Success", description: "Login success" },
        error: (err) => {
          console.error(err);
          return { title: "Error", description: "Login Failed" };
        },
        loading: { title: "Processing...", description: "Please wait" },
      });
    }
  };

  return (
    <Container
      minH="100vh"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100vw"}
      maxW={"450px"}
    >
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        w={"100%"}
        p={4}
        flexDir={"column"}
      >
        <Box mx={"auto"} my={4}>
          <img src="/todo-app-logo.png" alt="app_logo" />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Flex flexDir={"column"} gap={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                {...register("username", { required: true, minLength: 4 })}
              />
              {errors.username && (
                <FormErrorMessage>Username is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: true, minLength: 4 })}
              />
              {errors.password && (
                <FormErrorMessage>Password is required</FormErrorMessage>
              )}
            </FormControl>
            <HCaptcha
              sitekey={AppConfig.CAPTCHA_SITE_KEY}
              onVerify={setToken}
              ref={captchaRef}
            />
            <Button type="submit">Login</Button>
          </Flex>
        </form>
        <Divider my={4} />
        <Text mx={"auto"}>
          Or you don't have account?{" "}
          <NavLink to={"/register"}>Register</NavLink>
        </Text>
      </Flex>
    </Container>
  );
}

export default Login;
