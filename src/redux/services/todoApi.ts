import { CreateTodo, ITodo } from "../../interfaces/todo";
import { apiSlice } from "../apiSlice";

const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodoList: builder.query<ITodo[], { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `todo?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    getTodoById: builder.query<any, number>({
      query: (id) => ({
        url: `todo/${id}`,
        method: "GET",
      }),
    }),

    createTodo: builder.mutation<any, CreateTodo>({
      query: (dto) => ({
        url: "todo",
        body: dto,
        method: "POST",
      }),
    }),
    updateTodo: builder.mutation<any, { id: string; dto: CreateTodo }>({
      query: ({ id, dto }) => ({
        url: "todo/" + id,
        body: dto,
        method: "PUT",
      }),
    }),

    deleteTodo: builder.mutation<any, string>({
      query: (id) => ({
        url: "todo/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
