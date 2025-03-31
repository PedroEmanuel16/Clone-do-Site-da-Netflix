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
  
        const movies = await db.movie.findMany();

        return NextResponse.json(movies);
  } catch {
    return new Response('Error fetching movie', { status: 500 });
  }
}