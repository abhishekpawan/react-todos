import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ActiveTodoList from "./components/ActiveTodoList";
import BottomNav from "./components/BottomNav";
import CompletedTodoList from "./components/CompletedTodoList";
import Footer from "./components/Footer";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export const storage = createContext<any>(null);

export default function App() {
  const [todoList, setTodoList] = useState<any>([]);

  console.log(todoList);
  

  return (
    <React.Fragment>
      <storage.Provider value={{ todoList, setTodoList }}>
        <div className="App">
          <TodoForm />
          <Routes>
           <Route path="/" element={<TodoList />}/> 
           <Route path="/active" element={<ActiveTodoList/>}/> 
           <Route path="/completed" element={<CompletedTodoList/>}/> 
          </Routes>
          <BottomNav />
          <Footer/>
        </div>
      </storage.Provider>
    </React.Fragment>
  );
}
