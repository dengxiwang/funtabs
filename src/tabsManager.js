import { DeleteOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Popconfirm, Row, Space } from "antd";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { funtabsData } from "./linkList";

const TabsManager = (props) => {
    const { localData, tabsItems, setTabsItems, setTabsVisibility, tabsActiveKey, setTabsActiveKey } = props;
    const [tabsData, setTabsData] = useState(tabsItems)
    const [opened, setOpened] = useState(false)
    const newTabsData = [...tabsData]
    const [drag, setDrag] = useState(true)

    function addTabs() {
        if (tabsData.length !== 0) {
            if (tabsData.filter(item => item.label === '').length !== 0) {
                message.error('存在空白分类，创建失败')
            } else {
                const key = Date.parse(new Date()) + Math.floor(Math.random() * 1000)
                newTabsData.push({
                    label: '', key: key, content: []
                })
                setTabsData(newTabsData)
            }
        } else {
            const key = Date.parse(new Date()) + Math.floor(Math.random() * 1000)
            newTabsData.push({ 'label': '', 'key': key, content: [{}] })
            setTabsData(newTabsData)
        }
    }

    //判断标签页是否显示
    function tabsVis() {
        let a = newTabsData.length;
        if (a === 1) {
            setTabsVisibility('none')
        } else {
            setTabsVisibility('')
        }
    }

    function deleteTabs(index) {
        if (newTabsData.length === 1) {
            message.error('删除失败，至少保留一个分类～')
        } else {
            newTabsData.splice(index, 1)
            setTabsData(newTabsData)
            message.success('删除成功')
        }
    }

    function saveTabs() {
        if (tabsData.filter(item => item.label === '').length !== 0) {
            message.error('请填写完整分类名称')
        } else {
            var newData;//本地存储数据是newData
            //如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
            if (localData) {
                newData = localData.newData
            } else {
                newData = funtabsData
            }
            newData.content = tabsData;
            //存储到本地
            window.localStorage.setItem('funtabs', JSON.stringify({ newData }))
            setTabsItems(newTabsData)
            setOpened(false)
            tabsVis()
            if (tabsData.filter(item => item.key === tabsActiveKey).length === 0) {
                setTabsActiveKey(tabsData[0].key)
                window.localStorage.setItem('activeKey', tabsData[0].key)
            }
        }
    }

    return (
        <>
            <Button
                type="primary"
                onClick={
                    () => {
                        setTabsData(tabsItems)
                        setOpened(true)
                    }}
            >
                分类管理
            </Button>
            <Modal
                title='导航分类管理'
                open={opened}
                onCancel={() => { setOpened(false) }}
                okText='确认'
                cancelText='取消'
                destroyOnClose
                bodyStyle={{
                    marginTop: '12px'
                }}
                footer={false}
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
                >
                    {tabsData.map((item, index) => {
                        return (
                            <Row key={item.key} style={{ marginBottom: '12px', alignItems: 'center' }}>
                                <Col flex='78px'>
                                    分类名称:
                                </Col>
                                <Col flex='auto'>
                                    <Input
                                        defaultValue={item.label}
                                        onChange={(e) => {
                                            item.label = e.target.value
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        onMouseEnter={() => { setDrag(false) }}
                                        onMouseLeave={() => { setDrag(true) }}
                                    >
                                        <SwapOutlined rotate={90} />
                                    </Button>
                                    <Popconfirm
                                        title="删除后，该分类下的卡片布局也将随之删除！您确定吗？"
                                        onConfirm={() => { deleteTabs(index) }}
                                        okText="嗯呐"
                                        cancelText="哒咩"
                                    >
                                        <Button danger ><DeleteOutlined /></Button>
                                    </Popconfirm>
                                </Col>
                            </Row>
                        )
                    })}
                </ReactSortable>
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
            </Modal>
        </>
    )
}

export default TabsManager;