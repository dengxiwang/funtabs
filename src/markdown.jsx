import { CloseCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import DeleteCard from './deleteCard';
import ShowLabel from './showLabel';

export default function Markdown(props) {
    const [open, setOpen] = useState(false)
    const { id, edit, linkList, setLinkList, cardStyle, item, changeGridWidth } = props;
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
                        changeGridWidth={changeGridWidth}
                    />
                </>
            )
        }
    }

    return (
        <div style={{
            borderRadius: '10px',
            zIndex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
        }}
        >
            <img
                src='/images/markdown.svg'
                style={{
                    width: '100%',
                    height: '100%',
                }}
                onClick={
                    () => {
                        if (edit === 'none') {
                            setOpen(true)
                        }
                    }
                }
                alt=''
            />
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
            />
        </div>
    )
}
