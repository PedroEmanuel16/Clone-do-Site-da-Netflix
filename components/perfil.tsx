"use client"

import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface PerfilProps {
  session: Session;
}

const Perfil = ({session}: PerfilProps) => {
    const router = useRouter();

    return (
         <div onClick={() => {router.push('/')}}>
            <div className="group flex-row w-25 md:w-44 mx-auto">
                <div className="w-25 h-25 md:w-44 md:h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/perfil.png" alt="perfil" />
                </div>

                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                    {session?.user?.name}
                </div>
            </div>
        </div>

        
    )
}

export default Perfil