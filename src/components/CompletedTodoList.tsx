import React, { useContext } from "react";
import { storage } from "../App";
import { ITodo } from "./TodoForm";
import TodoItem from "./TodoItem";

const CompletedTodoList = () => {
  const { todoList } = useContext(storage);

  let todoItem: JSX.Element = <></>;

  let completedTodoList = todoList.filter((todo:any)=>{
    if(todo.completed === true){
      return todo
    }
  })

  if (completedTodoList?.length > 0) {
    todoItem = completedTodoList.map((todo: ITodo) => {
      return <TodoItem key={todo.id} todoItem={todo} />;}
    // }
    );
  }

  return (
    <React.Fragment>
      <div className="todo-list">
        <ul>{todoItem}</ul>
      </div>
    </React.Fragment>
  );
};

export default CompletedTodoList;
