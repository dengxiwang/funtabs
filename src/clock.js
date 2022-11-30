import { useEffect, useRef, useState } from 'react';
import './clock.css';

function Clock() {
    const timmer = useRef()
    const [Hour, setHour] = useState('');
    const [, setSeconds] = useState('');
    const [Minutes, setMinutes] = useState('');
    const [Year, setYear] = useState('');
    const [Month, setMonth] = useState('');
    const [Day, setDay] = useState('');
    const [Weekday, setWeekday] = useState('')

    const weekdayMap = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日',
        7: '日'
    }

    useEffect(() => {
        getNewDate()
        timmer.current = setInterval(getNewDate, 1000);
        return () => {
            clearTimeout(timmer.current)
        }
        // eslint-disable-next-line
    }, [])

    const getNewDate = () => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const wday = time.getDay()
        const hour = time.getHours();
        if (hour < 10) {
            setHour(`0${hour}`)
        } else {
            setHour(hour)
        }
        const minutes = time.getMinutes();
        const s = time.getSeconds();
        const seconds = s <= 9 ? "0" + s : s;
        // const t = `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
        // setHour(hour)
        setSeconds(seconds)
        if (minutes < 10) {
            setMinutes(`0${minutes}`)
        } else {
            setMinutes(minutes)
        }
        setYear(year)
        setMonth(month)
        setDay(day)
        setWeekday(weekdayMap[wday])
    }

    return (
        <div className="clock" style={{ marginTop: '50px' }}>
            <div style={{ zIndex: '1', marginTop: '33px', marginBottom: '33px' }}>
                <div className='clock-card'>
                    <p className='hourclass'>{Hour}{Hour && <span>:</span>}{Minutes}</p>
                    {/* <p className='secondsclass'>{Seconds}</p> */}
                </div>
                <div className='dateclass'>
                    {/* <p>{Year}年{Month}月{Day}日</p> */}
                    {Month && <p>
                        {`${Year}年${Month}月${Day}日 星期${Weekday}`}
                    </p>}
                </div>
            </div>
        </div>
    )
}

export default Clock;