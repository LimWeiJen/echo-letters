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
          <div className="lg:border-2 shadow-2xl border-[#EDEDED] bg-[#0e0e0edd] lg:my-10 my-2 lg:mx-32 mx-2 rounded-3xl">
            <div className="flex flex-col h-[calc(100vh-10rem)] gap-28 mt-7">
              <div className='overflow-y-scroll scroll-m-0 scroll-p-0 mb-7 px-24'>
                <div className='flex flex-col w-full justify-center px-14' >
                  {returnedLetterContent !== "" &&
                    <div className='flex flex-col gap-2 my-14'>
                      <h1 className='text-center font-bold lg:text-7xl text-3xl text-[#DDC56FB0]'>Re: {title}</h1>
                      <h1 className='text-center lg:text-6xl text-3xl text-[#EDEDED50]'>Day {returnedDay}</h1>
                      <p className='lg:text-xl text-lg px-3.5 py-10'>{returnedLetterContent}</p>
                    </div>
                  }
                  {returnedLetterContent !== "" && <hr />}
                  <div className='flex flex-col gap-2 my-14'>
                    <input placeholder='Title' type="text" className='bg-transparent font-bold text-center lg:text-7xl text-3xl text-[#DDC56FB0] outline-none border-none' value={title} onChange={(e) => settitle(e.target.value)} />
                    <h1 className='text-center lg:text-6xl text-3xl text-[#EDEDED50]'>Day {day}</h1>
                  </div>
                  <div>
                    <textarea
                      placeholder='Write something...'
                      value={content}
                      onChange={(e) => setcontent(e.target.value)}
                      className='w-full h-[100vh] lg:text-xl text-lg bg-transparent border border-transparent appearance-none rounded px-3.5 py-2.5 outline-none'
                      style={{ color: "#c0c0c0" }}
                    />
                  </div>
                  {!sendingLetter ?
                    <SendHorizonal className='absolute top-[1.5%] left-[57%] bg-[#515574] rounded-full p-2 w-10 h-10 hover:shadow-2xl transition-all hover:scale-110 hover:cursor-pointer' onClick={() => {
                      setsendingLetter(true);
                      updateLetter(user?.id, id as string, {
                        title: title,
                        content: content,
                        opened: true,
                        dateOfCreation: new Date(),
                        day: day,
                        id: id as string
                      }).then(() => window.location.href = '/home')
                    }} /> : <GalaxyLoadingScreen />
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
