import Perfil from "@/components/perfil";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
    const session = await getServerSession();
    
    if (!session) {
        redirect('/auth');
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <Perfil 
                    session={session} 
                    />
                </div>

                
            </div>
        </div>
    )
}

export default ProfilePage;