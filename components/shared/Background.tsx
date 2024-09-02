"use client"

import React from 'react'
import Image from 'next/image'
import bg from '../../public/assets/Background.svg'

if (typeof window !== 'undefined') {
  document.onmousemove = (e) => {
    let xPos = e.pageX;
    let yPos = e.pageY;
    let circle = document.getElementById('circle');
    if (!circle) return;
    circle.style.left = xPos - 400 + 'px';
    circle.style.top = yPos - 400 + 'px';
  }
}

const Background = () => {
  return (
    <div className='absolute top-0 right-0 h-screen w-screen -z-10 overflow-hidden'>
      <Image src={bg} alt='background' className='absolute top-[70%] scale-[200%]' />
      <div id='circle' style={{
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(110, 98, 56, 0.3) 0%, rgba(255, 255, 255, 0) 100%)',
        width: '800px',
        height: '800px',
      }} className='rounded-full absolute -z-50'></div>
    </div>
  )
}

export default Background
