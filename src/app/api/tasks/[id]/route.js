import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const res = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(res);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const res = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(res);
}

export async function DELETE(req, { params }) {
  try {
    const res = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });
    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
