'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="lg:border-2 bg-[#EDEDED11] shadow-2xl border-[#EDEDED] lg:my-10 my-2 lg:mx-32 mx-2 rounded-3xl h-screen">
        <nav className="flex gap-x-12 lg:justify-end justify-center align-middle py-5 px-14">
          <Link href="/" className="transition-all hover:scale-110 hover:shadow-2xl">Home</Link>
          <Link href="/about" className="transition-all hover:scale-110 hover:shadow-2xl">About</Link>
          <div className="bg-[#DDC56F63] px-6 rounded-xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <Link href="/home" className="transition-all hover:scale-110 hover:shadow-2xl">Start Now</Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center h-[calc(100vh)]">
          <h1 className="lg:text-xl text-lg text-[#EDEDED50] text-center">@echo letters</h1>
          <h1 className="lg:text-7xl text-6xl text-center">Echo <span className="text-[#DDC56FB0]">Letters</span></h1>
          <h1 className="lg:text-xl text-lg text-[#EDEDED50] text-center">Where your thoughts find timeless wisdom</h1>
          <div className="lg:text-xl text-lg my-24 py-2.5 px-24 bg-[#DDC56F63] rounded-3xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <Link href="/home">Start Now</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
