import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Popconfirm, Row, Space } from "antd";
import { useState } from "react";

const TabsManager = (props) => {
    const { tabsItems, setTabsItems, setTabsVisibility } = props;
    const [tabsData, setTabsData] = useState(tabsItems)
    const [opened, setOpened] = useState(false)
    const newTabsData = [...tabsData]

    function addTabs() {
        if (tabsData.length !== 0) {
            if (tabsData.filter(item => item.label === '').length !== 0) {
                message.error('存在空白分类，创建失败')
            } else {
                const key = Date.parse(new Date())
                newTabsData.push({
                    label: '', key: key, content: []
                })
                setTabsData(newTabsData)
            }
        } else {
            const key = Date.parse(new Date())
            newTabsData.push({ 'label': '', 'key': key, content: [] })
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
        newTabsData.splice(index, 1)
        setTabsData(newTabsData)
        message.success('删除成功')
    }

    function saveTabs() {
        if (tabsData.filter(item => item.label === '').length !== 0) {
            message.error('请填写完整分类名称')
        } else {
            setTabsItems(newTabsData)
            setOpened(false)
            tabsVis()
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