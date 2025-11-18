"use client"

import Image from 'next/image'
import { useState } from 'react'

interface LazyYoutubeProps {
  videoId: string
  title?: string
  aspectClass?: string // tailwind aspect class
}

export default function LazyYoutube({ videoId, title = 'Youtube video', aspectClass = 'aspect-video' }: LazyYoutubeProps) {
  const [showIframe, setShowIframe] = useState(false)
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className={`relative rounded-xl overflow-hidden ${aspectClass} bg-black`}> 
      {!showIframe ? (
        <button onClick={() => setShowIframe(true)} className="absolute inset-0 flex items-center justify-center w-full h-full">
          <Image src={thumb} alt={title + ' thumbnail'} fill style={{ objectFit: 'cover' }} className="transform transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30"></div>
          <div className="relative z-10 p-4 rounded-full bg-white/90 text-black shadow-xl flex items-center justify-center w-14 h-14">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
