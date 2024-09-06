import AddTodosSection from "./components/add_todos_section/add_todos_section";
import DisplayTodosSection from "./components/display_todos_section/display_todos_section";

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] flex items-start justify-center">
      <div className="w-[95%] md:w-[50%]">
        <AddTodosSection />
        <DisplayTodosSection />
      </div>
    </div>
  );
}
