export type CreateTodo = {
  title: string;
  body: string;
};

export interface ITodo {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
