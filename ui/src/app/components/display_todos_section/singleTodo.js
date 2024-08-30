"use client";

import { useState, useRef } from "react";
import getTodos from "@/app/actions/getTodos";

const deleteTodo = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/deleteTodo/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status != 200) {
      throw new Error("Error fetching todos");
    }

    // fetch fresh todos without the deleted todo
    getTodos();
  } catch (error) {
    console.error(error);
  }
};

const SingleTodo = (props) => {
  const { todo } = props;

  const [myTodo, setMyTodo] = useState({
    title: todo.title,
    description: todo.description,
  });

  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    setMyTodo({ ...myTodo, [e.target.name]: e.target.value });

    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to post data after 5 seconds
    timeoutRef.current = setTimeout(() => {
      postDataToBackend();
    }, 5000);
  };

  const postDataToBackend = async () => {
    try {
      const todoData = {
        id: todo.id,
        title: myTodo.title.trim(),
        description: myTodo.description.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/editTodo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to edit todo");
      }
      getTodos();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <div className="w-full px-2 py-2 text-[14px] flex items-center justify-center gap-5 bg-slate-100 rounded-sm shadow-md">
      <div className="flex-1 flex flex-col items-start justify-center gap-2">
        <input
          type="text"
          name="title"
          value={myTodo.title}
          onChange={handleChange}
          className="w-full border-none outline-none bg-inherit"
        />
        <input
          type="text"
          name="description"
          value={myTodo.description}
          onChange={handleChange}
          className="w-full border-none outline-none bg-inherit"
        />
      </div>
      <div className="py-2">
        <button
          className="text-red-500 text-[12px]"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
