import { useEffect, useState } from 'react'

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
