"use client";
import HeroSection from "@/component/HeroSection";
import FeatureCards from "@/component/FeatureCards";
import ShoppingItem from "@/component/ShoppingItem";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="flex justify-end gap-4  m-10">
        <Link href={"/login"}>
        <button className="bg-green-500 p-4 rounded-md text-white font-bold">Login</button>
        </Link>
        <Link href={"/signup"}>
        <button className="bg-red-500 p-4 rounded-md text-white font-bold">SignUp</button>
        </Link>
      </div>
      <HeroSection /> 
      <FeatureCards />
      <ShoppingItem />
    </main>
  );
}
