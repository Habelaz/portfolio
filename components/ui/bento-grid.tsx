'use client'
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { Globe } from "./globe";
import { GlobeDemo } from "./gridglobe";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import Lottie from "react-lottie";
import MagicButton from "./magicButton";
import { IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[12rem] md:grid-cols-3", // Changed from 18rem to 12rem
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  imgClassName?: string;
  titleClassName?: string;
  img?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("abelazereabruk@gmail.com")
    setCopied(true);
  }
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 p-2 rounded-xl border border-neutral-200 bg-white  transition duration-200 hover:shadow-xl border-white/[0.1] dark:bg-black dark:shadow-none relative overflow-hidden", // Added relative and overflow-hidden
        className,
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Image container with absolute positioning */}
      <div className="absolute inset-0 w-full h-full">
        {img && (
          <img
            src={img}
            className={cn(
              "w-full h-full object-cover opacity-80 group-hover/bento:opacity-100 transition-opacity duration-300",
              imgClassName
            )}
            alt=""
          />
        )}
      </div>
      <div className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}>
        {spareImg && (
          <img
            src={spareImg}
            className='object-cover object-center w-full h-full'
            alt={spareImg}
          />
        )}
      </div>
        
        <div className={cn(
          titleClassName,"group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 text-white"
        )}>
          
          <div className="font-sans text-sm  font-extralight text-[#c1c2d3] text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-2xl max-w-96 z-10 ">
            {title}
          </div>
        
          {id === 6 && (
          <div className="mt-5 relative">
            <div className={`absolute -bottom-5 right-0`}>
              <Lottie
                options={{
                  loop: copied,
                  autoplay: copied,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
              />
            </div>
            <MagicButton 
              title={copied ? "Email copied!" : "Copy my email"}
              icon={<IoCopyOutline />}
              position="left"
              otherClasses="bg-[#161a31]"
              handleClick={handleCopy}
            />
          </div>
        )}
        {id === 2 && <GlobeDemo />}

        {id === 3 && (
          <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
            <div className="flex flex-col gap-5 lg:pt-3 ">
              {['React.Js', 'Next.Js','TypeScript'].map((item) => (
                <span key={item} className="p-2  lg:py-0 text-xs lg:text-base text-[#c1c2d3] opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132e]">
                  {item}
                </span>
              ))}
              <span className="p-2 rounded-lg text-center bg-[#10132e]"/>
            </div>
            <div className="flex flex-col gap-5  lg:pb-3">
              <span className="p-2 rounded-lg text-center bg-[#10132e]"/>
              {['RTK query', 'Go','Postgress'].map((item) => (
                <span key={item} className="p-2  lg:py-0 text-xs lg:text-base text-[#c1c2d3] opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132e]">
                  {item}
                </span>
              ))}
              
            </div>
          </div>
        )}
      {/* Content overlay */}
      {/* <div className="relative z-10 flex flex-col h-full">
        {icon}
        <div className={cn(
          "font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-auto", // Added mt-auto to push to bottom
          titleClassName
        )}>
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div> */}
    </div>
    </div>
  );
};