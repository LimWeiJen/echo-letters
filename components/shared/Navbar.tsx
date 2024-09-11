"use client"

import { createEmptyLetter } from '@/lib/actions/letters.actions'
import { Home, Inbox, MailIcon, MailOpenIcon, MailPlusIcon, Pencil, Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { SignedIn, UserButton } from "@clerk/nextjs"

const Navbar = ({ user }: { user: any }) => {
  return (
    <nav className='flex w-screen justify-center gap-x-4 p-5'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Link href='/home'>
        <Home />
      </Link>
      <Pencil className='hover:cursor-pointer' onClick={() => createEmptyLetter(user.id).then((data) => window.location.href = `/create/${data.id}`)} />
      <MailIcon />
      <Link href='/settings'>
        <Settings />
      </Link>
    </nav>
  )
}

export default Navbar
