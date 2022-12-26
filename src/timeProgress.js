import { CheckOutlined, HourglassOutlined, SettingTwoTone } from "@ant-design/icons";
import { Col, DatePicker, Input, message, Modal, Progress, Row, Select } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import DeleteCard from "./deleteCard";
import './funtabs.css';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

const TimeProgress = (props) => {
    const { edit, id, widthNum, heightNum, cardStyle, linkList, item, setLinkList } = props;
    const [ellipsis] = useState('ture');
    const date = new Date()
    const [type, setType] = useState(
        () => {
            if (window.localStorage.getItem('timeType' + item.id)) {
                return window.localStorage.getItem('timeType' + item.id)
            } else {
                return 'day'
            }
        }
    )
    const [beginTime, setBeginTime] = useState(
        () => {
            if (type === 'one') {
                if (window.localStorage.getItem('beginTime' + item.id)) {
                    return window.localStorage.getItem('beginTime' + item.id)
                }
            } else {
                if (window.localStorage.getItem('beginTime' + item.id)) {
                    window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + item.id).slice(10))
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + item.id).slice(10)
                } else {
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 08:00:00`
                }
            }
        }
    )
    const [endTime, setEndTime] = useState(
        () => {
            if (type === 'one') {
                if (window.localStorage.getItem('endTime' + item.id)) {
                    return window.localStorage.getItem('endTime' + item.id)
                }
            } else {
                if (window.localStorage.getItem('endTime' + item.id)) {
                    window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + item.id).slice(10))
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + item.id).slice(10)
                } else {
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 17:30:00`
                }
            }
        }
    )
    const [text, setText] = useState(
        () => {
            if (window.localStorage.getItem('timeText' + item.id)) {
                return window.localStorage.getItem('timeText' + item.id)
            } else {
                return '今日工时'
            }
        }
    )
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputType, setInputType] = useState(type)
    const [inputTimeText, setInputTimeText] = useState(text)
    const [inputBeginTime, setInputBeginTime] = useState(beginTime)
    const [inputEndTime, setInputEndTime] = useState(endTime)
    const [nowTime, setNowTime] = useState(new Date().getTime())
    const [today, setToday] = useState(new Date().getDate())

    const timeProcessDiv = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        height: '100%',
        position: 'relative',
    }

    const progressDescribe = {
        position: 'absolute',
        maxWidth: '80%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    }

    const getNowTime = () => {
        const nowTime2 = new Date().getTime();
        setNowTime(nowTime2)
        const today2 = new Date().getDate();
        setToday(today2)
    }

    useEffect(() => {
        getNowTime()
        setInputBeginTime(
            () => {
                if (type === 'one') {
                    if (window.localStorage.getItem('beginTime' + item.id)) {
                        return window.localStorage.getItem('beginTime' + item.id)
                    }
                } else {
                    if (window.localStorage.getItem('beginTime' + item.id)) {
                        window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + item.id).slice(10))
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + item.id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 08:00:00`
                    }
                }
            }
        )
        setInputEndTime(
            () => {
                if (type === 'one') {
                    if (window.localStorage.getItem('endTime' + item.id)) {
                        return window.localStorage.getItem('endTime' + item.id)
                    }
                } else {
                    if (window.localStorage.getItem('endTime' + item.id)) {
                        window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + item.id).slice(10))
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + item.id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 17:30:00`
                    }
                }
            }
        )
        setInputTimeText(
            () => {
                if (window.localStorage.getItem('timeText' + item.id)) {
                    return window.localStorage.getItem('timeText' + item.id)
                } else {
                    return '今日工时'
                }
            }
        )
        setInputType(
            () => {
                if (window.localStorage.getItem('timeType' + item.id)) {
                    return window.localStorage.getItem('timeType' + item.id)
                } else {
                    return 'day'
                }
            }
        )
        if (inputType === 'one') {
            setText(inputTimeText)
            setBeginTime(inputBeginTime)
            setEndTime(inputEndTime)
            setType(inputType)
        } else {
            setBeginTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputBeginTime.slice(10))
            setEndTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputEndTime.slice(10))
            setType(inputType)
            setText(inputTimeText)
        }
        var now = setInterval(function () { getNowTime() }, 1000);//每1s刷新一次时间进度条
        return () => {
            clearInterval(now);
        }
        // eslint-disable-next-line
    }, [isModalOpen, today])

    const showSettingsModal = () => {
        setIsModalOpen(true);
    };

    const cancelSettingsModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        setInputType(value)
    };

    // eslint-disable-next-line
    const dateChange = ([], [s1, s2]) => {
        setInputBeginTime(s1)
        setInputEndTime(s2)
    };

    const saveTimeProgress = () => {
        if (inputTimeText) {
            if (inputType === 'one') {
                setText(inputTimeText)
                setBeginTime(inputBeginTime)
                setEndTime(inputEndTime)
                setType(inputType)
                window.localStorage.setItem('beginTime' + item.id, inputBeginTime)
                window.localStorage.setItem('endTime' + item.id, inputEndTime)
                window.localStorage.setItem('timeText' + item.id, inputTimeText)
                window.localStorage.setItem('timeType' + item.id, inputType)
            } else {
                setBeginTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputBeginTime.slice(10))
                setEndTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputEndTime.slice(10))
                setType(inputType)
                setText(inputTimeText)
                window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputBeginTime.slice(10))
                window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputEndTime.slice(10))
                window.localStorage.setItem('timeText' + item.id, inputTimeText)
                window.localStorage.setItem('timeType' + item.id, inputType)
            }
            setIsModalOpen(false)
        } else {
            message.error('时间进度条的文字说明未填写')
        }
    }

    const percent = ((nowTime - dayjs(beginTime).valueOf()) / (dayjs(endTime).valueOf() - dayjs(beginTime).valueOf()) * 100).toFixed(2)

    const showSettings = () => {
        if (edit === '') {
            return (
                <>
                    <DeleteCard
                        linkList={linkList}
                        id={id}
                        item={item}
                        setLinkList={setLinkList}
                    />
                    <SettingTwoTone
                        className="edit-button-style"
                        onClick={showSettingsModal}
                    />
                    <Modal
                        open={isModalOpen}
                        onOk={saveTimeProgress}
                        onCancel={cancelSettingsModal}
                        destroyOnClose
                        title='时间进度条设置'
                        okText='确定'
                        cancelText='取消'
                    >
                        <Row className="input-div">
                            <Col flex='72px'>
                                时间片段：
                            </Col>
                            <Col flex='auto' id="datePicker">
                                <RangePicker
                                    showTime
                                    locale={locale}
                                    inputReadOnly
                                    getPopupContainer={() => document.getElementById('datePicker')}
                                    format={dateFormat}
                                    defaultValue={[dayjs(inputBeginTime, dateFormat), dayjs(inputEndTime, dateFormat)]}
                                    onChange={dateChange}
                                />
                            </Col>
                        </Row>
                        <Row className="input-div">
                            <Col flex='72px'>
                                重复次数：
                            </Col>
                            <Col flex='auto'>
                                <Select
                                    defaultValue={inputType}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: 'day',
                                            label: '每日循环',
                                        },
                                        {
                                            value: 'one',
                                            label: '仅执行一次',
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row className="input-div">
                            <Col flex='72px'>
                                时间说明：
                            </Col>
                            <Col flex='auto'>
                                <Input
                                    placeholder="用于展示该时间进度条的名称"
                                    onChange={(e) => setInputTimeText(e.target.value)}
                                    value={inputTimeText}
                                />
                            </Col>
                        </Row>
                    </Modal>
                </>
            )
        } else {
            return
        }
    }

    const showPercent = () => {
        if (percent <= 100 && percent >= 0) {
            return (
                <>
                    <span style={{ fontSize: '24px' }}>{percent}%</span>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{text}</span>
                </>
            )
        } else if (percent > 100) {
            return (
                <>
                    <CheckOutlined className='time-Process-100' />
                    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>{text}<br />已完成</span>
                </>
            )
        } else if (percent < 0) {
            return (
                <>
                    <HourglassOutlined className='time-Process-0' />
                    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>{text}<br />未开始</span>
                </>
            )
        }
    }

    const showWidth = () => {
        if (cardStyle === 'defaultCard') {
            if (widthNum > 2 * heightNum) {
                return 2 * 0.95 * heightNum
            } else {
                return 0.9 * widthNum
            }
        } else {
            if (widthNum > heightNum) {
                return 2 * 0.95 * heightNum
            } else {
                return 2 * 0.95 * widthNum
            }
        }
    }

    const showLabel = () => {
        if (cardStyle === 'phoneCard') {
            return (
                <Paragraph
                    style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
                    ellipsis={
                        ellipsis
                            ? {
                                rows: 1,
                                tooltip: { title: item.label, color: 'blue' }
                            } : false
                    }
                >
                    {item.label}
                </Paragraph>
            )
        }
    }

    return (
        <>
            <div style={timeProcessDiv}>
                <Progress
                    type="circle"
                    percent={percent}
                    format={() => ''}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    width={showWidth()}
                />
                <div style={progressDescribe}>
                    {showPercent()}
                </div>
                {showSettings()}
            </div>
            {showLabel()}
        </>
    )
}

export default TimeProgress;