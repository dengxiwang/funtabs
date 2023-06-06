import { StyleProvider } from '@ant-design/cssinjs';
import { TagFilled } from '@ant-design/icons';
import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from 'react';
import cursorControl from '../common/cursorControl';
import '../common/funtabs.css';
import pointerEventsControl from '../common/pointerEventsControl';
import showBoxShadow from '../common/showBoxShadow';
import showRadius from '../common/showRadius';
import DeleteCard from '../module/deleteCard';
import ShowLabel from '../module/showLabel';

//定义便签小组件
const Note = (props) => {
    const {
        heightNum,
        num,
        id,
        item,
        linkList,
        setLinkList,
        cardStyle,
        edit,
        radius,
        setDisabled
    } = props;
    const [noteValue, setNoteValue] = useState(localStorage.getItem(`note${item.id}`))

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
                    />
                </>
            )
        } else {
            return
        }
    }

    return (
        <>
            <StyleProvider hashPriority="high">
                <Card
                    title={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TagFilled style={{ marginRight: '8px' }} />
                            <p>便捷记事本</p>
                        </div>
                    }
                    bordered={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: showRadius(radius),
                        cursor: cursorControl(edit),
                        boxShadow: showBoxShadow(),
                    }}
                    bodyStyle={{
                        height: 2.5 * heightNum,
                        overflowY: 'scroll',
                        padding: '12px',
                    }}
                    headStyle={{
                        textAlign: 'center',
                        background: '#ffa500',
                        color: '#ffffff',
                        minHeight: '50px',
                        borderTopLeftRadius: showRadius(radius),
                        borderTopRightRadius: showRadius(radius),
                        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffa500', endColorstr='#f9e443',GradientType=0 )",
                    }}
                >
                    {showSettings()}
                    <TextArea
                        bordered={false}
                        autoSize={{
                            minRows: 5,
                        }}
                        disabled={
                            edit === 'none' ? false : true
                        }
                        style={{
                            pointerEvents: pointerEventsControl(edit)
                        }}
                        onFocus={() => {
                            if (setDisabled) {
                                setDisabled(true)
                            }
                        }}
                        onBlur={() => {
                            if (setDisabled) {
                                setDisabled(false)
                            }
                        }}
                        placeholder="在此便捷输入您要记录的文本信息"
                        allowClear
                        value={noteValue}
                        onChange={
                            (e) => {
                                if (setDisabled) {
                                    setDisabled(false)
                                }
                                localStorage.setItem(`note${item.id}`, e.target.value)
                                setNoteValue(e.target.value)
                            }
                        }
                    />
                </Card>
            </StyleProvider>
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
                edit={edit}
            />
        </>
    )
}

export default Note;