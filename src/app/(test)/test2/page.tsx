"use client";
import { useState, useEffect } from "react";
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Test() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todo: Todo[] = await res.json();
    return todo;
  };

  const throwError = () => {
    throw new Error("throw error");
  };

  useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <h1>
      <button className="underline" onClick={throwError}>
        Throw error
      </button>
      {todos.map((todo) => {
        return (
          <li
            className="p-1 border-white rounded-md bg-slate-400 mt-2 hover:animate-bounce"
            key={todo.id}
          >
            {todo.title}
          </li>
        );
      })}
    </h1>
  );
}
