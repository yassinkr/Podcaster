"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import Image from 'next/image';
const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play or pause the audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Set duration once metadata is loaded
  useEffect(() => {
    if (audioRef.current) {
      const setAudioData = () => {
        setDuration(audioRef.current!.duration);
      };
      audioRef.current.addEventListener('loadedmetadata', setAudioData);

      return () => {
        audioRef.current?.removeEventListener('loadedmetadata', setAudioData);
      };
    }
  }, []);

  // Update current time as audio plays
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  // Update the audio time when the range input is changed
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  return (
    <div >
      <audio ref={audioRef} src={audioUrl} />
      <div className="controls">
      
      
        <div className='flex justify-between items-center text-white-1 '>
            <h4>{formatTime(currentTime ? currentTime : 0)}</h4>
            <h4>{formatTime(audioRef.current ? audioRef.current.duration : 0)}</h4>
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <div className='flex '>
        <Button className='bg-black-1' onClick={togglePlayPause} variant="secondary">
          <Image
          src='/icons/reverse.svg'
          width={24}
          height={24}
          alt="controler"/>
        </Button>


        <Button className='bg-white-1' onClick={togglePlayPause} variant="secondary">
          <Image
          src={isPlaying ? '/icons/Pause.svg' : '/icons/Play.svg'}
          width={24}
          height={24}
          alt="controler"/>
        </Button>
        
        
        <Button className='bg-black-1' onClick={togglePlayPause} variant="secondary">
          <Image
          src='/icons/forward.svg'
          width={24}
          height={24}
          alt="controler"/>
        </Button>
        </div>
        </div>
      </div>
  );
};

export default AudioPlayer;
