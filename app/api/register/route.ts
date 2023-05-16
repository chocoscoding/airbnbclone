import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({ ...user, status: 200, error: "" });
  } catch (error: any) {
    if (error.meta.target === "User_email_key")
      return NextResponse.json({ status: 404, error: "User_email_key" });
    return NextResponse.json({
      status: 404,
      error: "Something went wrong, try again",
    });
  }
}
