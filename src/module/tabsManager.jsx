import { DeleteOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Popconfirm, Row, Space, message } from "antd";
import _ from 'lodash';
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import '../common/funtabs.css';
import { funtabsData } from "./data";

const TabsManager = (props) => {
    const {
        linkList,
        setLinkList,
        setTabsVisibility,
        tabsActiveKey,
        setTabsActiveKey,
        tabs,
        type,
        edit
    } = props;
    const [tabsData, setTabsData] = useState(_.cloneDeep(linkList))
    const [opened, setOpened] = useState(false)
    const [drag, setDrag] = useState(true)

    useEffect(() => {
        window.sessionStorage.setItem('tabs', JSON.stringify(linkList))
        // eslint-disable-next-line
    }, [opened])

    function addTabs() {
        if (tabsData.filter(item => item.label === '').length !== 0) {
            message.error('存在空白分类，创建失败')
        } else {
            const key = Date.parse(new Date()) + Math.floor(Math.random() * 1000)
            const newTabsData = _.cloneDeep(tabsData)
            newTabsData.push({
                label: '', key: key, content: []
            })
            setTabsData(newTabsData)
        }
    }

    //判断标签页是否显示
    function tabsVis() {
        const newTabsData = _.cloneDeep(tabsData)
        let a = newTabsData.length;
        if (a === 1) {
            setTabsVisibility('none')
        } else {
            setTabsVisibility('')
        }
    }

    function deleteTabs(index) {
        const newTabsData = _.cloneDeep(tabsData)
        if (newTabsData.length === 1) {
            message.error('删除失败，至少保留一个分类～')
        } else {
            newTabsData.splice(index, 1)
            setTabsData(newTabsData)
            message.success('删除成功')
        }
    }

    function saveTabs() {
        const newTabsData = _.cloneDeep(tabsData)
        const hasDuplicateLabel = newTabsData.some((item, index) => {
            return newTabsData.findIndex(
                (innerItem, innerIndex) =>
                    innerIndex !== index && item.label === innerItem.label
            ) !== -1;
        });
        if (newTabsData.filter(item => item.label === '').length !== 0) {
            message.error('请填写完整分类名称')
        } else if (hasDuplicateLabel) {
            message.error('分类名称不可重复')
        } else {
            var num;
            for (let i = 0; i < newTabsData.length; i++) {
                if (newTabsData[i].key === tabsActiveKey) {
                    num = i
                }
            }
            try {
                setTabsActiveKey(newTabsData[num].key)
                tabs.current.slickGoTo(num, true)
                window.localStorage.setItem('activeKey', newTabsData[num].key)
            } catch (error) {
                const len = newTabsData.length - 1
                setTabsActiveKey(newTabsData[len].key)
                tabs.current.slickGoTo(newTabsData[len], true)
                window.localStorage.setItem('activeKey', newTabsData[len].key)
            }
            window.sessionStorage.setItem('tabs', JSON.stringify(newTabsData))
            setLinkList(newTabsData)
            if (type === 1 && edit === 'none') {
                var newData;//本地存储数据是newData
                //如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
                const localData = JSON.parse(window.localStorage.getItem('funtabs'))
                if (localData) {
                    newData = localData.newData
                } else {
                    newData = funtabsData
                }
                newData.content = newTabsData;
                //存储到本地
                window.localStorage.setItem('funtabs', JSON.stringify({ newData }))
            }
            setOpened(false)
            tabsVis()
        }
    }

    function showType() {
        if (type === 1) {
            return (
                <p onClick={() => {
                    setTabsData(linkList)
                    setOpened(true)
                }}>分类管理</p>
            )
        } else {
            return (
                <Button
                    type="primary"
                    onClick={
                        () => {
                            setTabsData(linkList)
                            setOpened(true)
                        }}
                >
                    分类管理
                </Button>
            )
        }
    }

    return (
        <>
            {showType()}
            <Modal
                title='分类管理'
                open={opened}
                onCancel={() => {
                    setOpened(false)
                }}
                afterClose={() => {
                    const data = JSON.parse(window.sessionStorage.getItem('tabs'))
                    setLinkList(data)
                }}
                okText='确认'
                cancelText='取消'
                destroyOnClose={true}
                bodyStyle={{
                    maxHeight: '320px',
                    marginTop: '12px',
                    overflow: 'scroll'
                }}
                footer={
                    <Row>
                        <Col>
                            <Button
                                type="primary"
                                onClick={addTabs}
                            >新增</Button>
                        </Col>
                        <Col flex='auto' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Space>
                                <Button onClick={() => { setOpened(false) }}>取消</Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        saveTabs()
                                    }}
                                >确认</Button>
                            </Space>
                        </Col>
                    </Row>
                }
            >
                <ReactSortable
                    id="tabsManager"
                    key='tabsManager'
                    list={tabsData}
                    setList={
                        (e) => {
                            setTabsData(e)
                        }}
                    tag='div'
                    disabled={drag}
                    animation={200}
                    style={{
                        marginBottom:'-12px'
                    }}
                    ghostClass='drag-background-class'
                >
                    {tabsData.map((item, index) => {
                        const key = item.key
                        return (
                            <Row key={item.key} style={{ marginBottom: '12px', alignItems: 'center' }}>
                                <Col flex='78px'>
                                    分类名称:
                                </Col>
                                <Col flex='1'>
                                    <Input
                                        defaultValue={item.label}
                                        onChange={(e) => {
                                            tabsData.filter((item) => item.key === key)[0].label = e.target.value.trim()
                                            const newData = [...tabsData]
                                            setTabsData(newData)
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        style={{
                                            cursor: 'move'
                                        }}
                                        onMouseEnter={() => { setDrag(false) }}
                                        onMouseLeave={() => { setDrag(true) }}
                                    >
                                        <SwapOutlined rotate={90} />
                                    </Button>
                                    <Popconfirm
                                        title="删除后，该分类下的卡片布局也将随之删除！您确定吗？"
                                        onConfirm={() => { deleteTabs(index) }}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button danger ><DeleteOutlined /></Button>
                                    </Popconfirm>
                                </Col>
                            </Row>
                        )
                    })}
                </ReactSortable>
            </Modal>
        </>
    )
}

export default TabsManager;