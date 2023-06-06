import { FolderOpenOutlined } from '@ant-design/icons';
import { animated, easings, useSpring } from "@react-spring/web";
import { Button, Image, Modal, Select, Space, Spin, Switch, Tabs, Tooltip, Upload, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Dragger from 'antd/es/upload/Dragger';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import mergeArr from '../common/mergeArr';
import transformToJson from '../common/transformToJson';
import { funtabsData } from './data';
import './recommendAdd.css';

function Bookmarks(props) {
  const {
    linkList,
    num,
    tabsActiveKey,
    setTabsActiveKey,
    setLinkList,
    stickerList,
    setStickerList,
    type,
    edit,
    cardStyle
  } = props;
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)
  const [ellipsis] = useState('ture');
  const [display, setDisPlay] = useState('')
  const [fileName, setFileName] = useState('')
  const [dragAnimated, api] = useSpring(() => ({
  }))
  const [spinning, setSpinning] = useState(false)
  const [fullDrag, setFullDrag] = useState(false)
  const [tabsCheck, setTabsCheck] = useState('')
  const [load, setLoad] = useState(false)

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  const saveAddNewLink = (label, link, icon) => {
    if (fullDrag === false) {
      const addResult = { 'label': label, 'link': link, 'size': '11', 'icon': icon, 'type': 'link', 'backgroundColor': '#ffffff' }
      var judgement;
      const addResultList = _.cloneDeep(linkList)
      //重复性校验
      for (let i = 0; i < linkList[num].content.length; i++) {
        if (linkList[num].content[i].link) {
          if (linkList[num].content[i].link.split('//')[1] === link.split('//')[1]) {
            judgement = true
          }
        }
      }
      if (judgement === true) {
        message.error('这个已经添加过了哟～')
      } else {
        addResultList[num].content.push(addResult)
        setLinkList(addResultList)
        saveLinkList(addResultList)
        message.success(`已添加到【${linkList[num].label}】分类`)
      }
    } else {
      if (cardStyle === 'onlyText') {
        message.error('文字经典模式下不支持添加全屏卡片')
      } else {
        const addResult = { 'label': label, 'link': link, 'size': '11', 'icon': icon, 'type': 'link', 'backgroundColor': '#ffffff', "x": 80, "y": 20 }
        var judgement2;
        const addResultList = _.cloneDeep(stickerList)
        //重复性校验
        for (let i = 0; i < stickerList[0].content.length; i++) {
          if (stickerList[0].content[i].link) {
            if (stickerList[0].content[i].link.split('//')[1] === link.split('//')[1]) {
              judgement2 = true
            }
          }
        }
        if (judgement2 === true) {
          message.error('这个已经添加过了哟～')
        } else {
          addResultList[0].content.push(addResult)
          setStickerList(addResultList)
          saveStickerList(addResultList)
          message.success(`添加成功`)
        }
      }
    }
  }

  function saveLinkList(addResultList) {
    if (type === 1 && edit === 'none') {
      var newData;//本地存储数据是newData
      //如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
      const localData = JSON.parse(window.localStorage.getItem('funtabs'))
      if (localData) {
        newData = localData.newData
      } else {
        newData = funtabsData
      }
      newData.content = addResultList;
      //存储到本地
      window.localStorage.setItem('funtabs', JSON.stringify({ newData }))
    }
  }

  function saveStickerList(addResultList) {
    if (type === 1 && edit === 'none') {
      window.localStorage.setItem('stickerData', JSON.stringify(addResultList))
    }
  }

  function saveAllBookmarks() {
    if (!fullDrag) {
      const addResultList = _.cloneDeep(linkList)
      const oldLabel = addResultList.find(item => item.key === tabsActiveKey)
      let targetLabel = ''
      if (oldLabel) {
        targetLabel = oldLabel.label;
      } else {
        targetLabel = addResultList.find(item => item.key === addResultList[0].key).label;
      }
      // 合并两个数组
      const newArr = mergeArr(addResultList, data)
      const result = newArr[0]
      const addNum = newArr[1]
      const removeNum = newArr[2]
      const targetItem = result.find(item => item.label === targetLabel);
      const targetKey = targetItem ? targetItem.key : result[0].key;
      setTabsActiveKey(targetKey)
      window.localStorage.setItem('activeKey', targetKey)
      message.success(`导入成功，新增 ${addNum} 项，去重 ${removeNum} 项`);
      setLinkList(result)
      saveLinkList(result)
    } else {
      message.error('不支持导入到自由全屏模式中')
    }
  }

  function getFileContent(e) {
    setSpinning(true)
    transformToJson(e).then(res => {
      setTabsCheck(res[0].key)
      setDisPlay('none')
      if (!data) {
        api.start({
          from: {
            y: 20,
            opacity: 0,
            height: 112
          },
          to: [
            {
              y: 19.9,
              opacity: 0,
              height: 112
            }, {
              y: 0,
              opacity: 1,
              height: 306
            },
          ],
          config: {
            duration: 180,
            easing: easings.easeOutCubic
          },
        })
      } else {
        api.start({
          from: {
            y: 20,
            opacity: 0,
          },
          to: [
            {
              y: 19.9,
              opacity: 0,
            }, {
              y: 0,
              opacity: 1,
            },
          ],
          config: {
            duration: 180,
            easing: easings.easeOutCubic
          },
        })
      }
      setFileName(`（ ${e.name} ）`)
      setSpinning(false)
      setData(res)
    })
  }

  useEffect(() => {
    return (() => {
      setDisPlay('')
      setData()
      setFileName('')
      setFullDrag(false)
      setSpinning(false)
      setLoad(false)
    })
  }, [open])

  //网格布局样式信息
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(120px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill,62px)',
    columnGap: '12px',
    rowGap: '12px',
    gridAutoFlow: 'dense',
  }

  function showList() {
    if (data) {
      return (
        <>
          <div className='newtabs-style' style={{ height: '356px', }}>
            <Tabs
              tabPosition='top'
              type='card'
              style={{
                marginTop: '14px'
              }}
              items={data}
              tabBarGutter={8}
              activeKey={tabsCheck}
              onChange={(e) => {
                setTabsCheck(e)
                api.start({
                  from: {
                    y: 20,
                    opacity: 0,
                  },
                  to: [
                    {
                      y: 19.9,
                      opacity: 0,
                    }, {
                      y: 0,
                      opacity: 1,
                    },
                  ],
                  config: {
                    duration: 180,
                    easing: easings.easeOutCubic
                  },
                })
              }}
            />
            <animated.div style={{ ...dragAnimated, overflow: 'scroll' }}>
              <div style={gridStyle}>
                {data.filter(item => item.key === tabsCheck)[0].content.map((item, index) => {
                  return (
                    <div key={index} className='recommendAdd-div-style'>
                      <Image
                        style={{
                          backgroundColor: '#ffffff',
                          height: 'calc(42px)',
                          width: 'auto',
                          margin: '10px',
                          borderRadius: '8px',
                        }}
                        src={item.icon}
                        preview={false}
                        fallback='icon_error.svg' />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                        <Space>
                          <Paragraph
                            style={{ fontWeight: 'bold', margin: '0px 10px 0px 0px' }}
                            ellipsis={
                              ellipsis
                                ? {
                                  rows: 2,
                                  tooltip: { title: item.label, color: 'blue' }
                                } : false
                            }
                          >
                            {item.label}
                          </Paragraph>
                        </Space>
                      </div>
                      <div
                        className='recommendAdd-div-mask'>
                        <Space>
                          <Button
                            onClick={() => saveAddNewLink(item.label, item.link, item.icon)}
                            shape="round"
                            size='small'
                            style={{ fontSize: '0.5rem' }}>
                            添加
                          </Button>
                          <Button
                            onClick={() => {
                              if (item.link.slice(0, 4) !== 'http') {
                                window.open(`https://${item.link}`)
                              } else {
                                window.open(item.link)
                              }
                            }}
                            shape="round"
                            size='small'
                            style={{ fontSize: '0.5rem' }}>
                            查看
                          </Button>
                        </Space>
                      </div>
                    </div>
                  )
                })}
              </div>
            </animated.div>
          </div>
        </>
      )
    }
  }

  function showAddTabs() {
    if (fullDrag === false) {
      return <>
        目标分类：
        <Select
          defaultValue={tabsActiveKey}
          style={{
            width: 120,
          }}
          onChange={(e) => {
            setTabsActiveKey(e.key)
          }}
          labelInValue
          options={linkList}
        />
      </>
    }
  }

  function showFooter() {
    if (data) {
      return (
        <Space wrap style={{ width: '100%', textAlign: 'left', justifyContent: 'flex-end' }}>
          <div>
            {showAddTabs()}
          </div>
          <Switch
            checkedChildren="自由全屏"
            unCheckedChildren="分类区域"
            onChange={(e) => { setFullDrag(e) }}
          />
          <Upload
            beforeUpload={(file) => {
              getFileContent(file)
              return false
            }}
            showUploadList={false}
            maxCount={1}
            accept='.html'
          >
            <Button>重新导入</Button>
          </Upload>
          <Tooltip title='将按照书签内容创建分类'>
            <Button loading={load} type='primary' onClick={async () => {
              setLoad(true)
              await saveAllBookmarks()
              setOpen(false)
            }}>全部导入</Button>
          </Tooltip>
        </Space>
      )
    } else {
      return null
    }
  }

  function showType() {
    if (type === 1) {
      return (
        <p onClick={openModal}>导入书签</p>
      )
    } else {
      return (
        <Button type='primary' onClick={openModal}>导入书签</Button>
      )
    }
  }

  return (
    <div>
      {showType()}
      <Modal
        title={<>
          <Paragraph
            style={{ fontSize: '16px', fontWeight: '600', margin: '0px 10px 0px 0px' }}
            ellipsis={
              ellipsis
                ? {
                  rows: 1,
                  tooltip: { title: fileName, color: 'blue' }
                } : false
            }
          >
            导入书签{fileName}
          </Paragraph>
        </>}
        open={open}
        onCancel={closeModal}
        destroyOnClose
        okText='保存'
        cancelText='取消'
        style={{
          maxWidth: '550px',
        }}
        width='calc(100vw - 32px)'
        footer={showFooter()}
      >
        <Spin
          spinning={spinning}
          tip="数据加载中"
          size="large"
        >
          <Dragger
            beforeUpload={(file) => {
              getFileContent(file)
              return false
            }}
            showUploadList={false}
            maxCount={1}
            style={{
              display: display,
            }}
            accept='.html'
          >
            <FolderOpenOutlined style={{ fontSize: '32px', margin: '12px' }} />
            <p className="ant-upload-hint">
              点击或拖拽上传浏览器书签文件（.html）
            </p>
          </Dragger>
          {showList()}
        </Spin>
      </Modal >
    </div >
  );
}

export default Bookmarks;