import { CheckOutlined, HourglassOutlined, SettingTwoTone } from "@ant-design/icons";
import { Col, DatePicker, Input, Modal, Progress, Row, Select, message } from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useEffect, useRef, useState } from "react";
import cursorControl from "../common/cursorControl";
import '../common/funtabs.css';
import showBoxShadow from "../common/showBoxShadow";
import showRadius from "../common/showRadius";
import DeleteCard from "../module/deleteCard";
import ShowLabel from "../module/showLabel";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

const TimeProgress = (props) => {
    const {
        edit,
        id,
        widthNum,
        heightNum,
        num,
        gap,
        cardStyle,
        linkList,
        item,
        setLinkList,
        radius,
        fontColor
    } = props;
    const date = new Date()
    const timmer = useRef()
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
                    window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('beginTime' + item.id).slice(10))
                    return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('beginTime' + item.id).slice(10)
                } else {
                    return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)} 08:00:00`
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
                    window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('endTime' + item.id).slice(10))
                    return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('endTime' + item.id).slice(10)
                } else {
                    return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)} 17:30:00`
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
    const [today, setToday] = useState(("0" + (new Date().getDate())).slice(-2))

    const timeProcessDiv = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: showRadius(radius),
        boxShadow: showBoxShadow(),
        height: '100%',
        position: 'relative',
        cursor: cursorControl(edit),
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
        setToday(("0" + today2).slice(-2))
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
                        window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('beginTime' + item.id).slice(10))
                        return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('beginTime' + item.id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)} 08:00:00`
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
                        window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('endTime' + item.id).slice(10))
                        return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + window.localStorage.getItem('endTime' + item.id).slice(10)
                    } else {
                        return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)} 17:30:00`
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
            setBeginTime(`${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputBeginTime.slice(10))
            setEndTime(`${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputEndTime.slice(10))
            setType(inputType)
            setText(inputTimeText)
        }
        timmer.current = setInterval(() => {
            getNowTime()
        }, 1000);//每30s刷新一次时间进度条
        return () => {
            window.clearInterval(timmer.current);
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
                setBeginTime(`${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputBeginTime.slice(10))
                setEndTime(`${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputEndTime.slice(10))
                setType(inputType)
                setText(inputTimeText)
                window.localStorage.setItem('beginTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputBeginTime.slice(10))
                window.localStorage.setItem('endTime' + item.id, `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}` + inputEndTime.slice(10))
                window.localStorage.setItem('timeText' + item.id, inputTimeText)
                window.localStorage.setItem('timeType' + item.id, inputType)
            }
            setIsModalOpen(false)
        } else {
            message.error('时间进度条的文字说明未填写')
        }
    }

    const percent = ((nowTime - dayjs(beginTime).valueOf()) / (dayjs(endTime).valueOf() - dayjs(beginTime).valueOf()) * 100).toFixed(2)

    function showSettingsButton() {
        if (cardStyle === 'onlyText') {
            return (
                <SettingTwoTone
                    className="edit-button-style2"
                    onClick={showSettingsModal}
                />
            )
        } else {
            return (
                <SettingTwoTone
                    className="edit-button-style"
                    onClick={showSettingsModal}
                />
            )
        }
    }

    const showSettings = () => {
        if (edit === '') {
            return (
                <>
                    <DeleteCard
                        linkList={linkList}
                        id={id}
                        item={item}
                        num={num}
                        setLinkList={setLinkList}
                        cardStyle={cardStyle}
                    />
                    {showSettingsButton()}
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

    const showPercent2 = () => {
        if (percent <= 100 && percent >= 0) {
            return (
                <>
                    <span style={{ fontWeight: 'bold' }}>{text}{percent}%</span>
                </>
            )
        } else if (percent > 100) {
            return (
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        <CheckOutlined />{text}已完成
                    </span>
                </>
            )
        } else if (percent < 0) {
            return (
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        <HourglassOutlined />{text}未开始
                    </span>
                </>
            )
        }
    }

    const showWidth = () => {
        if (cardStyle === 'defaultCard') {
            if (parseInt(widthNum) > (2 * parseInt(heightNum) + parseInt(gap))) {
                return 2 * heightNum + parseInt(gap) - 20
            } else {
                return widthNum - 20
            }
        } else if (cardStyle === 'onlyIconCard') {
            if (parseInt(widthNum) > parseInt(heightNum)) {
                return 2 * parseInt(heightNum) + parseInt(gap) - 24
            } else {
                return 2 * parseInt(widthNum) + parseInt(gap) - 24
            }
        } else if (cardStyle === 'phoneCard') {
            if (parseInt(widthNum) > parseInt(heightNum)) {
                return 2 * parseInt(heightNum) + parseInt(gap) - 24
            } else {
                return 2 * parseInt(widthNum) + parseInt(gap) - 24
            }
        }
    }

    function howToShow() {
        if (cardStyle === 'onlyText') {
            return (
                <div style={{
                    color: fontColor,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    boxShadow: showBoxShadow(),
                    position: 'relative',
                    cursor: cursorControl(edit),
                }}>
                    {showPercent2()}
                    {showSettings()}
                </div>
            )
        } else {
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
                        size={showWidth()}
                    />
                    <div style={progressDescribe}>
                        {showPercent()}
                    </div>
                    {showSettings()}
                </div>
            )
        }
    }

    return (
        <>
            {howToShow()}
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
                edit={edit}
            />
        </>
    )
}

export default TimeProgress;