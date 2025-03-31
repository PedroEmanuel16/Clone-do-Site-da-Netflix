import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const session = await getServerSession();
  
  if (!session) {
      redirect('/auth');
  }

  try {
     const url = new URL(request.url);
    const movieId = url.pathname.split("/").pop();

    if(typeof movieId !== 'string'){
        throw new Error('Invalid Id');
    }

    if(!movieId){
        throw new Error('Invalid Id');
    }

    const movie = await db.movie.findUnique({
        where: {
            id: movieId
        }
    })

    if(!movie){
        throw new Error('Movie not found');
    }

    return NextResponse.json(movie);

  } catch  {
    return new Response('error', { status: 500 });
  }
}
