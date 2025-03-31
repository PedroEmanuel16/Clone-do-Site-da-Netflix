import Billboard from "@/components/billboard";
import InfoModal from "@/components/infoModal";
import MovieList from "@/components/movieList";
import MyList from "@/components/myList";
import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth');
  }

  return (
    <>
    <InfoModal />
    <NavBar />
    <Billboard />
    <div className="pb-40">
      <MovieList title="Trending Now" />
      <MyList title="My List" />
    </div>
    </>
  );
}
