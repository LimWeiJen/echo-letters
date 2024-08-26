"use client"

import Navbar from '@/components/shared/Navbar'
import { getAllLetters } from '@/lib/actions/letters.actions'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLetters, setUserLetters] = useState<Map<string, LetterParams>>();
  const [returnedLetters, setReturnedLetters] = useState<Map<string, LetterParams>>();

  if (!isLoaded) return null;

  useEffect(() => {
    if (!user) return;
    getAllLetters(user?.id).then((data) => {
      setUserLetters(data.userLetters);
      setReturnedLetters(data.returnedLetters);
    })
  }, [user]);

  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <div>
          {Array.from(userLetters?.values() || []).map((v, i) => <div key={i}>
            {v.title}
          </div>)}
        </div>
      </div>
    )
}

export default Home
