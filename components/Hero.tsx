"use"
import React from 'react'
import { Spotlight } from './ui/spotlight-new'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from './ui/textGenerateEffect'
import MagicButton from './ui/magicButton'
import { FaLocationArrow } from 'react-icons/fa'

const Hero = () => {
  return (
    <div className='pb-20 pt-36' id="about">
      <div>
        
        <Spotlight />

      </div>
      <div className=" flex h-screen w-full items-center justify-center bg-white dark:bg-[#000319] absolute top-0 left-0">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#000319]"></div>
      {/* <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p> */}
    </div>

    <div className='flex  justify-center relative my-20 z-10'>
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center ">
          <h2 className='uppercase tracking-widest text-center text-xs max-w-80 text-blue-100'>Dynamic web magic with nextJs</h2>
          <TextGenerateEffect 
            words='Transforming Concepts Into Seamless User Experiences'
            className='text-center text-[60px] md:text-5xl lg:text-6xl'
            duration={0.8}

          />

          <p className="text-center text-white md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl ">
            Hi, I'm Abel Zereabruk a Next.js developer based in Ethiopia
          </p>

          <a href="#recent">
            <MagicButton 
              title = 'see my work'
              icon={<FaLocationArrow />}
              position='right'

            />
          </a>
        </div>
    </div>
    </div>
  )
}

export default Hero
