import { useEffect, useRef, useState } from 'react'
import { fetchGuestList } from '../lib/api'

export function useGuestList() {
  const [guestList, setGuestList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const promiseRef = useRef(null)

  useEffect(() => {
    let isCancelled = false
    const promise = fetchGuestList()
    promiseRef.current = promise

    promise
      .then((data) => {
        if (!isCancelled) setGuestList(data)
      })
      .catch(() => {
        if (!isCancelled) setGuestList([])
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [])

  // Resolves to the fetched list (or [] on failure) even if called before the
  // fetch has settled — callers that need the definitive list (e.g. searching
  // it) should await this instead of reading `guestList` directly, since that
  // state won't reflect the fetch result until the next render.
  async function waitForGuestList() {
    try {
      return (await promiseRef.current) ?? []
    } catch {
      return []
    }
  }

  return { guestList, isLoading, waitForGuestList }
}
