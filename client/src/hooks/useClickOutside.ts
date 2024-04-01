import { useEffect, RefObject } from 'react'

type ClickOutsideCallback = () => void

export const useClickOutside = (
    ref: RefObject<HTMLElement>,
    callback: ClickOutsideCallback
) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.dir(e.target)
            if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref, callback])
}
