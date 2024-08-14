import { getTopUserByPodcastCount, getUserByClerkId } from '@/server/db';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Header from './Header';
import Carousel from './Carousel';

const RightSideBar = async () => {
  const user = auth();
  const topUsers = await getTopUserByPodcastCount();
  if (topUsers) console.log(topUsers);
   if (user) var userData= await getUserByClerkId(user.userId);
  return (
    <section className='right_sidebar text-white-1'>
      <SignedOut>
      <SignInButton/>
      </SignedOut>
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
        <Carousel slides={topUsers}/>

      </section>

    </section>
  )
}

export default RightSideBar