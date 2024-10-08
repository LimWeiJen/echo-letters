"use client"

import { GalaxyLoadingScreen } from '@/components/shared/LoadingScreen'
import Navbar from '@/components/shared/Navbar'
import { deleteLetter, getAllLetters } from '@/lib/actions/letters.actions'
import { useUser } from '@clerk/nextjs'
import { MailWarning, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Home = () => {
  /// VARIABLES ///
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLetters, setUserLetters] = useState<Array<LetterParams>>();
  const [returnedLetters, setReturnedLetters] = useState<Array<LetterParams>>();
  const [dataLoaded, setdataLoaded] = useState(false);

  /// USE EFFECT ///
  useEffect(() => {
    if (!user) return;
    getAllLetters(user?.id!).then((data) => {
      setUserLetters(data.userLetters.reverse());
      setReturnedLetters(data.returnedLetters.reverse());
      setdataLoaded(true);
    })
  }, [user]);

  // render the page if the data is loaded and the user is signed in, otherwise load the loading screen
  if (!isLoaded) return null;
  if (!dataLoaded) return <GalaxyLoadingScreen />
  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <main>
          <div className="lg:border-2 lg:shadow-2xl lg:border-[#EDEDED] lg:bg-[#0e0e0e69] lg:my-10 lg:mx-32 rounded-3xl">
            <div className="flex flex-col max-h-[calc(100vh-10rem)] h-[calc(100vh-10rem)] gap-28">
              <div className='overflow-y-scroll scroll-m-0 scroll-p-0 mt-8 h-5/6'>
                {userLetters?.map((letter, i) =>
                  <div key={i} className='flex mx-7 transition-all group'>
                    <Link href={`/create/${letter.id}`} className='flex justify-between transition-all group-hover:bg-[#0e0e0e89] flex-[0.95] p-4 rounded-xl'>
                      <div>
                        <h1 className='text-xl'>{letter.title}</h1>
                        <h1 className='text-lg'>Day {letter.day}</h1>
                      </div>
                      {(!returnedLetters![i].opened && returnedLetters![i].title !== "") && <MailWarning className='h-full' />}
                    </Link>
                    <div className='flex items-center justify-center align-middle gap-8 mx-4 transition-all flex-[0.05]'>
                      <Trash className='transition-all hover:scale-125 hover:cursor-pointer scale-110' onClick={() => deleteLetter(user.id, letter.id).then(() => window.location.reload())} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}

export default Home
