import SingleTodo from "./singleTodo";

const fetchTodos = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/getAllTodos`,
      { next: { tags: ["todos"] } }
    );

    if (response.status != 200) {
      throw new Error("Error fetching todos");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const DisplayTodosSection = async () => {
  const todos = await fetchTodos();

  return (
    <div className="w-full px-3 py-3 flex flex-col items-center justify-start gap-4">
      {todos.length > 0 &&
        todos.map((todo) => {
          return <SingleTodo key={todo.id} todo={todo} />;
        })}
    </div>
  );
};

export default DisplayTodosSection;
