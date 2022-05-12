import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { storage } from "../App";
import { ITodo } from "./TodoForm";

const BottomNav = () => {
  const { todoList, setTodoList } = useContext(storage);

  let itemLeft = todoList.filter((todo: any) => {
    if (todo.completed === false) {
      return todo;
    }
  });

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
            <button onClick={clearCompletedHandler}>Clear Completed</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default BottomNav;
