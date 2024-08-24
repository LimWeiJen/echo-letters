'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  return (
    <main>
      <div>
        <nav>
          <h1>Home</h1>
          <h1>About</h1>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
        <div>
          <h1>@echo letters</h1>
          <h1>Echo Letters</h1>
          <h1>Where your thoughts find timeless wisdom</h1>
          <SignedIn>
            <Link href="/home">Home</Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
