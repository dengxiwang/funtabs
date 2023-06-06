import { Input, Space } from 'antd';
import React, { useState } from 'react';
import { get } from '../common/fetch';
import showBoxShadow from '../common/showBoxShadow';
import showRadius from '../common/showRadius';
import DeleteCard from '../module/deleteCard';
import ShowLabel from '../module/showLabel';

export default function Translate(props) {
    const { TextArea } = Input;
    const {
        id,
        edit,
        num,
        linkList,
        setLinkList,
        item,
        cardStyle,
        radius,
        setDisabled
    } = props;
    const [content, setContent] = useState('')
    const [result, setResult] = useState('')

    function getInput(e) {
        const content = e.target.value;
        setContent(content.trim().replace(/[\r\n]+$/, ''))
        if (content === '') {
            setResult('')
        }
    }

    function getResult() {
        if (setDisabled) {
            setDisabled(false)
        }
        if (content !== '') {
            get(`http://api.vvhan.com/api/fy?text=${content}`).then(
                res => {
                    setResult(`翻译结果：${res.fanyi}`)
                }
            )
        }
    }

    const showSettings = () => {
        if (edit === '') {
            return (
                <>
                    <DeleteCard
                        id={id}
                        item={item}
                        num={num}
                        linkList={linkList}
                        setLinkList={setLinkList}
                    />
                </>
            )
        }
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: showRadius(radius),
                boxShadow: showBoxShadow(),
                backgroundColor: '#fff',
                cursor: 'pointer',
            }}>
            <div
                style={{
                    padding: '14px',
                    height: 'calc(100% - 28px)',
                }}>
                {/* 标题展示区 */}
                <Space style={{ marginBottom: '10px' }}>
                    <img
                        src='/images/translatePre.svg'
                        style={{
                            height: '20px',
                            marginTop: '2px',
                            marginLeft: '10px'
                        }}
                        alt=''
                    />
                    <p style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#1490ff',
                    }}>快捷翻译器</p>
                </Space>
                <div
                    style={{
                        height: 'calc(100% - 42px)',
                        overflow: 'hidden',
                        borderRadius: '6px',
                        overflowY: 'scroll',
                    }}
                >
                    <TextArea
                        placeholder='在此输入您要翻译的内容'
                        onChange={getInput}
                        value={content}
                        allowClear
                        onBlur={getResult}
                        autoSize={{
                            minRows: 2.5,
                            maxRows: 2.5
                        }}
                        onFocus={() => {
                            if (setDisabled) {
                                setDisabled(false)
                            }
                        }}
                        bordered={false}
                        onPressEnter={getResult}
                    />
                    <p style={{ margin: '10px 10px 0px 10px', fontWeight: 'bold' }}>{result}</p>
                </div>
            </div>
            {showSettings()}
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
                edit={edit}
            />
        </div>
    )
}
