"use client"

import { GalaxyLoadingScreen } from '@/components/shared/LoadingScreen'
import Navbar from '@/components/shared/Navbar'
import { dummyLetters } from '@/constants/dummydata'
import { getAllLetters } from '@/lib/actions/letters.actions'
import { differenceInDays } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { MailWarning, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLetters, setUserLetters] = useState<Array<LetterParams>>();
  const [returnedLetters, setReturnedLetters] = useState<Array<LetterParams>>();
  const [dataLoaded, setdataLoaded] = useState(false);

  useEffect(() => {
    // To be removed during production
    //setUserLetters(dummyLetters);
    //setReturnedLetters(dummyLetters);
    //return;
    //

    if (!user) return;
    getAllLetters(user?.id!).then((data) => {
      setUserLetters(data.userLetters);
      setReturnedLetters(data.returnedLetters);
      setdataLoaded(true);
    })
  }, [user]);

  if (!isLoaded) return null;

  if (!dataLoaded) return <GalaxyLoadingScreen />

  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <main>
          <div className="border-2 shadow-2xl border-[#EDEDED] bg-[#0e0e0e69] my-10 mx-32 rounded-3xl h-screen">
            <div className="flex flex-col h-[calc(100vh)] gap-28">
              <div className='overflow-y-scroll scroll-m-0 scroll-p-0 mt-8 h-5/6'>
                {userLetters?.map((letter, i) =>
                  <div key={i} className='flex mx-7 transition-all group'>
                    <Link href={`/create/${letter.id}`} className='flex justify-between transition-all group-hover:bg-[#0e0e0e89] flex-[0.95] p-4 rounded-xl'>
                      <div>
                        <h1 className='text-4xl'>{letter.title}</h1>
                        <h1 className='text-2xl'>Day {differenceInDays(new Date(), new Date(letter.dateOfCreation))}</h1>
                      </div>
                      {!returnedLetters![i].opened && <MailWarning className='h-full' />}
                    </Link>
                    <div className='flex items-center justify-center align-middle gap-8 mx-4 transition-all flex-[0.05]'>
                      <Trash className='transition-all hover:scale-125 hover:cursor-pointer scale-110' />
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
