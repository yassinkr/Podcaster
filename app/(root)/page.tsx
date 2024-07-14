import React from 'react'
import { podcastData } from '@/constants'
import PodcastCard from '@/components/PodcastCard'


const Home = async () => {

  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
      <h1 className='text-xl font-bold text-white-1'>Trending Podcasts</h1>
      <div className='podcast_grid'>{podcastData.map((podcast,index)=>(
        <PodcastCard key={index} title={podcast.title} imgURL={podcast.imgURL} description={podcast.description} podcastId={podcast.id} />
      ))}
      </div>
      </section>
    </div>
  )
}

export default Home