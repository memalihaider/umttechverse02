"use client"

import { useEffect, useMemo, useState } from 'react'

interface CountdownProps {
  targetDate?: string // ISO string, e.g. 2026-01-05T09:00:00+05:00
  label?: string
  variant?: 'large' | 'compact'
}

function getTimeLeft(targetDate: string | undefined) {
  if (!targetDate) return null
  try {
    const now = new Date()
    const target = new Date(targetDate)
    const diff = target.getTime() - now.getTime()
    if (Number.isNaN(diff)) return null
    if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    return { expired: false, days, hours, minutes, seconds }
  } catch (err) {
    return null
  }
}

export default function Countdown({ targetDate = '2026-01-05T09:00:00+05:00', label = 'Event starts in', variant = 'large' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 500)
    return () => clearInterval(timer)
  }, [targetDate])

  const blocks = useMemo(() => {
    if (!timeLeft) return null
    const { expired, days, hours, minutes, seconds } = timeLeft as any
    if (expired) return null
    return [
      { label: 'Days', value: days },
      { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes },
      { label: 'Seconds', value: seconds }
    ]
  }, [timeLeft])

  return (
    <div className={`mt-4 ${variant === 'large' ? 'text-center' : ''}`}>
      <div className={`inline-flex ${variant === 'large' ? 'items-center' : 'items-stretch'} gap-3 bg-black/30 border border-purple-500/20 rounded-2xl px-4 py-3`}> 
        <div className={`${variant === 'large' ? 'text-sm text-purple-200' : 'text-xs text-purple-300'} mr-2 sm:mr-3 hidden sm:block`}>{label}</div>
        {(!timeLeft || timeLeft.expired) ? (
          <div className={`text-sm sm:text-base font-semibold text-cyan-300 ${variant === 'compact' ? 'px-2' : ''}`}>Event started</div>
        ) : (
          blocks && blocks.map((b) => (
            <div key={b.label} className={`flex flex-col items-center bg-linear-to-br from-purple-800/30 to-purple-900/40 rounded-md px-3 py-2 ${variant === 'compact' ? 'text-xs' : 'text-base sm:text-lg'} shadow-md`}> 
              <div className={`font-semibold text-white tracking-wider ${variant === 'large' ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                {String(b.value).padStart(2, '0')}
              </div>
              <div className="text-xs text-purple-200 mt-1">{b.label}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

