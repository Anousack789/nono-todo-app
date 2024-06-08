import {
  Button,
  Checkbox,
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
import { CreateTodo } from "../interfaces/i-todo";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../redux/services/todoApi";

import { useEffect } from "react";
import {
  selectTodoUpdateItem,
  setTodoUpdateItem,
} from "../redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import * as dateFns from "date-fns";

interface Props {
  refetch: () => void;
  onCloseForm: () => void;
}

function TodoForm({ refetch, onCloseForm }: Props) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodo>();

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const updateItem = useAppSelector(selectTodoUpdateItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updateItem) {
      reset({
        title: updateItem.title,
        body: updateItem.body,
        start_date: updateItem.start_date
          ? dateFns.format(updateItem.start_date, "yyyy-MM-dd")
          : undefined,
        end_date: updateItem.end_date
          ? dateFns.format(updateItem.end_date, "yyyy-MM-dd")
          : undefined,
      });
    }
  }, [updateItem, reset]);

  const onSubmit: SubmitHandler<CreateTodo> = (data) => {
    if (updateItem) {
      toast.promise(
        updateTodo({ id: updateItem._id, dto: data })
          .unwrap()
          .then(() => {
            dispatch(setTodoUpdateItem(null));
            refetch();
            reset({
              title: "",
              body: "",
              start_date: "",
              end_date: "",
            });
          }),
        {
          success: { title: "Success", description: "Update todo success" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Processing...", description: "Please wait" },
        }
      );
    } else {
      toast.promise(
        createTodo(data)
          .unwrap()
          .then(() => {
            onCloseForm();
            dispatch(setTodoUpdateItem(null));
            refetch();
            reset({
              title: "",
              body: "",
              start_date: "",
              end_date: "",
            });
          }),
        {
          success: { title: "Success", description: "Create todo success" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Processing...", description: "Please wait" },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4} flexDir={"column"}>
        <Text fontSize={"x-large"} fontWeight={"bold"}>
          Todo Form
        </Text>
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
        {updateItem && (
          <Checkbox {...register("completed")}>Is Completed?</Checkbox>
        )}
        <FormControl>
          <FormLabel>Schedule</FormLabel>
          <Flex alignItems={"center"} gap={4}>
            <Input type="date" {...register("start_date")} />
            <Text fontSize={"larger"}>-</Text>
            <Input type="date" {...register("end_date")} />
          </Flex>
          {errors.title && (
            <FormHelperText color={"red"}>Title is required</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          _active={{
            transform: "scale(.97)",
          }}
        >
          <IoMdAdd size={30} />
          <Text ml={2}>{updateItem ? "Update todo" : "Create new"}</Text>
        </Button>

        <Button
          type="button"
          variant={"outline"}
          _active={{
            transform: "scale(.97)",
          }}
          onClick={() => {
            reset({
              title: "",
              body: "",
              start_date: "",
              end_date: "",
            });
            dispatch(setTodoUpdateItem(null));
            onCloseForm();
          }}
        >
          <Text ml={2}>Cancel</Text>
        </Button>
      </Flex>
    </form>
  );
}

export default TodoForm;
