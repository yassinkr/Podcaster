"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

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

  return (
    <div >
      <audio ref={audioRef} src={audioUrl} />
      <div className="controls">
        <Button onClick={togglePlayPause} variant="secondary">
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{Math.floor(currentTime)} / {Math.floor(duration)} sec</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
