import { Button, Container, Divider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useGetTodoListQuery } from "../redux/services/todoApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectTodoUpdateItem } from "../redux/features/todoSlice";
function Todo() {
  const { data, refetch } = useGetTodoListQuery({ page: 1, limit: 10 });

  const updateItem = useAppSelector(selectTodoUpdateItem);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (updateItem) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [updateItem]);

  return (
    <>
      <Navbar />
      <Container py={4}>
        {showForm ? (
          <TodoForm refetch={refetch} onCloseForm={() => setShowForm(false)} />
        ) : (
          <>
            <Button onClick={() => setShowForm(true)}>Add Todo</Button>
          </>
        )}
        <Divider my={6} />
        {data && <TodoList todos={data} refetch={refetch} />}
      </Container>
    </>
  );
}

export default Todo;
