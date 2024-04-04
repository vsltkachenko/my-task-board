import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en'

import { useEffect, useRef } from 'react'

interface AirDatepickerProps {
    range: boolean
    selectedDates: string[]
    classes: string
    autoClose: boolean
    onSelect: (date: any) => void
}

const AirDatepickerReact: React.FC<AirDatepickerProps> = (props) => {
    const $input = useRef<HTMLInputElement>(null)
    const dp = useRef<AirDatepicker | null>(null)

    useEffect(() => {
        if ($input.current) {
            dp.current = new AirDatepicker($input.current, {
                ...props,
                locale: localeEn
                //   dateFormat(date) {
                //     const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                //     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                //     const day = date.getDate();
                //     const weekday = weekdays[date.getDay()];
                //     const month = months[date.getMonth()];

                //     return `${weekday}, ${day} ${month}`;
                // }
            })
        }
    }, [])

    useEffect(() => {
        if (dp.current) {
            dp.current.update({ ...props })
        }
    }, [props])

    return <div ref={$input} />
}

export default AirDatepickerReact
