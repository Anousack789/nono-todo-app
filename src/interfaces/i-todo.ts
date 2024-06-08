export type CreateTodo = {
  title: string;
  body: string;
  completed: boolean;
  start_date: string;
  end_date: string;
};

export interface ITodo {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
  user_id: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
