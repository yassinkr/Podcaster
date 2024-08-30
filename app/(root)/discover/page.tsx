import EmptyState from '@/components/EmptyState';
import PodcastCard from '@/components/PodcastCard';
import SearchBar from '@/components/SearchBar';
import { getPodcastBySearch } from '@/server/db';
import React from 'react'

const Discover = async ({searchParams: {search}}:{searchParams:{search : string}}) => {
  const podcasts= await getPodcastBySearch(search ? search : '');
  return (
    <div className=" flex flex-col gap-9">
      <SearchBar/>
      <div className='flex flex-col gap-9'>
      <h1 className='text-xl font-bold text-white-1'>Discover</h1>
       {podcasts ? <>
       {podcasts.length > 0 ? <div className='podcast_grid'>
        {podcasts.map(podcast => (
          <PodcastCard id={podcast.id} imgURL={podcast.imageURL} title={podcast.title}  description={podcast.description}/>))}
        </div>:<></>}
       </> : <EmptyState title={'No Results found'}/>}
      </div>
    </div>
  )
}

export default Discover