import { Badge, Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useTransition } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ITodo } from "../interfaces/todo";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../redux/services/todoApi";
interface Props {
  todo: ITodo;
  onSuccess: () => void;
}
function TodoItem({ todo, onSuccess }: Props) {
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useTransition();
  const [isDeleting, setIsDeleting] = useTransition();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const doUpdate = () => {
    setIsDeleting(() => {
      return toast.promise(
        updateTodo({
          id: todo._id,
          dto: { title: todo.title, body: todo.body },
        })
          .unwrap()
          .then(() => {
            onSuccess();
          }),
        {
          success: { title: "Success", description: "Update todo success" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Processing...", description: "Please wait" },
        }
      );
    });
  };

  const doDelete = () => {
    setIsUpdating(() => {
      return toast.promise(
        deleteTodo(todo._id)
          .unwrap()
          .then(() => {
            onSuccess();
          }),
        {
          success: { title: "Success", description: "Delete todo success" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Processing...", description: "Please wait" },
        }
      );
    });
  };

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
      >
        <Text
          color={todo.completed ? "green.200" : "yellow.100"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml="1" colorScheme="green">
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml="1" colorScheme="yellow">
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Box color={"green.500"} cursor={"pointer"} onClick={() => doUpdate()}>
          {!isUpdating && <FaCheckCircle size={20} />}
          {isUpdating && <Spinner size={"sm"} />}
        </Box>
        <Box color={"red.500"} cursor={"pointer"} onClick={() => doDelete()}>
          {!isDeleting && <MdDelete size={25} />}
          {isDeleting && <Spinner size={"sm"} />}
        </Box>
      </Flex>
    </Flex>
  );
}

export default TodoItem;
