import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { storage } from "../App";

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoForm = () => {
  const { todoList, setTodoList } = useContext(storage);
  const enteredTodo = useRef<any>();
  var now = new Date();
  const [isArrEmpty, setEmptyArr] = useState(false);
  const [isAllCompleted, setAllCompleted] = useState(true);



  //geting todo list from local storage (if have any)
  useEffect(() => {
    if (localStorage.getItem("todoitems") === null) {
      setTodoList([]);
    } else {
      setTodoList(JSON.parse(localStorage.getItem("todoitems") || "{}"));
    }
  }, [setTodoList]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    //creating an unique id
    let timestamp: string =
      now.getDate().toString() +
      now.getHours().toString() +
      now.getMinutes().toString() +
      now.getSeconds().toString() +
      now.getMilliseconds().toString();

    const todoItem: ITodo = {
      id: timestamp,
      title: enteredTodo.current.value,
      completed: false,
    };

    if(enteredTodo.current.value.length>0)
    setTodoList([...todoList, ...[todoItem]]);

    enteredTodo.current.value = "";
  };

  const allCompletedHandler = () => {
    setAllCompleted(!isAllCompleted);
    let completedTodoList = todoList.map((todo:any) => {
      if (isAllCompleted) todo.completed = true;
      else todo.completed = false;
      return todo;
    });
    setTodoList(completedTodoList);
  };
  
  //sending todo item to localstorage
  useEffect(() => {
    if (todoList?.length === 0) {
        setEmptyArr(true);
      }
      if (todoList?.length > 0) {
        localStorage.setItem("todoitems", JSON.stringify(todoList));
      } else if (isArrEmpty === true) {
        localStorage.setItem("todoitems", JSON.stringify([]));
      }
  }, [isArrEmpty, todoList]);

  return (
    <React.Fragment>
      <h1 className="header">todos</h1>
      <div className="todo-form">
      {todoList?.length > 0 ? (
        <button
          className={`check-all-arrow ${
            isAllCompleted
              ? "check-all-arrow-light"
              : "check-all-arrow-dark"
          }`}
          onClick={allCompletedHandler}
        >
          <FaChevronDown />
        </button>
      ) : (
        ""
      )}
        <form action="submit" onSubmit={submitHandler}>

          <input
          className="todoform-input"
            type="text"
            placeholder="What needs to be done?"
            ref={enteredTodo}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default TodoForm;
