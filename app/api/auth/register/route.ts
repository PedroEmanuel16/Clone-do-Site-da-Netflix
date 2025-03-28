// app/api/auth/register/route.ts (caso você esteja usando a estrutura de app)
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json(); // Pega os dados do corpo da requisição

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Email, name and password are required" },
        { status: 400 }
      );
    }

    // Verifica se o email já existe
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 201 }); // Retorna o usuário criado
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
