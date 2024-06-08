import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useContext, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AppConfig from "../AppConfig";
import { AuthContext } from "../auth/AuthProvider";
import { IRegisterForm } from "../interfaces/i-auth";
import { useRegisterMutation } from "../redux/services/authApi";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();
  const auth = useContext(AuthContext);
  const toast = useToast();
  const [registerApi] = useRegisterMutation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const captchaRef = useRef(null);
  if (!auth) {
    throw new Error("No auth provider");
  }

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Captcha is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (data.password !== data.retryPassword) {
      toast({
        title: "Error",
        description: "Password not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast.promise(
      registerApi(data)
        .unwrap()
        .then(() => {
          navigate("/login");
        }),
      {
        success: {
          title: "Success",
          description: "Register success",
        },
        error: {
          title: "Error",
          description: "Something wrong",
        },
        loading: {
          title: "Processing...",
          description: "Please wait",
        },
      }
    );
  };

  return (
    <Container
      h="100vh"
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
        <Box my={4} textAlign={"start"}>
          <Text fontSize={"x-large"}>Create a new Account</Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Flex flexDir={"column"} gap={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  minLength: {
                    value: 4,
                    message: "Email is too short",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
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
              <FormLabel>Fullname</FormLabel>
              <Input
                type="text"
                {...register("fullname", { required: true, minLength: 4 })}
              />
              {errors.fullname && (
                <FormErrorMessage>Fullname is required</FormErrorMessage>
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
            <FormControl>
              <FormLabel>Retry password</FormLabel>
              <Input
                type="password"
                {...register("retryPassword", { required: true, minLength: 4 })}
              />
              {errors.retryPassword && (
                <FormErrorMessage>Retry password is required</FormErrorMessage>
              )}
            </FormControl>
            <HCaptcha
              sitekey={AppConfig.CAPTCHA_SITE_KEY}
              onVerify={setToken}
              ref={captchaRef}
            />
            <Button type="submit">Register</Button>
          </Flex>
        </form>
        <Divider my={4} />
        <Text mx={"auto"}>
          Or you have an account? <NavLink to={"/login"}>Login</NavLink>
        </Text>
      </Flex>
    </Container>
  );
}

export default Register;
