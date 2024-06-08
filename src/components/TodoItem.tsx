import { Badge, Divider, Flex, Text } from "@chakra-ui/react";
import { MdDelete, MdOpenInNew } from "react-icons/md";
import { ITodo } from "../interfaces/i-todo";
import * as dateFns from "date-fns";
interface Props {
  todo: ITodo;
  setDeleteId: (id: string) => void;
  setUpdateItem: (item: ITodo) => void;
}

function formatDate(date: string): string {
  return dateFns.formatDate(date, "yyyy-MM-dd");
}

function TodoItem({ todo, setDeleteId, setUpdateItem }: Props) {
  return (
    <Flex
      gap={2}
      flexDir={"column"}
      border={"1px"}
      borderColor={"gray.600"}
      borderRadius={"lg"}
      p={2}
    >
      <Flex flexDir={"column"}>
        <Flex
          flex={1}
          alignItems={"center"}
          borderRadius={"lg"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"bold"}>{todo.title}</Text>
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
        <Divider my={2}></Divider>
        <Text>{todo.body}</Text>
      </Flex>
      <Flex gap={2} alignItems={"center"} justifyContent={"space-between"}>
        <div className="w-full">
          {todo.start_date && todo.end_date ? (
            <Text fontSize={"small"} color={"gray.400"}>
              Schedule: {formatDate(todo.start_date)} -{" "}
              {formatDate(todo.end_date)}
            </Text>
          ) : todo.start_date ? (
            <Text fontSize={"small"} color={"gray.400"}>
              Schedule: {formatDate(todo.start_date)} - Now{" "}
            </Text>
          ) : todo.end_date ? (
            <Text fontSize={"small"} color={"gray.400"}>
              Deadline: {formatDate(todo.end_date)}{" "}
            </Text>
          ) : (
            <></>
          )}
        </div>
        <Flex gap={2}>
          <Flex
            color={"green.500"}
            cursor={"pointer"}
            onClick={() => setUpdateItem(todo)}
            alignItems={"center"}
          >
            <MdOpenInNew size={20} />
            <Text ml={2}>Edit</Text>
          </Flex>
          <Flex
            color={"red.500"}
            cursor={"pointer"}
            onClick={() => setDeleteId(todo._id)}
            alignItems={"center"}
          >
            <MdDelete size={25} />
            <Text ml={2}>Delete</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TodoItem;
