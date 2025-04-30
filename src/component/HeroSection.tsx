import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { Button } from "./ui/moving-border";
import Link from "next/link";

function HeroSection() {
  const words = [
    {
      text: "Master of repairing",
      className:
        "mt-10 sm:mt-20 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400",
    },
    {
      text: "Center",
      className:
        "text-blue-500 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold dark:text-blue-500",
    },
  ];
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex  flex-col justify-center items-center overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative p-4 w-full text-center z-10">
        <TypewriterEffectSmooth className="justify-center flex-wrap text-xl sm text-wrap" words={words} />
        <p className="mt-4 font-normal text-lg md:text-lg text-neutral-300 max-w-[80%] mx-auto">
          {`A "Master of Mobile Repairing and Parts Center" is a dedicated
          facility specializing in repairing and maintaining mobile phones and
          providing high-quality spare parts. These centers cater to a wide
          range of mobile issues, including screen replacement, battery
          problems, software troubleshooting, camera repairs, charging port
          fixes, and more. Equipped with skilled technicians and advanced tools,
          they ensure efficient and reliable services. Additionally, they stock
          a variety of genuine and compatible mobile parts, such as screens,
          batteries, motherboards, and accessories, catering to various brands
          and models. The focus is on offering cost-effective, quick, and
          trustworthy solutions to enhance the performance and longevity of
          mobile devices.`}
        </p>
        <div className="mt-4">
          <Link href={"/shop"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Explore my Center
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
