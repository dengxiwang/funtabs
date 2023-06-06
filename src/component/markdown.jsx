import { Modal } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import { CloseCircleFilled } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import 'react-markdown-editor-lite/lib/index.css';
import cursorControl from '../common/cursorControl';
import showBoxShadow from '../common/showBoxShadow';
import DeleteCard from '../module/deleteCard';
import ShowLabel from '../module/showLabel';

export default function Markdown(props) {
    const [open, setOpen] = useState(false)
    const {
        id,
        edit,
        num,
        linkList,
        setLinkList,
        cardStyle,
        item,
        radius,
        click,
        setDisabled,
        fontColor
    } = props;
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleImage(file) {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.onload = data => {
                resolve(data.target.result)
            }
            reader.readAsDataURL(file)
        })
    }

    function cancleModal() {
        setOpen(false)
        if (setDisabled) {
            setDisabled(false)
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
                        cardStyle={cardStyle}
                    />
                </>
            )
        }
    }

    function howToShow() {
        if (cardStyle === 'onlyText') {
            return (
                <div
                    onClick={() => {
                        if (edit === 'none' && click === 0) {
                            if (setDisabled) {
                                setDisabled(true)
                            }
                            setOpen(true)
                        }
                    }}
                    rel="noreferrer"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        width: `calc(100%)`,
                        height: `calc(100%)`,
                        cursor: cursorControl(edit),
                        boxShadow: showBoxShadow()
                    }}>
                    <Paragraph
                        className='onlyTextStyle'
                        ellipsis={{
                            rows: 1,
                        }}
                        style={{
                            fontWeight: 'bold',
                            color: fontColor,
                            marginBottom: '0px',
                        }}
                    >
                        MarkDown编辑器
                    </Paragraph>
                </div>
            )
        } else {
            return (
                <img
                    src='/images/markdown.svg'
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: `${radius}px`,
                        boxShadow: showBoxShadow(),
                        zIndex: 1,
                        backgroundColor: '#fff',
                        cursor: cursorControl(edit),
                    }}
                    onClick={
                        () => {
                            if (edit === 'none' && click === 0) {
                                if (setDisabled) {
                                    setDisabled(true)
                                }
                                setOpen(true)
                            }
                        }
                    }
                    alt=''
                />
            )
        }
    }

    return (
        <>
            {howToShow()}
            <Modal
                open={open}
                onCancel={cancleModal}
                footer={null}
                width='100%'
                centered
                title='MarkDown编辑器'
                destroyOnClose
                style={{
                    maxWidth: '1200px',
                    padding: '12px',
                }}
                maskClosable={false}
                closeIcon={
                    <CloseCircleFilled
                        style={{
                            color: '#f4433c'
                        }}
                    />
                }
            >
                <MdEditor
                    style={{ height: 'calc(100vh - 100px)', maxHeight: '800px' }}
                    renderHTML={
                        text => mdParser.render(text)}
                    onImageUpload={handleImage}
                />
            </Modal>
            {showSettings()}
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
                edit={edit}
            />
        </>
    )
}
