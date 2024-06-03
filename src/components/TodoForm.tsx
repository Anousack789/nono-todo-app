import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { CreateTodo } from "../interfaces/todo";
import { useCreateTodoMutation } from "../redux/services/todoApi";
function TodoForm() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodo>();

  const [createTodo] = useCreateTodoMutation();

  const onSubmit: SubmitHandler<CreateTodo> = (data) => {
    toast.promise(createTodo(data).unwrap(), {
      success: { title: "Success", description: "Create todo success" },
      error: { title: "Error", description: "Something wrong" },
      loading: { title: "Processing...", description: "Please wait" },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={2} flexDir={"column"}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            {...register("title", { required: true, minLength: 4 })}
          />
          {errors.title && (
            <FormHelperText color={"red"}>Title is required</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Body</FormLabel>
          <Textarea {...register("body", { required: true, minLength: 4 })} />
          {errors.body && (
            <FormHelperText color={"red"}>Body is required</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          _active={{
            transform: "scale(.97)",
          }}
        >
          <IoMdAdd size={30} />
          <Text ml={2}>Create new</Text>
        </Button>
      </Flex>
    </form>
  );
}

export default TodoForm;
