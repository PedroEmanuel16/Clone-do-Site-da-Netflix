import { db } from "@/lib/prismadb";
import { without } from "lodash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function POST(request) {
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response('Error', { status: 500 });
    }
}


export async function DELETE(request) {
    const session = await getServerSession();

    if (!session) {
        redirect('/auth');
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

        const updatedUser = await db.user.update({
            where: {
                email: session.user?.email,
            },
            data: {
                faveriteIds: updatedFavoriteIds
            }
        })

        return NextResponse.json(updatedUser);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response('Error', { status: 500 });
    }
}
