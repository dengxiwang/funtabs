import { useEffect, useMemo, useRef, useState } from 'react';
import './clock.css';

const Clock = ({ fontColor }) => {
    const timerRef = useRef();
    const [time, setTime] = useState({
        hour: '',
        minutes: '',
        seconds: '',
        year: '',
        month: '',
        day: '',
        weekday: ''
    });

    const weekdayMap = useMemo(() => ({
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日'
    }), []);

    const setHeight = useMemo(() => () => (document.body.clientWidth < 650 ? '156px' : '245px'), []);

    const getNewDate = () => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const weekday = weekdayMap[time.getDay()];
        const hour = ('0' + time.getHours()).slice(-2);
        const minutes = ('0' + time.getMinutes()).slice(-2);
        const seconds = ('0' + time.getSeconds()).slice(-2);

        setTime({ hour, minutes, seconds, year, month, day, weekday });
    };

    useEffect(() => {
        getNewDate();
        timerRef.current = setInterval(getNewDate, 1000);
        return () => clearInterval(timerRef.current);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="clock" style={{ height: setHeight(), color: fontColor }}>
            <div style={{ zIndex: '1', marginTop: '33px', marginBottom: '33px' }}>
                <div className="clock-card">
                    <p className="hourclass">
                        {time.hour && `${time.hour}:`}
                        {time.minutes}
                    </p>
                </div>
                <div className="dateclass">
                    {time.month && (
                        <p>
                            {`${time.year}年${time.month}月${time.day}日 星期${time.weekday}`}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Clock;