import { useRef, useCallback, useEffect } from 'react'

export function useDebouncedCallback<T extends (..._args: any[]) => any>(
  fn: T,
  delay = 300,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fnRef = useRef<T>(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback(
    (..._args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => fnRef.current(..._args), delay)
    },
    [delay],
  )
}
