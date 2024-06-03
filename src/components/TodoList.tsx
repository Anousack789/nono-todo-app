import { Flex } from "@chakra-ui/react";
import { useGetTodoListQuery } from "../redux/services/todoApi";
import TodoItem from "./TodoItem";

function TodoList() {
  const { data, refetch } = useGetTodoListQuery({ page: 1, limit: 10 });

  return (
    <Flex flexDir={"column"} gap={2}>
      {data != undefined &&
        data.map((todo) => {
          return <TodoItem todo={todo} onSuccess={refetch} key={todo._id} />;
        })}
    </Flex>
  );
}

export default TodoList;
