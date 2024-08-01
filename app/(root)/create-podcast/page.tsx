
import {FormCreatePodcast} from "@/components/FormCreatePodcast"
import { insertPodcast } from "@/server/db";
import { Podcast } from "@/types";
export default async function Home () {
  
  async function handlePodcast(podcast:Podcast) :Promise<Podcast>{ 
    "use server";
    return await insertPodcast(podcast);
  }
  return (
  <div>
    <FormCreatePodcast insertPodcast={handlePodcast}
    />
    </div>);
}



