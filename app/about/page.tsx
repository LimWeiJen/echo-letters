import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

const About = () => {
  return (
    <main>
      <div className="border-2 shadow-2xl border-[#EDEDED] bg-[#0E0E0E69] my-10 mx-32 rounded-3xl h-screen">
        <nav className="flex gap-x-12 justify-end align-middle py-5 px-14">
          <Link href="/" className="transition-all hover:scale-110 hover:shadow-2xl">Home</Link>
          <Link href="/about" className="transition-all hover:scale-110 hover:shadow-2xl">About</Link>
          <div className="bg-[#DDC56F63] px-6 rounded-xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
        <div className="flex flex-col items-center h-[calc(100vh)] gap-28 mt-28">
          <h1 className="text-9xl"><span className="text-[#DDC56FB0]">About</span></h1>
          <h1 className="text-2xl mx-32 text-[#EDEDED]">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</h1>
        </div>
      </div>
    </main>

  )
}

export default About
