import { StyleProvider } from '@ant-design/cssinjs';
import { TagFilled } from '@ant-design/icons';
import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import DeleteCard from './deleteCard';
import './funtabs.css';
import ShowLabel from './showLabel';
//定义便签小组件
const Note = (props) => {
    const { heightNum, id, item, linkList, setLinkList, cardStyle, edit, changeGridWidth } = props;

    const showSettings = () => {
        if (edit === '') {
            return (
                <>
                    <DeleteCard
                        linkList={linkList}
                        id={id}
                        item={item}
                        setLinkList={setLinkList}
                        changeGridWidth={changeGridWidth}
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TagFilled style={{ marginRight: '8px' }} />
                            <p>便捷记事本</p>
                        </div>
                    }
                    bordered={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                    }}
                    bodyStyle={{
                        height: 2.5 * heightNum,
                        overflowY: 'scroll',
                        padding: '12px'
                    }}
                    headStyle={{
                        textAlign: 'center',
                        background: '#ffa500',
                        color: '#ffffff',
                        minHeight: '50px',
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
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
            />
        </>
    )
}

export default Note;