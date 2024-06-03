import { useLoginMutation } from "../redux/services/authApi";
import { useToast, Input, Button, Container, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginType = {
  username: string;
  password: string;
};

function Login() {
  const toast = useToast();
  const [login] = useLoginMutation();

  const { register, handleSubmit } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    toast.promise(login(data).unwrap(), {
      success: { title: "Success", description: "Login success" },
      error: (err) => {
        console.error(err);
        return { title: "Error", description: "Something wrong" };
      },
      loading: { title: "Promise pending", description: "Please wait" },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} columnGap={2}>
          <Input type="text" {...register("username")} />
          <Input type="password" {...register("password")} />
          <Button type="submit">Login</Button>
        </Flex>
      </form>
    </Container>
  );
}

export default Login;
