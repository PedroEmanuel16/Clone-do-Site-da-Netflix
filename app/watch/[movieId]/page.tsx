'use client'

import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { use } from "react";
import { useRouter } from "next/navigation";

const Watch = ({ params }: { params: Promise<{ movieId: string }> }) => {
    const router = useRouter();
    const { movieId } = use(params);

  const { data } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="
      fixed
      w-full
      p-4
      z-10
      flex
      items-center
      gap-8
      bg-black/70
      ">
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
        <p className="text-white text-xl md:text-3xl font-bold">
            <span className="font-light">
                Watching: 
            </span>
            {data?.title}
        </p>
      </nav>
      <video autoPlay controls  src={data?.videoUrl} className="h-full w-full"></video>
    </div>
  );
};

export default Watch;
