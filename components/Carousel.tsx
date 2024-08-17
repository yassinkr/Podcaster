"use client";
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselProps, Podcast } from '@/types';
import { useRouter } from 'next/navigation';
import { tree } from 'next/dist/build/templates/app-page';
import { User } from '@/types/index';
import Image from 'next/image';

const EmblaCarousel= ({TopUsers ,podcasts}:{TopUsers:User[],podcasts:Podcast[]}) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true},[Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay  || !("stopOnInteraction" in autoplay.options))  return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as ()=>void)
        :( autoplay.stop as ()=>void)

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )
  const slides = TopUsers && TopUsers?.filter((item : User)=>{if(item.podcastCount) item.podcastCount > 0})
 console.log(podcasts);

    return (
    <section className="flex w-full flex-col gap-4 overflow-hidden"  ref={emblaRef}>
      <div className="flex">
          {podcasts.slice(0,5).map((index) => (
            <figure  key={index.id}
            className='carousel_box'
            onClick={()=>router.push(`/podcast/${index.id}`)}
            >
              <Image
              src={index.imageURL}
              alt='card'
              fill
              className="absolute size-full rounded-xl border-none"
              />
              <div>
                <h2 className='text-sm font-semibold text-white-1'>{index.title}</h2>
                
              </div>
              </figure>
          ))}
        
      </div>
      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
