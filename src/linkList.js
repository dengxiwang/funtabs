import { Button, message, Switch } from "antd";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import data from "./data";
import DefaultStyle from "./defaultStyle";
import './funtab.css';
import Settings from "./settings";

const LinkList = () => {
    const [linkList, setLinkList] = useState(data.content)
    const [model, setModel] = useState(data.model);
    const [defaultAllSize, setDefaultAllSize] = useState(data.defaultAllSize);
    const [widthNum, setWidthNum] = useState(data.widthNum);
    const [heightNum, setHeightNum] = useState(data.heightNum);
    const [edit, setEdit] = useState('none')
    const [drag, setDrag] = useState(true)
    const [editText, setEditText] = useState('编辑')
    const [color, setColor] = useState('')
    const [dropFilter, setDropFilter] = useState('')
    const [radius, setRadius] = useState(data.radius)

    //网格布局样式信息
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(' + widthNum + 'px, 1fr))',
        columnGap: '12px',
        rowGap: '12px',
        gridAutoFlow: 'dense',
        gridAutoRows: heightNum + 'px',
    }

    function editFunction() {
        if (edit === 'none') {
            setEdit('')
            setDrag(false)
            setEditText('完成')
            message.warning('您正处于编辑模式,可拖动排列卡片～')
            setColor('rgb(255 255 255 / 20%)')
            setDropFilter('blur(3px)')
        } else {
            setEdit('none')
            setDrag(true)
            setEditText('编辑')
            message.success('保存成功')
            setColor('')
            setDropFilter('')
        }
    }

    return (
        <>
            <div className="settings">
                <Button type="text" style={{ color: '#ffffff', fontWeight: 'bold' }} onClick={editFunction}>{editText}</Button>
                <Switch
                    style={{ margin: '0px 15px' }}
                    checkedChildren="简约"
                    unCheckedChildren="默认"
                    defaultChecked={false}
                    disabled={!drag}
                    onChange={
                        () => {
                            if (model === '') {
                                setModel('none')
                            } else {
                                setModel('')
                            }
                        }
                    }
                />
            </div>
            <div className="gridArea" style={{ backgroundColor: color, backdropFilter: dropFilter }}>
                <Settings
                    model={model}
                    defaultAllSize={defaultAllSize}
                    setDefaultAllSize={setDefaultAllSize}
                    widthNum={widthNum}
                    setWidthNum={setWidthNum}
                    heightNum={heightNum}
                    setHeightNum={setHeightNum}
                    linkList={linkList}
                    setLinkList={setLinkList}
                    edit={edit}
                    radius={radius}
                    setRadius={setRadius}
                />
                <div style={{ width: '100%', display: model }}>
                    <ReactSortable key='sortable' list={linkList} setList={(e) => { setLinkList(e) }} tag='div' style={gridStyle} disabled={drag}>
                        {linkList.map((item, index) => {
                            return (
                                < DefaultStyle
                                    key={index}
                                    id={index}
                                    edit={edit}
                                    item={item}
                                    heightNum={heightNum}
                                    linkList={linkList}
                                    setLinkList={setLinkList}
                                    radius={radius}
                                />
                            )
                        })}
                    </ReactSortable>
                </div>
            </div>
        </>
    )
}

export default LinkList;