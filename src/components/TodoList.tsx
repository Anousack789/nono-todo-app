import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ITodo } from "../interfaces/i-todo";

import { useDeleteTodoMutation } from "../redux/services/todoApi";
import TodoItem from "./TodoItem";
import { useAppDispatch } from "../redux/hooks";
import { setTodoUpdateItem } from "../redux/features/todoSlice";

interface Props {
  todos: ITodo[];
  refetch: () => void;
}

function TodoList({ todos, refetch }: Props) {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [deleteTodo] = useDeleteTodoMutation();
  const [deleteId, setDeleteId] = useState("");

  const cancelDeleteRef = useRef(null);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const onConfirmDelete = () => {
    toast.promise(
      deleteTodo(deleteId)
        .unwrap()
        .then(() => {
          refetch();
        })
        .finally(() => {
          onCloseDelete();
        }),
      {
        success: { title: "Success", description: "Delete todo success" },
        error: { title: "Error", description: "Something wrong" },
        loading: { title: "Processing...", description: "Please wait" },
      }
    );
  };

  useEffect(() => {
    if (deleteId.length > 0) {
      onOpenDelete();
    }
  }, [deleteId, onOpenDelete]);

  const sortTodo = useMemo(() => {
    const _todos = [...todos];
    return _todos.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [todos]);

  return (
    <>
      <Text fontSize={"larger"} fontWeight={"600"} my={2} mt={4}>
        List Todo
      </Text>
      <Flex flexDir={"column"} gap={2}>
        {sortTodo.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              setDeleteId={(id) => setDeleteId(id)}
              setUpdateItem={(todo) => dispatch(setTodoUpdateItem(todo))}
              key={todo._id}
            />
          );
        })}
      </Flex>

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelDeleteRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Todo
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelDeleteRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default TodoList;
