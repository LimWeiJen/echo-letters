import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <main>
      <div className="lg:border-2 bg-[#0E0E0EDD] shadow-2xl border-[#EDEDED] lg:my-10 my-2 lg:mx-32 mx-2 rounded-3xl h-screen">
        <nav className="flex gap-x-12 lg:justify-end justify-center align-middle py-5 px-14">
          <Link href="/" className="transition-all hover:scale-110 hover:shadow-2xl">Home</Link>
          <Link href="/about" className="transition-all hover:scale-110 hover:shadow-2xl">About</Link>
          <div className="bg-[#DDC56F63] px-6 rounded-xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <Link href="/home" className="transition-all hover:scale-110 hover:shadow-2xl">Start Now</Link>
          </div>
        </nav>
        <div className="flex flex-col items-center h-[calc(100vh)] gap-28 mt-28">
          <h1 className="text-7xl"><span className="text-[#DDC56FB0]">About</span></h1>
          <h1 className='p-4 px-24 overflow-y-scroll h-96 w-full lg:text-xl text-lg bg-transparent'>
            Welcome to Echo Letters, where your thoughts find timeless wisdom.
            <br /><br />
            At Echo Letters, we believe in the power of reflection and the value of every individual’s story. Our platform allows you to create personal diaries, which are then sent to our advanced artificial intelligence for a unique and engaging interaction. Our AI provides thoughtful, reflective replies to your diary entries, offering insights and perspectives that encourage deeper contemplation and personal growth.
            <br /><br />
            Of course, the tone our AI is fully customizable to suit your writing style.
            <br /><br />
            Our mission is to create a safe and supportive space where users can express themselves freely and receive meaningful feedback. We aim to blend the ancient art of letter writing with modern technology, fostering a community of introspection and connection.
            <br /><br />
            Start your journey with Echo Letters today and discover the power of thoughtful reflection. Whether you’re looking to explore your thoughts, seek advice, or simply find a new way to engage with your experiences, Echo Letters is here for you.
          </h1>
        </div>
      </div>
    </main>

  )
}

export default About
