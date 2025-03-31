import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();
      
    if (!session) {
        redirect('/auth');
    }

    const currentUser = await db.user.findUnique({
        where: { email: session.user?.email },
    })

    return NextResponse.json(currentUser);

  } catch (error) {
    console.log(error);
    return new Response('Error fetching user', { status: 400 });
  }
}
