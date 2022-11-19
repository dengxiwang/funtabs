import { Button, message, Switch } from "antd";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import data from "./data";
import DefaultStyle from "./defaultStyle";
import './funtabs.css';
import OnlyIconStyle from "./onlyIconStyle";
import Settings from "./settings";

const LinkList = () => {

    const localData = JSON.parse(window.localStorage.getItem('funtabs'))
    const [linkList, setLinkList] = useState(() => { if (localData) { return localData.content } else { return data.content } })
    const [model, setModel] = useState(() => { if (localData) { return localData.model } else { return data.model } });//简约和默认
    const [defaultAllSize, setDefaultAllSize] = useState(() => { if (localData) { return localData.defaultAllSize } else { return data.defaultAllSize } });
    const [widthNum, setWidthNum] = useState(() => { if (localData) { return localData.widthNum } else { return data.widthNum } });
    const [heightNum, setHeightNum] = useState(() => { if (localData) { return localData.heightNum } else { return data.heightNum } });
    const [edit, setEdit] = useState('none')
    const [drag, setDrag] = useState(true)
    const [editText, setEditText] = useState('编辑')
    const [color, setColor] = useState('')
    const [dropFilter, setDropFilter] = useState('')
    const [radius, setRadius] = useState(() => { if (localData) { return localData.radius } else { return data.radius } })
    const [cardStyle, setCardStyle] = useState(() => { if (localData) { return localData.cardStyle } else { return data.cardStyle } })
    const [gap, setGap] = useState(() => { if (localData) { return localData.gap } else { return data.gap } })

    useEffect(() => {
    }, [])

    //网格布局样式信息
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(' + widthNum + 'px, 1fr))',
        columnGap: gap + 'px',
        rowGap: gap + 'px',
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
            //存储到本地
            window.localStorage.setItem('funtabs', JSON.stringify({
                'model': model,
                'defaultAllSize': defaultAllSize,
                'widthNum': widthNum,
                'heightNum': heightNum,
                'radius': radius,
                'gap': gap,
                'cardStyle': cardStyle,
                'content': linkList,
            }))
        }
    }

    const howToShow = () => {
        if (cardStyle === 'defaultCard') {
            return (
                <ReactSortable id="sortable" key='sortable' list={linkList} setList={(e) => { setLinkList(e) }} tag='div' style={gridStyle} disabled={drag}>
                    {linkList.map((item, index) => {
                        return (
                            < DefaultStyle
                                key={item.link}
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
            )
        } else if (cardStyle === 'onlyIconCard') {
            return (
                <ReactSortable id="sortable" key='sortable' list={linkList} setList={(e) => { setLinkList(e) }} tag='div' style={gridStyle} disabled={drag}>
                    {linkList.map((item, index) => {
                        return (
                            < OnlyIconStyle
                                key={item.link}
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
            )
        }
    }

    return (
        <>
            <div className="settings">
                <Button type="text" style={{ color: '#ffffff', fontWeight: 'bold', display: model }} onClick={editFunction}>{editText}</Button>
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
                    editFunction={editFunction}
                    radius={radius}
                    setRadius={setRadius}
                    cardStyle={cardStyle}
                    setCardStyle={setCardStyle}
                    gap={gap}
                    setGap={setGap}
                />
                <div style={{ width: '100%', display: model }}>
                    {howToShow()}
                </div>
            </div>
        </>
    )
}

export default LinkList;