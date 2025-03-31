'use client'

import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonInterface {
    movieId: string
}

const PlayButton = ({movieId}: PlayButtonInterface) => {
    const router = useRouter();

    return (
        <button
        onClick={() => router.push(`/watch/${movieId}`)}
        className="
        bg-white
        cursor-pointer
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
        > 
            <BsFillPlayFill size={25} className="mr-1" />
            Play
        </button>
    )
}

export default PlayButton;