"use client"

import { createEmptyLetter, getAllLetters } from '@/lib/actions/letters.actions'
import { Home, MailIcon, MailWarning, Pencil, Settings } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SignedIn, UserButton } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Navbar = ({ user }: { user: any }) => {
  const [unreadLetters, setunreadLetters] = useState<Array<LetterParams>>([]);

  useEffect(() => {
    if (!user) return;
    console.log(user)
    getAllLetters(user.id).then(data => {
      setunreadLetters(data.returnedLetters.filter((letter: LetterParams) => !letter.opened));
    })
  }, [user]);

  return (
    <nav className='flex w-screen justify-center gap-x-4 p-5'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Link href='/home' className='transition-all hover:scale-125'>
        <Home />
      </Link>
      <Pencil className='hover:cursor-pointer transition-all hover:scale-125' onClick={() => createEmptyLetter(user.id).then((data) => window.location.href = `/create/${data.id}`)} />
      {unreadLetters?.length > 0 ? <DropdownMenu>
        <DropdownMenuTrigger className='transition-all hover:scale-125'><MailWarning /></DropdownMenuTrigger>
        <DropdownMenuContent>
          {unreadLetters.map((l: LetterParams) => <DropdownMenuItem key={l.id} className='hover:cursor-pointer text-xl bg-[#0E0E0E] my-2 p-2' onClick={() => window.location.href = `/create/${l.id}`}>
            {l.title}
          </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu> : <MailIcon className='transition-all hover:scale-125' />}
      <Link href='/settings' className='transition-all hover:scale-125'>
        <Settings />
      </Link>
    </nav>
  )
}

export default Navbar
