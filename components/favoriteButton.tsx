'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
    movieId: string,
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {

    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.faveriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response;

        if(isFavorite) {
            response = await axios.delete('api/favorite', {  data: { movieId } });
        } else {
            response = await axios.post('api/favorite', {  movieId  });
        }

        const updatedFavoritesIds = response?.data?.faveriteIds;

        mutate({
            ...currentUser,
            faveriteIds: updatedFavoritesIds
        })

        mutateFavorites();

    }, [movieId, isFavorite, currentUser,mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div 

        onClick={toggleFavorites}
        className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        "
        >
            <Icon className="text-white" size={25} />
        </div>
    )
}   

export default FavoriteButton;