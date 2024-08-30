"use client";

import { useState } from "react";
import getTodos from "@/app/actions/getTodos";

const initialTodoState = {
  title: "",
  description: "",
};

const AddTodosSection = () => {
  const [todo, setTodo] = useState(initialTodoState);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!todo.title || !todo.description) return;

      const todoData = {
        title: todo.title.trim(),
        description: todo.description.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/addTodo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todoData),
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to post todo");
      }

      setTodo(initialTodoState);
      getTodos();
    } catch (error) {
      console.error("error while submitting data", error);
    }
  };

  return (
    <div className="w-full px-3 py-10 flex flex-col items-center justify-center gap-8">
      <div className="w-full">
        <h1 className="text-center text-[25px] font-bold">Add Todo</h1>
      </div>
      <div className="w-full">
        <form
          className="w-full text-[14px] flex flex-col items-start justify-center gap-4"
          typeof="submit"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="title">Title</label>
            <input
              className="w-full h-[40px] px-2 border-[1px] border-blue-500 rounded-sm outline-2 outline-blue-500"
              type="text"
              name="title"
              id="title"
              placeholder="Title of your todo"
              value={todo.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full px-2 py-2 border-[1px] border-blue-500 rounded-sm outline-2 outline-blue-500"
              rows="4"
              cols="50"
              name="description"
              id="description"
              placeholder="Description of your todo"
              value={todo.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="w-full h-[40px] bg-blue-500 text-[white] rounded-sm shadow-md md:w-[30%]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodosSection;
