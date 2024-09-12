import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <main>
      <div className="border-2 shadow-2xl border-[#EDEDED] bg-[#0E0E0E69] my-10 mx-32 rounded-3xl h-screen">
        <nav className="flex gap-x-12 justify-end align-middle py-5 px-14">
          <Link href="/" className="transition-all hover:scale-110 hover:shadow-2xl">Home</Link>
          <Link href="/about" className="transition-all hover:scale-110 hover:shadow-2xl">About</Link>
          <div className="bg-[#DDC56F63] px-6 rounded-xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <Link href="/home" className="transition-all hover:scale-110 hover:shadow-2xl">Start Now</Link>
          </div>
        </nav>
        <div className="flex flex-col items-center h-[calc(100vh)] gap-28 mt-28">
          <h1 className="text-9xl"><span className="text-[#DDC56FB0]">About</span></h1>
          <h1></h1>
        </div>
      </div>
    </main>

  )
}

export default About
