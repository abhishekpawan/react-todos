import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { storage } from "../App";
import { FaTimes } from "react-icons/fa";

import { ITodo } from "./TodoForm";

const TodoItem: FC<{ todoItem: ITodo }> = (props) => {
  const { todoList, setTodoList } = useContext(storage);
  const [isTodoEditable, setIsTodoEditable] = useState<boolean>(false);
  const [newTodo, setnewTodo] = useState<string>(props.todoItem.title);
  const ref = useRef<any>();

  const checkboxHandler = () => {
    let newTodoList: any = todoList.filter((todoItem: any) => {
      if (todoItem.id === props.todoItem.id && todoItem.completed === false) {
        todoItem.completed = true;
      } else if (todoItem.id === props.todoItem.id) {
        todoItem.completed = false;
      }
      return todoItem;
    });
    setTodoList(newTodoList);
  };

  const deleteHandler = () => {
    let newTodoList: any = todoList.filter(
      (todoItem: any) => todoItem.id !== props.todoItem.id
    );
    setTodoList(newTodoList);
  };

  const isTodoEditableHandler = () => {
    setIsTodoEditable(true);
  };

  const submitHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      let updatedTodoList = todoList.map((todo: any) => {
        if (todo.id === props.todoItem.id) {
          todo.title = newTodo;
          setIsTodoEditable(false);
        }
        return todo;
      });
      const removedEmptyTodo = updatedTodoList.filter(
        (todo: any) => todo.title.length > 0
      );
      setTodoList(removedEmptyTodo);
    },
    [newTodo, props.todoItem.id, setTodoList, todoList]
  );

  useEffect(() => {
    const outsideClickHandler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        submitHandler(e);
        setIsTodoEditable(false);
      }
    };

    const escapeClickHandler = (e: any) => {
      setIsTodoEditable(false);
      setnewTodo(props.todoItem.title);
    };

    document.addEventListener("click", outsideClickHandler);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        escapeClickHandler(e);
        // alert('Escape pressed');
      }
    });

    return () => {
      document.removeEventListener("click", outsideClickHandler);
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          escapeClickHandler(e);
          // alert('Escape pressed');
        }
      });
    };
  }, [setIsTodoEditable, submitHandler]);

  return (
    <React.Fragment>
      {isTodoEditable ? (
        <form action="submit" onSubmit={submitHandler}>
          <input
            ref={ref}
            id="input-box"
            type="text"
            value={newTodo}
            onChange={(e) => {
              setnewTodo(e.target.value);
            }}
          />
        </form>
      ) : (
        <li className="todo-item">
          <input
            type="checkbox"
            className="checkbox"
            name="checkbox"
            checked={props.todoItem.completed}
            readOnly
            //   onClick={checkboxHandler}
          />
          <label htmlFor="checkbox" onClick={checkboxHandler}></label>
          {props.todoItem.completed ? (
            <p className="completed-todo-item" onDoubleClick={isTodoEditableHandler} id="todo-text">
              {props.todoItem.title}
            </p>
          ) : (
            <p className="incompleted-todo-item" onDoubleClick={isTodoEditableHandler} id="todo-text">
              {props.todoItem.title}
            </p>
          )}

          <button className="delete-button" onClick={deleteHandler}>
            <FaTimes />
          </button>
        </li>
      )}
    </React.Fragment>
  );
};

export default TodoItem;
