import { StyleProvider } from '@ant-design/cssinjs';
import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import DeleteCard from './deleteCard';
import './funtabs.css';
//定义便签小组件
const Note = (props) => {
    const { heightNum, id, item, linkList, setLinkList, cardStyle, edit } = props;
    const [ellipsis] = useState('ture');

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
                </>
            )
        } else {
            return
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
            <StyleProvider hashPriority="high">
                <Card
                    title='便捷记事本'
                    bordered={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                    }}
                    bodyStyle={{
                        height: 2.4 * heightNum,
                        overflowY: 'scroll',
                        padding: '12px'
                    }}
                    headStyle={{
                        textAlign: 'center',
                        background: '#ffa500',
                        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffa500', endColorstr='#f9e443',GradientType=0 )",
                    }}
                >
                    {showSettings()}
                    <TextArea
                        bordered={false}
                        autoSize={{
                            minRows: 5,
                        }}
                        placeholder="在此便捷输入您要记录的文本信息"
                        allowClear
                        defaultValue={localStorage.getItem(`note${item.id}`)}
                        onBlur={
                            (e) => {
                                localStorage.setItem(`note${item.id}`, e.target.value)
                            }
                        }
                    />
                </Card>
            </StyleProvider>
            {showLabel()}
        </>
    )
}

export default Note;