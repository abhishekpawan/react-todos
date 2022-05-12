import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { storage } from "../App";
import { ITodo } from "./TodoForm";
import '../styles/BottomNav.css'


const BottomNav = () => {
  const { todoList, setTodoList } = useContext(storage);
  const [isCompleted, setCompleted] = useState<boolean>(false);

  let itemLeft = todoList.filter((todo: ITodo) => {
    if (todo.completed === false) {
      return todo;
    }
  });

  useEffect(() => {
    let completedTodo = todoList.filter(
      (todo: ITodo) => todo.completed === true
    );

    if (completedTodo?.length > 0) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [todoList]);

  const clearCompletedHandler = () => {
    let newTodoList: any = todoList.filter(
      (todo: ITodo) => todo.completed === false
    );

    setTodoList(newTodoList);
  };

  return (
    <React.Fragment>
      <div className="bottom-nav-wrapper">
        {todoList.length > 0 ? (
          <div className="bottom-nav">
            <p>{itemLeft.length} items left</p>
            <div className="bottom-navlinks">
              <NavLink to="/">All</NavLink>
              <NavLink to="/active">Active</NavLink>
              <NavLink to="/completed">Completed</NavLink>
            </div>
            {isCompleted ? (
              <button onClick={clearCompletedHandler}>Clear Completed</button>
            ) : (
              <button style={{visibility:"hidden"}}>Clear Completed</button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default BottomNav;
