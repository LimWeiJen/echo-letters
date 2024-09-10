import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
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
          <h1 className="text-2xl mx-32 text-[#EDEDED] overflow-y-scroll scroll-m-0 scroll-p-0 tracking-wide">
            Welcome to <strong>Echo Letters</strong>, where your thoughts find a thoughtful response.

            At Echo Letters, we believe in the power of reflection and the value of every individual&#39;s story. Our platform allows you to create personal diaries, which are then sent to our artificial intelligence for a unique and engaging interaction. Inspired by the timeless wisdom of Seneca&#39;s "Letters from a Stoic," our AI provides thoughtful, reflective replies to your diary entries, offering insights and perspectives that encourage deeper contemplation and personal growth.

            <strong>Our Mission</strong>

            Our mission is to create a safe and supportive space where users can express themselves freely and receive meaningful feedback. We aim to blend the ancient art of letter writing with modern technology, fostering a community of introspection and connection.
            <br /><br />
            <strong>How It Works</strong>

            <ol>
              <li>
                Write Your Diary: Share your thoughts, experiences, and reflections in your personal diary.
              </li>
              <li>
                Send to AI: Submit your diary entry to our AI.
              </li>
              <li>
                Receive a Response: Our AI will read your entry and craft a thoughtful, reflective response, just like Seneca did in his letters.
              </li>
            </ol>

            <br /><br />
            <strong>Why Echo Letters?</strong>
            <ul>
              <li>
                Reflective Responses: Our AI is designed to provide responses that are not only intelligent but also deeply reflective, encouraging you to think more deeply about your experiences.
              </li>
              <li>
                Personal Growth: By engaging with our AI, you can gain new insights and perspectives that support your personal development.
              </li>
            </ul>

            <br /><br />
            <strong>Join Us</strong>
            Start your journey with Echo Letters today and discover the power of thoughtful reflection. Whether you&#39;re looking to explore your thoughts, seek advice, or simply find a new way to engage with your experiences, DiaryAI is here for you.
          </h1>
        </div>
      </div>
    </main>

  )
}

export default About
