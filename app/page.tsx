'use client'

import Background from "@/components/shared/Background";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  return (
    <main>
      <div className="border-2 bg-[#EDEDED11] shadow-2xl border-[#EDEDED] my-10 mx-32 rounded-3xl h-screen">
        <nav className="flex gap-x-12 justify-end align-middle py-5 px-14">
          <Link href="/home" className="transition-all hover:scale-110 hover:shadow-2xl">Home</Link>
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
        <div className="flex flex-col items-center justify-center h-[calc(100vh)]">
          <h1 className="text-5xl text-[#EDEDED50]">@echo letters</h1>
          <h1 className="text-9xl">Echo <span className="text-[#DDC56FB0]">Letters</span></h1>
          <h1 className="text-5xl text-[#EDEDED50]">Where your thoughts find timeless wisdom</h1>
          <div className="text-5xl my-24 py-2.5 px-24 bg-[#DDC56F63] rounded-3xl border-2 border-[#EDEDED] transition-all hover:scale-110 hover:shadow-2xl hover:rotate-1">
            <SignedIn>
              <Link href="/home">Start Now</Link>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </main>
  );
}
