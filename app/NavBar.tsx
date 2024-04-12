import Link from 'next/link'
import React from 'react'
import { BsFillBugFill } from "react-icons/bs";

const NavBar = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues'}
  ]
  return (
    <nav className=' flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><BsFillBugFill className=' hover:text-red-800 hover:scale-105 duration-200' size={25} /></Link>
      <ul className=' flex space-x-6'>
        {navLinks.map(link => 
          <Link 
            key={link.href} 
            className=' text-zinc-500 hover:text-zinc-800 transition-colors' 
            href={link.href}>{link.label}
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default NavBar