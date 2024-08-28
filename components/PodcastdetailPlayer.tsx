"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAudio } from '@/providers/AudioProvider';
import { Podcast, PodcastDetailPlayerProps, Podcasts, User } from "@/types";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
//import { useToast } from "./ui/use-toast";
import { QueryResult } from "@vercel/postgres";

const PodcastDetailPlayer = ({
podcast , 
deletePodcast,
getUserByClerkId
}: {podcast:Podcasts , deletePodcast:(id?: number | undefined) => Promise<QueryResult<never>>,
   getUserByClerkId:(clerkId: string | null | undefined) => Promise<User | undefined> }) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  //const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [owner, setOwner] = useState<User |null>(null);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
  
    const fetchOwner = async () => {
      if (!podcast.userId) return;
      const ownerData = await getUserByClerkId(podcast.userId);
      if(ownerData) setOwner(ownerData);
      if(owner?.clerkId === podcast.userId) setIsOwner(true);
    };
  
    fetchOwner();
  }, [podcast.userId]);

  
  const handleDelete = async () => {
    try {
     if(!podcast.id) throw new Error("Podcast id is missing")
      await deletePodcast(podcast.id);
     // toast({   title: "Podcast deleted", });
      router.push("/");
    } catch (error) {
      console.error("Error deleting podcast", error);
    //  toast({
      //  title: "Error deleting podcast",
      //  variant: "destructive",
     // });
    }
  };

  const handlePlay = () => {
    const podcastId = podcast.id.toString();
    const author = owner?.name || "";
    setAudio({
      title: podcast.title,
      audioUrl: podcast.audioURL,
      imageUrl: podcast.imageURL,
      author:author,
      podcastId,
    });
  };

  if (!podcast || ! owner ) return <Loader />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={podcast.imageURL}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {podcast.title}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${podcast.userId}`);
              }}
            >
              <Image
                src={owner?.image}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{owner.name}</h2>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <form action = {async ()=>{await handleDelete()}} 
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
            >
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-white-1">Delete</h2>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastDetailPlayer;