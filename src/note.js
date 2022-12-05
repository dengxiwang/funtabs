import { StyleProvider } from '@ant-design/cssinjs';
import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import './funtabs.css';
//定义便签小组件
const Note = (props) => {
    const { heightNum, id } = props;

    return (
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
                <TextArea
                    bordered={false}
                    autoSize={{
                        minRows: 5,
                    }}
                    placeholder="在此便捷输入您要记录的文本信息"
                    allowClear
                    defaultValue={localStorage.getItem(`note${id}`)}
                    onBlur={
                        (e) => {
                            localStorage.setItem(`note${id}`, e.target.value)
                        }
                    }
                />
            </Card>
        </StyleProvider>
    )
}

export default Note;