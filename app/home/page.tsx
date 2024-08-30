"use client"

import Navbar from '@/components/shared/Navbar'
import { getAllLetters } from '@/lib/actions/letters.actions'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLetters, setUserLetters] = useState<Array<LetterParams>>();
  const [returnedLetters, setReturnedLetters] = useState<Array<LetterParams>>();

  useEffect(() => {
    if (!user) return;
    getAllLetters(user?.id).then((data) => {
      setUserLetters(data.userLetters);
      setReturnedLetters(data.returnedLetters);
      console.log(data);
    })
  }, [user]);

  if (!isLoaded) return null;

  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <div>
          {userLetters?.map((letter, i) => <div key={i}>
            {letter.title}
          </div>)}
        </div>
      </div>
    )
}

export default Home
