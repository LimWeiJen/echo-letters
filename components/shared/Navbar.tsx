import { createEmptyLetter } from '@/lib/actions/letters.actions'
import { Home, Inbox, MailIcon, MailOpenIcon, MailPlusIcon, Pencil, Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = ({ user }: { user: any }) => {
  return (
    <nav className='flex w-screen justify-center gap-x-4 p-5'>
      <h1>{user.username}</h1>
      <Link href='/home'>
        <Home />
      </Link>
      <Pencil onClick={() => createEmptyLetter(user.id)} />
      <MailIcon />
      <Link href='/settings'>
        <Settings />
      </Link>
    </nav>
  )
}

export default Navbar
