"use client"

import { updateLetter } from '@/lib/actions/letters.actions';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useRef } from 'react'

const Create = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { id } = useParams();
  const content = useRef<any>(null);
  const title = useRef<any>(null);

  if (!isSignedIn || !isLoaded || !user || !id) return null;

  return (
    <div>
      <input type="text" ref={title} />
      <textarea ref={content} />
      <button onClick={() => updateLetter(user?.id, id as string, {
        title: title.current?.value,
        content: content.current?.value,
        opened: true,
        dateOfCreation: new Date(),
        day: 0,
        id: id as string
      })}>Send</button>
    </div>
  )
}

export default Create
