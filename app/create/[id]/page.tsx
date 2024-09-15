"use client"

import { GalaxyLoadingScreen } from '@/components/shared/LoadingScreen';
import Navbar from '@/components/shared/Navbar';
import { updateLetter, getLetter, markLetterAsOpened } from '@/lib/actions/letters.actions';
import { useUser } from '@clerk/nextjs';
import { Loader, SendHorizonal } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Create = () => {
  /// VARIABLES ///
  const { isSignedIn, user, isLoaded } = useUser();
  const { id } = useParams();
  const [content, setcontent] = useState("");
  const [title, settitle] = useState("");
  const [returnedLetterContent, setreturnedLetterContent] = useState("");
  const [day, setday] = useState(0);
  const [returnedDay, setreturnedDay] = useState(0);
  const [dataLoaded, setdataLoaded] = useState(false);
  const [sendingLetter, setsendingLetter] = useState(false);

  /// USE EFFECT ///
  useEffect(() => {
    if (!user) return;

    // get the letter from the database
    getLetter(user?.id!, id as string).then(async (data) => {
      settitle(data.userLetter?.title);
      setcontent(data.userLetter?.content);
      setday(data.userLetter?.day);
      setreturnedLetterContent(data.returnedLetter?.content);
      setreturnedDay(data.returnedLetter?.day);

      // if the returned letter is not opened yet, mark the returned letter as opened
      if (!data.returnedLetter?.opened) await markLetterAsOpened(user.id, id as string)

      setdataLoaded(true);
    })
  }, [user]);

  // only render the page when the data is loaded and the user is signed in, otherwise load the loading screen
  if (!isLoaded) return null;
  if (!dataLoaded) return <GalaxyLoadingScreen />
  if (isSignedIn)
    return (
      <div>
        <Navbar user={user} />
        <main>
          <div className="border-2 shadow-2xl border-[#EDEDED] bg-[#0e0e0e69] my-10 mx-32 rounded-3xl h-screen">
            <div className="flex flex-col h-[calc(100vh)] gap-28 mt-7">
              <div className='overflow-y-scroll scroll-m-0 scroll-p-0 h-5/6'>
                <div className='flex flex-col w-full justify-center px-14' >
                  {returnedLetterContent !== "" &&
                    <div className='flex flex-col gap-2 my-14'>
                      <h1 className='text-center text-8xl text-[#DDC56FB0]'>Re: {title}</h1>
                      <h1 className='text-center text-6xl text-[#EDEDED50]'>Day {returnedDay}</h1>
                      <p className='text-3xl tracking-wide px-3.5 py-10'>{returnedLetterContent}</p>
                    </div>
                  }
                  <hr />
                  <div className='flex flex-col gap-2 my-14'>
                    <input placeholder='Title' type="text" className='bg-transparent text-center text-8xl text-[#DDC56FB0] outline-none border-none' value={title} onChange={(e) => settitle(e.target.value)} />
                    <h1 className='text-center text-6xl text-[#EDEDED50]'>Day {day}</h1>
                  </div>
                  <div className="
                  grid
                  text-sm
                  after:px-3.5
                  after:py-2.5
                  [&>textarea]:text-inherit
                  after:text-inherit
                  [&>textarea]:resize-none
                  [&>textarea]:overflow-hidden
                  [&>textarea]:[grid-area:1/1/2/2]
                  after:[grid-area:1/1/2/2]
                  after:whitespace-pre-wrap
                  after:invisible
                  after:content-[attr(data-cloned-val)_'_']
                  after:border
                  ">
                    <textarea
                      placeholder='Write something...'
                      value={content}
                      onChange={(e) => setcontent(e.target.value)}
                      className='w-full h-[100vh] text-3xl tracking-wide bg-transparent border border-transparent appearance-none rounded px-3.5 py-2.5 outline-none'
                    />
                  </div>
                  {!sendingLetter ?
                    <SendHorizonal className='absolute bottom-[4%] bg-[#515574] rounded-full p-2 w-12 h-12 hover:shadow-2xl transition-all hover:scale-110 hover:cursor-pointer left-[13%]' onClick={() => {
                      setsendingLetter(true);
                      updateLetter(user?.id, id as string, {
                        title: title,
                        content: content,
                        opened: true,
                        dateOfCreation: new Date(),
                        day: day,
                        id: id as string
                      }).then(() => window.location.href = '/home')
                    }} /> : <Loader className='absolute bottom-[4%] bg-[#515574] rounded-full p-2 w-12 h-12 hover:shadow-2xl transition-all hover:scale-110 hover:cursor-pointer left-[13%]' />
                  }
                </div>
              </div>
            </div>
          </div>
        </main >
      </div >
    )
}

export default Create
