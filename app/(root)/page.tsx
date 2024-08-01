import React from 'react'
import PodcastCard from '@/components/PodcastCard'
import { getPodcasts } from '@/server/db';

async function  Podcasts(){
  const podcasts = await getPodcasts();
return podcasts;


}


const Home = async () => {
 const podcastData= await Podcasts();
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
      <h1 className='text-xl font-bold text-white-1'>Trending Podcasts</h1>
      <div className='podcast_grid'>{podcastData.map((podcast,index)=>(
        <PodcastCard key={index} title={podcast.title} imgURL={podcast.imageURL} description={podcast.description} id={podcast.id} />
      ))}
      </div>
      </section>
    </div>
  )
}

export default Home