"use client";

import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./playButton";
import FavoriteButton from "./favoriteButton";

const InfoModal = () => {
  const { isOpen, closeModal } = useInfoModal();
  const visible = isOpen;
  const onClose = closeModal;

  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
            z-50
            transition
            duration-300
            bg-black/80
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            p-4
        "
    >
      <div
        className="
                relative
                w-full
                mx-auto
                max-w-3xl
                rounded-md
                overflow-hidden
            "
      >
        <div
          className={`
                    ${isVisible ? "scale-100" : "scale-0"}
                    transform
                    duration-300
                    relative
                    flex-auto
                    bg-zinc-900
                    drop-shadow-md
                `}
        >
          <div className="relative h-64 sm:h-80 md:h-96">
            <video
              className="
                                w-full
                                brightness-[60%] 
                                object-cover
                                h-full
                            "
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            />

            <div
              className="
                            cursor-pointer
                            absolute
                            top-3
                            right-3
                            h-8
                            w-8
                            sm:h-10
                            sm:w-10
                            rounded-full
                            bg-black/70
                            flex
                            items-center
                            justify-center
                            transition
                            hover:bg-black/90
                        "
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={18} />
            </div>

            <div
              className="
                            absolute
                            bottom-[10%]
                            left-4
                            sm:left-6
                            md:left-10
                            right-4
                            sm:right-auto
                        "
            >
              <p
                className="
                                text-white 
                                text-xl 
                                sm:text-3xl 
                                md:text-4xl 
                                lg:text-5xl 
                                font-bold 
                                mb-4
                                sm:mb-6
                                md:mb-8
                                line-clamp-2
                            "
              >
                {data?.title}
              </p>
              <div className="flex flex-row gap-3 sm:gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8">
            <p className="text-green-400 font-semibold text-sm sm:text-base md:text-lg">
              Release
            </p>

            {data?.duration && (
              <p className="text-white text-sm sm:text-base md:text-lg py-1 sm:py-2">
                ⏱️ Duration: {data?.duration}
              </p>
            )}

            {data?.genre && (
              <p className="text-white text-sm sm:text-base md:text-lg py-1 sm:py-2">
                🎬 Genre: {data?.genre}
              </p>
            )}

            {data?.description && (
              <p
                className="
                                text-white 
                                text-sm 
                                sm:text-base 
                                md:text-lg 
                                py-2 
                                sm:py-3
                                md:py-4
                                leading-relaxed
                            "
              >
                📝 {data?.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
