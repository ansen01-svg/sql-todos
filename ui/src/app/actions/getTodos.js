"use server";

import { revalidateTag } from "next/cache";

const getTodos = () => {
  revalidateTag("todos");
};

export default getTodos;
