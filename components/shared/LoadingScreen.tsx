'use client'

import { useEffect, useState } from 'react'

export function GalaxyLoadingScreen({ message = "Connecting" }) {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#1A1C30] overflow-hidden">
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 starfield animation-delay-200" />
      <div className="absolute inset-0 starfield animation-delay-400" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1A1C30] to-[#2C3264] animate-spin-slow" />
          <div className="absolute inset-2 rounded-full bg-black" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1A1C30] to-[#2C3264] opacity-50 blur-md animate-pulse" />
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-white text-2xl font-bold animate-pulse">
          {message}{dots}
        </p>
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        .starfield::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 4s ease-in-out infinite;
          transform: rotate(45deg);
        }
        .animation-delay-200::before {
          animation-delay: 0.2s;
        }
        .animation-delay-400::before {
          animation-delay: 0.4s;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
