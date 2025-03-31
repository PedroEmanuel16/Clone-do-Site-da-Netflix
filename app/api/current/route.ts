import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      // Retornar erro 401 se o usuário não estiver autenticado
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await db.user.findUnique({
        where: { email: session.user.email },
    })

    return NextResponse.json(currentUser);

  } catch (error) {
    console.log(error);
    return new Response('Error fetching user', { status: 400 });
  }
}
