"use client";

import { useRouter } from "next/navigation";
import React from "react";

function TaskCard({ task }) {
  const router = useRouter();

  return (
    <div className="w-[20rem] bg-violet-200 m-4 rounded-lg">
      <h4 className="p-2 text-2xl">{task.title}</h4>
      <p className="p-2 text-sm">{task.description}</p>
      <p className="p-2 text-cyan-600">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <div className="w-full flex">
        <button
          onClick={() => router.push(`/tasks/edit/${task.id}`)}
          className="ml-auto m-2 hover:bg-indigo-600 bg-indigo-900 text-white w-20 rounded-lg"
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
