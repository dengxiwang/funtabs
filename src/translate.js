import { Input, Space } from 'antd';
import React, { useState } from 'react';
import DeleteCard from './deleteCard';
import { get } from './fetch';
import ShowLabel from './showLabel';

export default function Translate(props) {
    const { TextArea } = Input;
    const { id, edit, linkList, setLinkList, item, cardStyle } = props;
    const [content, setContent] = useState('')
    const [result, setResult] = useState('')

    function getInput(e) {
        setContent(e.target.value)
        if (e.target.value === '') {
            setResult('')
        }
    }

    async function getResult() {
        if (content !== '') {
            await get(`https://bird.ioliu.cn/v1?url=http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${content}`).then(
                res => {
                    const resp = JSON.parse(res);
                    setResult(`翻译结果：${resp.translateResult[0][0].tgt}`)
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
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}>
            <div
                style={{
                    padding: '14px',
                    height: 'calc(100% - 28px)',
                }}>
                {/* 标题展示区 */}
                <Space style={{ marginBottom: '10px' }}>
                    <img
                        src='/images/translate.svg'
                        style={{
                            height: '24px',
                            marginTop: '2px',
                            marginLeft: '6px'
                        }}
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
                        bordered={false}
                    />
                    <p style={{ margin: '10px 10px 0px 10px', fontWeight: 'bold' }}>{result}</p>
                </div>
            </div>
            {showSettings()}
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
            />
        </div>
    )
}
