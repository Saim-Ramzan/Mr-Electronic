'use client'
import Shopping from "@/component/Shopping";


export default function shop() {
  
  return (
    <main className="min-h-screen bg-black/[#2e3132] antialiased bg-grid-white/[0.02]">
        <div className="pt-20">
        <h1 className="text-center text-3xl text-white font-bold m-10 ">Shop</h1>
        <Shopping />
        </div>
    </main>
  );
}