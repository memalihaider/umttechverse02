"use client"

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate?: string // ISO string, e.g. 2026-01-05T09:00:00+05:00
  label?: string
}

export default function Countdown({ targetDate = '2026-01-05T09:00:00+05:00', label = 'Event starts in' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) return null

  const { days, hours, minutes, seconds, expired } = timeLeft

  return (
    <div className="mt-4">
      <div className="inline-flex items-center gap-3 bg-black/40 border border-purple-500/20 rounded-xl px-4 py-2 text-center">
        <div className="text-sm text-purple-200">{label}:</div>
        {expired ? (
          <div className="text-sm sm:text-base font-semibold text-cyan-300">Event started</div>
        ) : (
          <div aria-live="polite" className="flex gap-2 text-white font-mono text-sm sm:text-base">
            <span className="px-2 py-1 rounded bg-purple-800/60">{String(days).padStart(2, '0')}d</span>
            <span className="px-2 py-1 rounded bg-purple-800/60">{String(hours).padStart(2, '0')}h</span>
            <span className="px-2 py-1 rounded bg-purple-800/60">{String(minutes).padStart(2, '0')}m</span>
            <span className="px-2 py-1 rounded bg-purple-800/60">{String(seconds).padStart(2, '0')}s</span>
          </div>
        )}
      </div>
    </div>
  )
}

function getTimeLeft(targetDate: string) {
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
