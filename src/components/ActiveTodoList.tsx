import React, { useContext } from "react";
import { storage } from "../App";
import { ITodo } from "./TodoForm";
import TodoItem from "./TodoItem";

const ActiveTodoList = () => {
  const { todoList } = useContext(storage);

  let todoItem: JSX.Element = <></>;

  let activeTodoList = todoList.filter((todo:any)=>{
    if(todo.completed === false){
      return todo
    }
  })

  console.log(activeTodoList);
  

  if (activeTodoList?.length > 0) {
    todoItem = activeTodoList.map((todo: ITodo) => {
      // if(todo.completed===false){
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

export default ActiveTodoList;
