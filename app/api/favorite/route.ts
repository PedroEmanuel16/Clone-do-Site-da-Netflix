import { db } from "@/lib/prismadb";
import { without } from "lodash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const session = await getServerSession();

    if (!session) {
        redirect('/auth');
    }

    try {
        const { movieId } = await request.json();

        const existingMovie = await db.movie.findUnique({
            where: {
                id: movieId,
            }
        })

        if(!existingMovie){
            throw new Error('Invalid Id');
        }

        if (!session || !session.user?.email) {
        // Retornar erro 401 se o usuário não estiver autenticado
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.user.update({
            where: {
                email: session.user?.email,
            },
            data: {
                faveriteIds: {
                    push: movieId,
                }
            }
        })

        return NextResponse.json(user);

    } catch {
        return new Response('Error', { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    const session = await getServerSession();

    if (!session) {
        redirect('/auth');
    }

    if (!session || !session.user?.email) {
      // Retornar erro 401 se o usuário não estiver autenticado
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { movieId } = await request.json();
        const currentUser = await db.user.findUnique({
            where: {
                email: session.user?.email,
            }
        })

        const existingMovie = await db.movie.findUnique({
            where: {
                id: movieId,
            }
        })

        if(!existingMovie){
            throw new Error('Invalid Id');
        }

        const updatedFavoriteIds = without(currentUser?.faveriteIds, movieId);

        if (!session || !session.user?.email) {
        // Retornar erro 401 se o usuário não estiver autenticado
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updatedUser = await db.user.update({
            where: {
                email: session.user?.email,
            },
            data: {
                faveriteIds: updatedFavoriteIds
            }
        })

        return NextResponse.json(updatedUser);
    
    } catch  {
        return new Response('Error', { status: 500 });
    }
}
