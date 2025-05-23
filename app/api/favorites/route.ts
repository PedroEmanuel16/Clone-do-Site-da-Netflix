import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession();

    if (!session) {
        redirect('/auth');
    }

    if (!session || !session.user?.email) {
      // Retornar erro 401 se o usuário não estiver autenticado
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {


        const user = await db.user.findUnique({
            where: {
                email: session.user?.email,
            }
        })

        if(!user){
            return new Response('User not found', { status: 404 });
        }

        const favoriteMovies = await db.movie.findMany({
            where: {
                id: {
                    in: user?.faveriteIds,
                }
            }
        })

        return NextResponse.json(favoriteMovies);

    } catch  {
        return new Response('Error', { status: 500 });
    }
}