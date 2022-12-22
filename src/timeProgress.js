import { CheckOutlined, HourglassOutlined, SettingTwoTone } from "@ant-design/icons";
import { Col, DatePicker, Input, message, Modal, Progress, Row, Select } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import './funtabs.css';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

const TimeProgress = (props) => {
    const { edit, id, widthNum, heightNum, cardStyle } = props;
    const date = new Date()
    const [type, setType] = useState(
        () => {
            if (window.localStorage.getItem('timeType' + id)) {
                return window.localStorage.getItem('timeType' + id)
            } else {
                return 'day'
            }
        }
    )
    const [beginTime, setBeginTime] = useState(
        () => {
            if (type === 'one') {
                if (window.localStorage.getItem('beginTime' + id)) {
                    return window.localStorage.getItem('beginTime' + id)
                }
            } else {
                if (window.localStorage.getItem('beginTime' + id)) {
                    window.localStorage.setItem('beginTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + id).slice(10))
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + id).slice(10)
                } else {
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 08:00:00`
                }
            }
        }
    )
    const [endTime, setEndTime] = useState(
        () => {
            if (type === 'one') {
                if (window.localStorage.getItem('endTime' + id)) {
                    return window.localStorage.getItem('endTime' + id)
                }
            } else {
                if (window.localStorage.getItem('endTime' + id)) {
                    window.localStorage.setItem('endTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + id).slice(10))
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + id).slice(10)
                } else {
                    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 17:30:00`
                }
            }
        }
    )
    const [text, setText] = useState(
        () => {
            if (window.localStorage.getItem('timeText' + id)) {
                return window.localStorage.getItem('timeText' + id)
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
    }

    useEffect(() => {
        getNowTime()
        setInputBeginTime(
            () => {
                if (type === 'one') {
                    if (window.localStorage.getItem('beginTime' + id)) {
                        return window.localStorage.getItem('beginTime' + id)
                    }
                } else {
                    if (window.localStorage.getItem('beginTime' + id)) {
                        window.localStorage.setItem('beginTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + id).slice(10))
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('beginTime' + id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 08:00:00`
                    }
                }
            }
        )
        setInputEndTime(
            () => {
                if (type === 'one') {
                    if (window.localStorage.getItem('endTime' + id)) {
                        return window.localStorage.getItem('endTime' + id)
                    }
                } else {
                    if (window.localStorage.getItem('endTime' + id)) {
                        window.localStorage.setItem('endTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + id).slice(10))
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + window.localStorage.getItem('endTime' + id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 17:30:00`
                    }
                }
            }
        )
        setInputTimeText(
            () => {
                if (window.localStorage.getItem('timeText' + id)) {
                    return window.localStorage.getItem('timeText' + id)
                } else {
                    return '今日工时'
                }
            }
        )
        setInputType(
            () => {
                if (window.localStorage.getItem('timeType' + id)) {
                    return window.localStorage.getItem('timeType' + id)
                } else {
                    return 'day'
                }
            }
        )
        var now = setInterval(function () { getNowTime() }, 60000);//每1分钟刷新一次时间进度条
        return () => {
            clearInterval(now);
        }
        // eslint-disable-next-line
    }, [isModalOpen])

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
                window.localStorage.setItem('beginTime' + id, inputBeginTime)
                window.localStorage.setItem('endTime' + id, inputEndTime)
                window.localStorage.setItem('timeText' + id, inputTimeText)
                window.localStorage.setItem('timeType' + id, inputType)
            } else {
                setBeginTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputBeginTime.slice(10))
                setEndTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputEndTime.slice(10))
                setType(inputType)
                setText(inputTimeText)
                window.localStorage.setItem('beginTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputBeginTime.slice(10))
                window.localStorage.setItem('endTime' + id, `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + inputEndTime.slice(10))
                window.localStorage.setItem('timeText' + id, inputTimeText)
                window.localStorage.setItem('timeType' + id, inputType)
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
                    <span style={{ fontSize: '10px' }}>{text}</span>
                </>
            )
        } else if (percent > 100) {
            return (
                <>
                    <CheckOutlined className='time-Process-100' />
                    <span style={{ fontSize: '10px', marginTop: '4px' }}>{text}<br />已完成</span>
                </>
            )
        } else if (percent < 0) {
            return (
                <>
                    <HourglassOutlined className='time-Process-0' />
                    <span style={{ fontSize: '10px', marginTop: '4px' }}>{text}<br />未开始</span>
                </>
            )
        }
    }

    const showWidth = () => {
        if (cardStyle === 'defaultStyle') {
            if (widthNum > 2 * heightNum) {
                return 2 * 0.95 * heightNum
            } else {
                return 0.8 * widthNum
            }
        } else if (cardStyle === 'onlyIconStyle') {
            if (widthNum > heightNum) {
                return 2 * 0.95 * heightNum
            } else {
                return 2 * 0.95 * widthNum
            }
        }
    }

    return (
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
    )
}

export default TimeProgress;