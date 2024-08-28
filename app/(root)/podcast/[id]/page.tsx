import React from 'react'
import Image from 'next/image'
import { Loader } from "lucide-react";

import { getPodcastById, getPodcasts } from '@/server/db'
import PodcastdetailPlayer from '@/components/PodcastdetailPlayer';
import PodcastCard from '@/components/PodcastCard';
import EmptyState from '@/components/EmptyState';
import { Podcast, User } from '@/types';
import { deletePodcast,getUserByClerkId } from '@/server/db';
import { QueryResult } from '@vercel/postgres';
const PodcastDetails = async({params}:{
  params:{id : number}
}) => {
  
  const podcast = await getPodcastById(params.id);
  const similarPodcasts = await getPodcasts();
  if(!podcast) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-orange-1"/>
    </div>
  )
  async function handleDeletePodcast(id:number | undefined) :Promise<QueryResult<never>>{ 
    "use server";
    return await deletePodcast(id);
  }

  async function handleGetUserByClerkId(id:string | null | undefined) :Promise<{
    id: number;
    name: string;
    email: string;
    image: string;
    clerkId: string;
    createdAt: Date;
    podcastCount: number;
    views: number;
} | undefined>{ 
    "use server";
    return await getUserByClerkId(id);
  }

  return (
     <section className=' flex w-full flex-col '>
      <header className=' mt-9 flex items-center justify-between'>
      <h1 className='text-xl font-bold text-white-1'>
      Currently playing 
      </h1>
      <figure className='flex gap-3 '>
        <Image 
        src="/icons/headphone.svg" 
        width={24}
        height={24}
        alt="headphone"/>
      <h2 className='text-lg font-bold text-white-1'>
        {podcast?.views}
      </h2>
      </figure>
      </header>
      <PodcastdetailPlayer podcast={podcast} deletePodcast={handleDeletePodcast} getUserByClerkId={handleGetUserByClerkId}/>
      <p className='text-white-1 text-lg pb-8 pt-11 font-medium max-md:text-center'>{podcast?.description}</p>
     <section className='flex flex-col gap-8'>
      <h1 className='text-xl font-bold text-white-1 '> Similar Podcasts:</h1>
     {similarPodcasts && similarPodcasts.length>0 ?(
      <div className='podcast_grid'>{similarPodcasts.map((podcast,index)=>(
        <PodcastCard key={index} title={podcast.title} imgURL={podcast.imageURL} description={podcast.description} id={podcast.id} />
      ))}
      </div>
     ):(
      <>
      <EmptyState
      title={"No similar podasts found"}
      buttonLink={"/discover"}
      buttonText={"Discover more podcasts"}/>
      </>
     )}
     </section>
     
     </section>)
}

export default PodcastDetails