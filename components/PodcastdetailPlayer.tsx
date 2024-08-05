import { Podcast } from '@/types';
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Image from 'next/image'
const PodcastdetailPlayer = ({podcast}:{podcast:Podcast}) => {
  const user = auth();
  return (
    <div>
     <Image
     src={podcast.imageURL}
     width={200}
     height={200}
     alt="thumbnail"/>
    </div>
  )
}

export default PodcastdetailPlayer