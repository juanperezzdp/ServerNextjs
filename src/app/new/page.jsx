"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function NewPage({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "PUT",
          body: JSON.stringify({ title, description }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        router.refresh();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      router.refresh();
      router.push("/");
    }
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-80 gap-4 bg-violet-500 rounded-xl p-4"
      >
        <input
          placeholder="Titulo"
          className=" border-solid border-2 border-black rounded-xl pl-3 h-10"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripcion"
          className="resize-none border-solid border-2 border-black rounded-xl pl-3"
          rows="5"
          cols="10"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <button className=" hover:bg-indigo-600 bg-indigo-900 text-white rounded-xl p-2">
            {params.id ? "Actulizar" : "Crear"}
          </button>
          {params.id && (
            <button
              className="bg-red-900 w-20  text-white rounded-xl p-2"
              onClick={deleteTask}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewPage;
