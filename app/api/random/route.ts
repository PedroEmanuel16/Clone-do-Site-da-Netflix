// /app/api/random/route.js

import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
      redirect('/auth');
  }

  try {
  
        const movieCount = await db.movie.count();
        if (movieCount === 0) {
          
            return NextResponse.json({ error: "No movies found" }, { status: 404 });
        }

     
        const randomIndex = Math.floor(Math.random() * movieCount);
        const randomMovies = await db.movie.findMany({
            take: 1,
            skip: randomIndex,
        });

        return NextResponse.json(randomMovies[0]);
  } catch {
    return new Response('Error', { status: 500 });
  }
}
