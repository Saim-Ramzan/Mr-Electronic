import Image from "next/image";
import React from "react";

function ShoppingItem() {
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="w-full mb-5 ">
      <h1 className="text-center text-3xl   font-bold mt-5">Show Now</h1>
      <div className="mt-10  max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {data.map((_,index) => (
            <div key={index} className="flex justify-center">
            <div className="rounded-[22px]  max-w-sm p-4 bg-white dark:bg-zinc-900 w-full">
              <Image
                src={`/jordans.webp`}
                alt="jordans"
                height={400}
                width={400}
                className="object-contain"
              />
              <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                Air Jordan 4 Retro Reimagined
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
                February 17, 2024. Your best opportunity to get these right now
                is by entering raffles and waiting for the official releases.
              </p>
              <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <span>Buy now </span>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  $100
                </span>
              </button>
            </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingItem;
