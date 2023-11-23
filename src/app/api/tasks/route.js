import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req) {
  const res = await prisma.Task.findMany();
  console.log(res);
  return NextResponse.json(res);
}

export async function POST(req) {
  const { title, description } = await req.json();
  const res = await prisma.Task.create({
    data: { title, description },
  });
  return NextResponse.json(res);
}
