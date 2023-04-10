"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Todo {
  id: string;
  done: boolean;
  content: string;
  date: String;
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");

  const fetchTodo = async (paging = { page: 0, pagesize: 1000000 }) => {
    const res = await fetch(
      `http://localhost:3000/api/todos?page=${paging.page}&pagesize=${paging.pagesize}`
    );
    const data: {
      result: Todo[];
    } = await res.json();
    setTodoList(data.result);
  };

  const handleTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const updateTodoChecked = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    console.log(id);
    const todos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.done = !!e.target.value;
      }
      return todo;
    });
    setTodoList(todos);
  };

  const addTodo = async () => {
    if (!todoInput) return;
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: todoInput,
        done: false,
      }),
    });
    const result = (await res.json()) as { result: any };
    setTodoInput("");
    if (result.result) fetchTodo();
    console.log(result);
  };

  useEffect(() => {
    fetchTodo().catch(() => {
      console.log("ops! get todo list error.");
    });
  }, []);

  return (
    <>
      <h1 className="p-3 text-4xl">Todo List:</h1>
      <div className="p-3 flex">
        <div className="mr-2 border-slate-200 w-30 bg-yellow-300 p-1">
          <input
            type="text"
            className="p-1"
            value={todoInput}
            onChange={(e) => handleTodoInput(e)}
          />
        </div>

        <button
          className="border-spacing-1 bg-slate-500 rounded-md text-white p-2 cursor-pointer hover:bg-slate-800"
          onClick={addTodo}
        >
          add todo
        </button>
      </div>
      <div className="p-3 bg-black text-white">
        {todoList.length
          ? todoList.map((todo, index) => {
              return (
                <Todo
                  todo={todo}
                  updateTodoChecked={updateTodoChecked}
                  key={index}
                ></Todo>
              );
            })
          : "add some todo"}
      </div>
    </>
  );
}

function Todo({
  todo,
  updateTodoChecked,
}: {
  todo: Todo;
  updateTodoChecked: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}) {
  return (
    <>
      <div className="flex text-white align-middle p-1 border-green-300 rounded-md bg-slate-400 mt-2 hover:bg-yellow-300">
        <input
          className="p-1"
          type="checkbox"
          checked={todo.done}
          onChange={(e) => updateTodoChecked(e, todo.id)}
        />
        <span className="pl-1">{todo.content}</span>
      </div>
    </>
  );
}
