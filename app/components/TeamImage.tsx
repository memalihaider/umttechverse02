"use client"

import Image from 'next/image'
import { useState } from 'react'

type TeamImageProps = React.ComponentProps<typeof Image> & {
  fallback?: string
}

export default function TeamImage({ src, alt, fallback = '/images/avatar-placeholder.svg', loading = 'lazy', ...props }: TeamImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>((typeof src === 'string' ? src : undefined) as string | undefined)

  return (
    <Image
      src={imgSrc || fallback}
      alt={typeof alt === 'string' ? alt : 'Member image'}
      onError={() => setImgSrc(fallback)}
      loading={loading}
      {...props}
    />
  )
}
