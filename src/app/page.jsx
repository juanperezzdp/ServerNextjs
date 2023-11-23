import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

const GetTasks = async () => {
  // const res = await fetch("http://localhost:3000/api/tasks");
  // const data = await res.json();
  // return data;

  const task = await prisma.task.findMany();
  return task;
};

export default async function Home() {
  const tasks = await GetTasks();
  return (
    <main>
      <div className="w-full flex">
        <Link
          href="/new"
          className="bg-green-800 text-white w-30 rounded-2xl p-3 m-2"
        >
          Crear Tarea +
        </Link>
      </div>

      <section>
        <div className="grid grid-cols-3">
          {tasks?.map((task) => (
            <div key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
