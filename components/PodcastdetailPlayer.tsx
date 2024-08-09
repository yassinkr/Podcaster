import { Podcast } from '@/types';
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button';
import { deletePodcast, getPodcastByUserId, getUserByClerkId } from '@/server/db';
import AudioPlayer from './AudioPlayer';
import { redirect } from 'next/navigation';

const PodcastdetailPlayer = async ({ podcast }: { podcast: Podcast }) => {
  const user = auth();
  if (!user) throw new Error("user not found");
  if (!podcast.userId) throw new Error("podcast doesn't have an owner");
  const userPodcast = await getPodcastByUserId(podcast.userId);
  const owner = await getUserByClerkId(podcast.userId);
  const isOwner = user.userId === podcast.userId;
  if (!owner) throw new Error("podcast owner not found");

  const handleDelete = async () => {
    "use server"; 
    await deletePodcast(podcast.id);
    redirect('/'); // Redirect to home after deletion
  };

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
            <figure className="flex cursor-pointer items-center gap-2">
              <Image
                src={podcast.imageURL}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{owner.name}</h2>
            </figure>
          </article>

          <AudioPlayer audioUrl={podcast.audioURL} userPodcast={userPodcast} />
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
          />
          <div className="absolute right-0 top-0 mt-5 bg-white rounded-lg p-4 shadow-md hidden lg:flex lg:flex-col">
            <form action={handleDelete}>
              <Button type="submit" variant="destructive" className='bg-red-600 text-white-1 text-lg'>
                Delete
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PodcastdetailPlayer;
