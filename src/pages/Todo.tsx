import { Divider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Container } from "@chakra-ui/react";
function Todo() {
  return (
    <div>
      <Navbar />
      <Container>
        <TodoForm />
        <Divider my={2} />
        <TodoList />
      </Container>
    </div>
  );
}

export default Todo;
