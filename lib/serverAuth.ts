import { getSession } from "next-auth/react";
import { db } from "./prismadb";
import { NextRequest } from "next/server";

// Função de autenticação
const serverAuth = async (req: NextRequest) => {

    const session = await getSession({ req });

    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }

    const currentUser = await db.user.findUnique({
        where: { email: session.user.email }
    });

    if (!currentUser) {
        throw new Error("Not signed in");
    }

    return { currentUser };
};

export default serverAuth;
