// /app/api/random/route.js

import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Conta o número de filmes no banco de dados
        const movieCount = await db.movie.count();
        if (movieCount === 0) {
            // Retorna erro se não houver filmes
            return NextResponse.json({ error: "No movies found" }, { status: 404 });
        }

        // Seleciona um filme aleatório
        const randomIndex = Math.floor(Math.random() * movieCount);
        const randomMovies = await db.movie.findMany({
            take: 1,
            skip: randomIndex,
        });

        // Retorna o filme aleatório encontrado
        return NextResponse.json(randomMovies[0]);
  } catch (error) {
    return new Response('Error fetching movie', { status: 500 });
  }
}
