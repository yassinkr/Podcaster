import React from 'react'
import Image from 'next/image'
import { getPodcastById } from '@/server/db'
const PodcastDetails = async({params}:{
  params:{id : number}
}) => {
  
  const podcast = await getPodcastById(params.id);
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
     </section>)
}

export default PodcastDetails