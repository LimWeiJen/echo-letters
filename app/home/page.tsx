"use client"

import Navbar from '@/components/shared/Navbar'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <div>
        </div>
      </div>
    )
}

export default Home
