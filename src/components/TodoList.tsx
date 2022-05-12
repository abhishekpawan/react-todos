import React, { useContext } from "react";
import { storage } from "../App";
import { ITodo } from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList } = useContext(storage);

  let todoItem: JSX.Element = <></>;

  if (todoList?.length > 0) {
    todoItem = todoList.map((todo: ITodo) => {
      return <TodoItem key={todo.id} todoItem={todo} />;
    });
  }

  return (
    <React.Fragment>
      <div className="todo-list">
        <ul>{todoItem}</ul>
      </div>
    </React.Fragment>
  );
};

export default TodoList;
