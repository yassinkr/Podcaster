"use client";
import { cn } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider';
import React from 'react'
import AudioPlayer from './AudioPlayer';

const PodcastPlayer = () => {
    const {audio} = useAudio();
    console.log("🚀 ~ PodcastPlayer ~ audio:", audio)
 if(!audio?.audioUrl) return null;
    return (
    <div className={cn("sticky bottom-0 left-0 flex size-full flex-col",
        { "hidden": !audio?.audioUrl }
    )}>
     <AudioPlayer audioUrl={audio.audioUrl} userPodcast={undefined} />
    </div>
  )
}

export default PodcastPlayer