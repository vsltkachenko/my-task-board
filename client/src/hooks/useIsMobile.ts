import { useEffect, useState } from 'react'

const useIsMobile = (width = 768) => {
    const [viewportSize, setViewportSize] = useState('pc')

    useEffect(() => {
        const getClientWidth = () => {
            const сlientWidth = document.documentElement.clientWidth

            if (сlientWidth <= width && viewportSize !== 'mobile') {
                setViewportSize('mobile')
            }
            if (сlientWidth > width && viewportSize !== 'pc') {
                setViewportSize('pc')
            }
        }

        getClientWidth()
        window.addEventListener('resize', getClientWidth)
        return () => {
            window.removeEventListener('resize', getClientWidth)
        }
    }, [width, viewportSize])

    return viewportSize === 'mobile'
}
export default useIsMobile
