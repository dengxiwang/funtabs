import { DeleteOutlined, DownOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Col, Drawer, Dropdown, Input, InputNumber, message, Modal, Row, Select, Space, Switch, Typography } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './funTabs.css';
import { applyDrag } from './utils';

const { Search } = Input;//搜索输入框来源于input
const { Text } = Typography;

const linkList = [
  {
    label: '百度',
    link: 'https://www.baidu.com',
    icon: 'https://www.baidu.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: 'Bing',
    link: 'https://www.bing.com',
    icon: 'https://cn.bing.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '抖音',
    link: 'https://www.douyin.com',
    icon: 'https://www.douyin.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '淘宝',
    link: 'https://www.taobao.com',
    icon: 'https://www.taobao.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '360',
    link: 'https://www.so.com',
    icon: 'https://www.so.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '河南交科院',
    link: 'http://39.103.131.122:8081/jkyErp/index.html#/',
    icon: 'http://39.103.131.122:8081/jkyErp/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: 'Antd',
    link: 'https://ant-design.antgroup.com/index-cn',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
    type: 'link',
    size: '11',
  }, {
    label: 'Apple',
    link: 'https://www.apple.com.cn',
    icon: 'https://www.apple.com.cn/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '吾爱破解',
    link: 'https://www.52pojie.cn/index.php',
    icon: 'https://www.52pojie.cn/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '新浪微博',
    link: 'https://www.weibo.com',
    icon: 'https://www.weibo.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '今日头条',
    link: 'https://www.toutiao.com',
    icon: 'https://www.toutiao.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: '阿里矢量图标',
    link: 'https://iconfont.cn',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
    type: 'link',
    size: '11',
  }, {
    label: 'CSDN',
    link: 'https://www.csdn.com',
    icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
    type: 'link',
    size: '11',
  }, {
    label: '爱奇艺',
    link: 'https://www.iqiyi.com',
    icon: 'https://www.iqiyi.com/favicon.ico',
    type: 'link',
    size: '11',
  }, {
    label: 'bilibili',
    link: 'https://www.bilibili.com',
    icon: 'https://www.bilibili.com/favicon.ico',
    type: 'link',
    size: '11',
  }
]

const linkListStyle = {
  backgroundColor: '#e6e6e6',
  padding: '5px 10px'
}

const imgStyle = {
  width: 'auto',
  height: '100%',
  margin: '0px 10px 0px 0px',
  WebkitUserDrag: 'none',
}

const settings = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center'
}

const settingsOption = {
  display: 'flex',
  flexDirection: 'column',
  padding: '12px'
}

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const buttonDiv = {
  display: 'flex',
  alignItems: 'center'
}

function Clock() {
  const timmer = useRef()
  const [Hour, setHour] = useState('');
  const [Seconds, setSeconds] = useState('');
  const [Minutes, setMinutes] = useState('');
  const [Year, setYear] = useState('');
  const [Month, setMonth] = useState('');
  const [Day, setDay] = useState('');
  const [Weekday, setWeekday] = useState('')

  const weekdayMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    0: '日',
    7: '日'
  }

  useEffect(() => {
    getNewDate()
    timmer.current = setInterval(getNewDate, 1000);
    return () => {
      clearTimeout(timmer.current)
    }
    // eslint-disable-next-line
  }, [])

  const getNewDate = () => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const wday = time.getDay()
    const hour = time.getHours();
    if (hour < 10) {
      setHour(`0${hour}`)
    } else {
      setHour(hour)
    }
    const minutes = time.getMinutes();
    const s = time.getSeconds();
    const seconds = s <= 9 ? "0" + s : s;
    // const t = `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
    // setHour(hour)
    setSeconds(seconds)
    if (minutes < 10) {
      setMinutes(`0${minutes}`)
    } else {
      setMinutes(minutes)
    }
    setYear(year)
    setMonth(month)
    setDay(day)
    setWeekday(weekdayMap[wday])
  }

  return (
    <div className="clock">
      <Card title="当前时间" bordered={false} headStyle={{ display: 'none' }} style={{ background: 'none', width: '440px', height: '207px' }}>
        <div className='clock-card'>
          <p className='hourclass'>{Hour}{Hour && <span style={{ margin: '0px 8px', fontSize: '88px' }}>{':'}</span>}{Minutes}</p>
          {/* <p className='secondsclass'>{Seconds}</p> */}
        </div>
        <div className='dateclass'>
          {/* <p>{Year}年{Month}月{Day}日</p> */}
          {Month && <p>
            {`${Year}年${Month}月${Day}日 星期${Weekday}`}
          </p>}
        </div>
      </Card>
    </div>
  )
}

//基于抽屉的funtabs
const FunTabs = (props) => {

  const [ellipsis] = useState('ture');
  const [open, setOpen] = useState(false);
  const [newList, setNewList] = useState(linkList);
  const [widthNum, setWidthNum] = useState('132');
  const [heightNum, setHeightNum] = useState('64');
  const [display, setDisplay] = useState('')
  const [defaultAllSize, setDefaultAllSize] = useState('1*1')
  const [seachEngine, setSearchEngine] = useState('0')//定义所选搜索引擎的key值
  const [searchContent, setSearchContent] = useState('')//定义搜索的内容

  //定义搜索下拉菜单中的图标的样式
  const imgStyle2 = {
    width: '18px',
    height: '18px',
    marginTop: '5px',
    marginBottom: '5px'
  }

  //定义卡片中的图标的样式
  const imgStyle3 = {
    width: '40px',
    height: '40px',
    margin: '2px 10px 2px 0px',
  }

  //搜索引擎下拉菜单
  const items = [
    {
      label: '百度',
      key: "0",
      link: 'https://www.baidu.com/s?wd=',
      icon: <img src='http://www.baidu.com/favicon.ico' style={imgStyle2} alt='' />,
    },
    {
      label: '必应',
      key: "1",
      link: 'https://cn.bing.com/search?q',
      icon: <img src='https://bing.com/favicon.ico' style={imgStyle2} alt='' />
    },
    {
      label: 'fsou',
      key: "2",
      link: 'https://fsoufsou.com/search?q=',
      icon: <img src='http://www.fsoufsou.com/favicon.ico' style={imgStyle2} alt='' />
    },
  ]

  //组件生命周期
  useEffect(() => {
  })

  //定义搜索选项组件
  const SearchOptions = () => {

    //当菜单被点击时，将搜索引擎切换为对应的key值
    const onClick = ({ key }) => {
      setSearchEngine(key)
    };

    //组件渲染
    return (
      <>
        <Dropdown
          menu={{ items, onClick }}
        >
          <Button size='large' style={{ margin: '-1px -12px', width: '80px' }}>
            <Space>
              {items.map((item) => {
                if (item.key === seachEngine) {
                  return (
                    item.label
                  )
                }
              })}
            </Space>
            <Space style={{ marginLeft: '8px' }}>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </>
    )
  }

  //当点击搜索时候的操作方法
  function handleSearch() {
    if (searchContent === '') {
      message.error('什么都不输就想离开我？没门！')
    } else {
      window.open(items[seachEngine].link + searchContent, '_blank')//在新页面打开搜索内容
    }
  }

  //获取搜索的输入框内容
  function getSearchContent(e) {
    setSearchContent(e.target.value)
  }

  //网格布局样式信息
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(' + widthNum + 'px, 1fr))',
    columnGap: '12px',
    rowGap: '12px',
    gridAutoFlow: 'dense',
    gridAutoRows: heightNum + 'px',
  }

  //展示设置页面
  const showDrawer = () => {
    setOpen(true);
  };

  //关闭设置页面
  const onClose = () => {
    setOpen(false);
  };

  //控制首页的卡片展示大小
  const Links = (props) => {
    const links = props.links;

    //定义Card卡片内容样式
    const ShowCard = (props) => {
      const item = props.item;
      const size = props.size;

      return (
        <Card
          className={'grid-item' + size}
          bodyStyle={{ padding: '10px', position: 'relative', overflow: 'hidden', height: '100%' }}
        >
          <>
            <a href={item.link} target='_blank' style={{ width: '100%', height: '100%' }} rel="noreferrer">
              <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <img id="lineHeight" src={item.icon} style={imgStyle} alt=''></img>
                <img
                  src={item.icon}
                  alt=''
                  style={{
                    position: 'absolute',
                    height: '100%',
                    top: '0px',
                    right: '-10px',
                    opacity: 0.1,
                    transform: 'rotate(-30deg)',
                    WebkitUserDrag: 'none'
                  }}>
                </img>
                <Text
                  style={{ lineHeight: parseInt(heightNum) - 20 + 'px', zIndex: '10', }}
                  strong
                  ellipsis={
                    ellipsis
                      ? {
                        tooltip: item.label,
                      }
                      : false
                  }
                >
                  {item.label}
                </Text>
              </div>
            </a>
          </>
        </Card>
      )
    }

    //渲染首页卡片
    return (
      <div style={gridStyle}>
        {
          links.map((item, index) => {
            //将卡片大小分为四类。1*1.1*2，2*1，2*2
            if (item.size === '11') {
              return (
                <ShowCard item={item} key={index} size='11' />
              )
            } else if (item.size === '12') {
              return (
                <ShowCard item={item} key={index} size='12' />
              )
            } else if (item.size === '21') {
              return (
                <ShowCard item={item} key={index} size='21' />
              )
            } else if (item.size === '22') {
              return (
                <ShowCard item={item} key={index} size='22' />
              )
            }
          })
        }
      </div >
    )
  }



  //定义设置里面的卡片设置
  const SettingsCardStyle = () => {



    const CardStyleSelect = () => (
      <Select
        defaultValue={'默认'}
        onChange={() => message.error('这个功能我还没做呢，只有默认模式～')}
        options={
          [
            {
              value: 'default',
              label: '默认'
            }, {
              value: 'onlyIcon',
              label: '仅图标'
            }, {
              value: 'phone',
              label: '类手机桌面'
            }
          ]
        } />
    )

    const CardSizeSelect = () => (
      <Select
        defaultValue={defaultAllSize}
        onChange={(value) => {
          setDefaultAllSize(value)
          let sizeChangeList = [...newList]
          for (var i = 0; i < sizeChangeList.length; i++) {
            sizeChangeList[i].size = value
          }
          setNewList(sizeChangeList)
        }}
        options={
          [
            {
              value: '11',
              label: '1*1'
            }, {
              value: '12',
              label: '1*2'
            }, {
              value: '21',
              label: '2*1'
            }, {
              value: '22',
              label: '2*2'
            }
          ]
        } />
    )

    const AddModal = () => {

      const [isAddModalOpen, setAddIsModalOpen] = useState(false);
      const [addLinkSize, setAddLinkSize] = useState('11')
      const [a, setA] = useState('')
      const [b, setB] = useState('')
      const [c, setC] = useState('')

      const showAddModal = () => {
        setAddIsModalOpen(true);
      };

      const addSize = (value) => {
        setAddLinkSize(value)
      }

      const saveAdd = () => {

        if (a === '' || b === '' || c === '') {
          message.error('请输入完整后再点击确定')
        } else {
          const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link' }
          const addResultList = [...newList]
          addResultList.push(addResult)
          setAddIsModalOpen(false);
          setTimeout(() => {
            setNewList(addResultList)
          }, 200)
        }
      };

      const cancelAdd = () => {
        setAddIsModalOpen(false);
      };

      return (
        <>
          <Row style={{ display: 'flex', justifyContent: 'flex-end', margin: '24px 0px 12px 0px' }}>
            <Button type="primary" style={{ marginRight: '12px' }} onClick={showAddModal}>新增</Button>
            {/* <Button type="primary" style={{ marginRight: '12px' }}>导入</Button> */}
            {/* <Button type="primary" style={{ marginRight: '12px' }}>导出</Button> */}
            <Button type="primary" danger onClick={() => { setNewList(linkList) }}>恢复默认设置</Button>
          </Row>
          <Modal
            title='新增链接卡片（Add Link）'
            open={isAddModalOpen}
            onOk={saveAdd}
            onCancel={cancelAdd}
            okText='确定'
            cancelText='取消'
            bodyStyle={modalStyle}
          >
            <div className="input-div">
              卡片名称：<Input id="addLabel" onChange={(e) => { setA(e.target.value) }} />
            </div>
            <div className="input-div">
              链接地址：<Input id="addLink" onChange={
                (e) => {
                  let result = e.target.value;
                  var result2;
                  if (result.substring(0, 7) === 'http://') {
                    result2 = result
                  } else if (result.substring(0, 8) === 'https://') {
                    result2 = result
                  } else {
                    result2 = 'http://'.concat(result)
                  }
                  setB(result2)
                }
              } />
            </div>
            <div className="input-div">
              卡片大小：<Select
                id="addSize"
                defaultValue={'1*1'}
                onChange={addSize}
                options={
                  [
                    {
                      value: '11',
                      label: '1*1'
                    }, {
                      value: '12',
                      label: '1*2'
                    }, {
                      value: '21',
                      label: '2*1'
                    }, {
                      value: '22',
                      label: '2*2'
                    }
                  ]
                } />
            </div>
            <div className="input-div">
              图标地址：<Input id="addIcon" value={b + '/favicon.ico'} onChange={
                (e) => {
                  let result = e.target.value;
                  var result2;
                  if (result.substring(0, 7) === 'http://') {
                    result2 = result
                  } else if (result.substring(0, 8) === 'https://') {
                    result2 = result
                  } else {
                    result2 = 'http://'.concat(result)
                  }
                  setC(result2)
                }
              } />
            </div>
            <div className="input-div" style={{ marginBottom: '0px' }}>
              卡片预览：
              <div style={{ width: '140px', height: '77px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F0EC' }}>
                <div style={{ width: '126px', height: '66px', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center', backgroundColor: '#fff', padding: '10px 10px 10px 12px' }}>
                  <img src={c} style={imgStyle} alt=''></img>
                  <img
                    src={c}
                    alt=''
                    style={{
                      position: 'absolute',
                      width: '70px',
                      top: '-10px',
                      right: '-10px',
                      opacity: 0.1,
                      transform: 'rotate(-30deg)',
                      WebkitUserDrag: 'none'
                    }}>
                  </img>
                  <Text
                    style={{ lineHeight: '44px', zIndex: '10' }}
                    strong
                    ellipsis={
                      ellipsis
                        ? {
                          tooltip: a,
                        }
                        : false
                    }
                  >
                    {a}
                  </Text>
                </div>
              </div>
            </div>
          </Modal >
        </>

      )
    }

    return (
      <Card style={{ marginBottom: '24px' }} bodyStyle={settingsOption}>
        <Row>
          <Col span={12}>
            卡片宽度：<InputNumber style={{ marginRight: '24px' }} min={50} stringMode defaultValue={widthNum} onChange={(e) => { setWidthNum(e) }} />
          </Col>
          <Col span={12}>
            卡片高度：<InputNumber min={50} stringMode defaultValue={heightNum} onChange={(e) => { setHeightNum(e) }} />
          </Col>
        </Row>
        <Row style={{ marginTop: '12px' }}>
          <Col span={12}>
            卡片样式：<CardStyleSelect />
          </Col>
          <Col span={12}>
            卡片大小：<CardSizeSelect />
          </Col>
        </Row>
        <AddModal />
      </Card>
    )
  }

  //定义设置里面的卡片排序
  const SettingsCardPosition = () => {

    //用于编辑链接信息的弹窗
    const EditLinkModal = (props) => {
      const [link, setLink] = useState(props.link);
      const [label, setLabel] = useState(props.label);
      const [icon, setIcon] = useState(props.icon);
      const [size, setSize] = useState(props.size);
      const id = props.id;

      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

      function editLink() {
        message.success('编辑')
        let editResult = { 'label': label, 'link': link, 'size': size, 'icon': icon, 'type': 'link' }
        const editList = [...newList]
        editList.splice(id, 1, editResult)
        setIsModalOpen(false);
        setTimeout(() => {
          setNewList(editList)
        }, 200
        )
      }

      function deleteLink() {
        const ListData = [...newList]
        ListData.splice(id, 1)
        setNewList(ListData)
        message.success('【' + label + '】' + '卡片删除成功')
      }

      return (
        <>
          <div style={buttonDiv}>
            <Button type="link" onClick={showModal}><FormOutlined /></Button>
            <Button type="link" onClick={deleteLink} danger><DeleteOutlined /></Button>
          </div>
          <Modal
            title='编辑链接（Edit Link）'
            open={isModalOpen}
            onOk={editLink}
            onCancel={handleCancel}
            okText='确定'
            cancelText='取消'

          >
            <div className="input-div">
              卡片名称：<Input defaultValue={label} onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div className="input-div">
              链接地址：<Input defaultValue={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="input-div">
              卡片大小：<Select
                defaultValue={size}
                onChange={(value) => setSize(value)}
                options={
                  [
                    {
                      value: '11',
                      label: '1*1'
                    }, {
                      value: '12',
                      label: '1*2'
                    }, {
                      value: '21',
                      label: '2*1'
                    }, {
                      value: '22',
                      label: '2*2'
                    }
                  ]
                } />
            </div>
            <div className="input-div">
              图标地址：<Input defaultValue={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>
            <div className="input-div" style={{ marginBottom: '0px' }}>
              卡片预览：
              <div style={{ width: '140px', height: '77px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F0EC' }}>
                <div style={{ width: '126px', height: '66px', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center', backgroundColor: '#fff', padding: '10px 10px 10px 12px' }}>
                  <img src={icon} style={imgStyle} alt=''></img>
                  <img
                    src={icon}
                    alt=''
                    style={{
                      position: 'absolute',
                      width: '70px',
                      top: '-10px',
                      right: '-10px',
                      opacity: 0.1,
                      transform: 'rotate(-30deg)',
                      WebkitUserDrag: 'none'
                    }}>
                  </img>
                  <Text
                    style={{ lineHeight: '44px', zIndex: '10' }}
                    strong
                    ellipsis={
                      ellipsis
                        ? {
                          tooltip: label,
                        }
                        : false
                    }
                  >
                    {label}
                  </Text>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )
    }

    return (
      <>
        <div className="simple-page" style={linkListStyle}>
          <Container
            dragClass="opacity-ghost"
            dropClass="opacity-ghost-drop"
            getChildPayload={i => newList[i]}
            dragHandleSelector=".column-drag-handle"
            onDrop={e => {
              let result = applyDrag(newList, e)
              setNewList(result)
            }
            }
          >
            {newList.map((item, index) => {
              return (
                <Draggable key={index}>
                  <div className="draggable-item">
                    <span className="column-drag-handle" style={{ float: 'left', margin: '0px 20px 0px 0px', padding: '0px 10px' }}>
                      &#x2630;
                    </span>
                    <div style={{ display: 'flex', width: '225px', overflow: 'hidden', whiteSpace: 'nowrap', flexDirection: 'column', lineHeight: '18px', justifyContent: 'center' }}>
                      <div >
                        {item.label}
                      </div>
                      <p style={{ fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0px' }}>{item.link}</p>
                    </div>
                    <div style={{ width: '92px', float: 'right', display: 'flex', alignItems: 'center' }}>
                      <EditLinkModal
                        link={item.link}
                        label={item.label}
                        icon={item.icon}
                        size={item.size}
                        id={index}
                      />
                    </div>
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </>
    )
  }

  //整体渲染
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="desktop_background">
        <div className='desktop_mask'></div>
      </div>
      <div className='desktop_content'>
        <div>
          <Clock />
        </div>
        <div>
          <Search
            addonBefore={<SearchOptions />}
            placeholder=""
            size='large'
            enterButton="搜索一下"
            onSearch={handleSearch}
            onChange={getSearchContent}
            style={{
              width: '45%',
              margin: '0px 0px 12px 0px',
              maxWidth: '800px',
              minWidth: '320px'
            }} />
        </div>
        <div>
          <div style={settings}>
            <Switch
              checkedChildren="简约"
              unCheckedChildren="默认"
              defaultChecked={false}
              onChange={
                () => {
                  if (display === '') {
                    setDisplay('none')
                  } else {
                    setDisplay('')
                  }
                }
              }
            />
            <Button onClick={showDrawer} type='text' style={{ color: '#fff' }}>
              设置
            </Button>
          </div>
          {/* 抽屉页面 */}
          <Drawer
            title="编辑方格标签页（Edit FunTabs）"
            placement="right"
            onClose={onClose}
            footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
            open={open}
            width='460px'
          >
            <SettingsCardStyle />
            <SettingsCardPosition />
          </Drawer >
          <div style={{ marginTop: '40px', display: display }}>
            <Links links={newList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunTabs;