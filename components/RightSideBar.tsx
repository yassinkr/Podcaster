import {  getPodcasts, getTopUserByPodcastCount, getUserByClerkId } from '@/server/db';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Header from './Header';
import Carousel from './Carousel';
import { Loader } from 'lucide-react';

const RightSideBar = async () => {
  const user = auth();
  const topUsers = await getTopUserByPodcastCount();
  const podcasts= await getPodcasts();
  if (user.userId) var userData= await getUserByClerkId(user.userId);
  if(!topUsers || !podcasts) return(<div className='w-full h-screen flex justify-center items-center'>
    <Loader size={30} className="animate-spin  text-orange-1"/>
    </div>)
  return (
    <section className='right_sidebar text-white-1'>

      <SignedIn>
        <Link href={ `/profile/${userData?.id}`} className='flex gap-3 pb-12'>
        <UserButton/>
        <div className='flex w-full items-center justify-between '>
          <h1 className='text-lg truncate font-semibold text-white-1'>
            {userData?.name}
          </h1>
          <Image
           src= "/icons/right-arrow.svg"
           alt="arrow right"
            width={24}
            height={24}
          />
        </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle='For fans like you' titleClassName=''/>
        <Carousel TopUsers={topUsers} podcasts={podcasts}/>

      </section>
      <section className='flex flex-col gap-8 pt-12'>
      <Header headerTitle='Top Podcasters' titleClassName=''/>
      <div className=' flex flex-col gap-6'>
       {topUsers?.slice(0,4).map((podcaster)=>(
        <Link href={`/profile/${podcaster.clerkId}`} key={podcaster.id}>
        <div  className='flex cursor-pointer justify-between'>
        <div className='flex gap-3 justify-start items-centers'>
        <Image
          src={podcaster.image}
          alt={podcaster.name}
          width={44}
          height={44}
          className='rounded-lg aspect-square'/>
          <h2 className='text-sm text-white-1 font-semibold'>{podcaster.name}</h2>
          </div>
          <div className='flex items-center'>
          <p className='text-xs font-normal'>{podcaster.podcastCount} podcasts</p>
          </div>
        </div>
        </Link>
       ))}
      </div>
      </section>
    </section>
  )
}

export default RightSideBar