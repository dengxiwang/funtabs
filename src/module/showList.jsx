import { animated } from "@react-spring/web";
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import Slider from "react-slick";
import { ReactSortable } from 'react-sortablejs';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../common/funtabs.css';
import DefaultStyle from "../showStyle/defaultStyle";
import OnlyIconStyle from "../showStyle/onlyIconStyle";
import OnlyText from "../showStyle/onlyText";
import PhoneStyle from "../showStyle/phoneStyle";

function ShowList(props) {
    const {
        cardStyle,
        tabs,
        gap,
        num,
        linkListAnimation,
        newlinkList,
        setNewLinkList,
        gridStyle,
        drag,
        edit,
        radius,
        widthNum,
        heightNum,
        tabsActiveKey,
        linkOpen,
        otherList,
        setOtherList,
        deviceType,
        fontColor
    } = props;
    const [a, setA] = useState(0)
    const animation = 400
    const [folderDisabled, setFolderDisabled] = useState(true)
    const [click] = useState(0)

    useEffect(() => {
        if (edit === '') {
            setFolderDisabled(false)
        } else {
            setFolderDisabled(true)
        }
    }, [edit])

    useEffect(() => {
        setTimeout(() => {
            setA(1)
        }, 500);
    }, [])

    function showKey(a) {
        //兼容手机平台
        if (deviceType === 'PC') {
            if (a === 0) {
                return false
            } else {
                return newlinkList
            }
        } else {
            return false
        }
    }

    const settings = {
        dots: false,
        infinite: false,
        adaptiveHeight: true,
        touchMove: false,
        initialSlide: num,
        arrows: false
    };

    if (cardStyle === 'defaultCard') {
        return (
            <>
                <Flipper flipKey={showKey(a)} spring='veryGentle'>
                    <Slider
                        ref={e => { tabs.current = e }}
                        {...settings}
                    >
                        {newlinkList.map((item, index) => {
                            return (
                                <div key={index} >
                                    <animated.div id='grid-div' style={{ ...linkListAnimation, display: 'flex', justifyContent: 'center' }}>
                                        <ReactSortable
                                            group='1'
                                            id={`sortable${index}`}
                                            key='sortable1'
                                            list={item.content}
                                            setList={
                                                (e) => {
                                                    newlinkList[index].content = e
                                                    const newList = _.cloneDeep(newlinkList)
                                                    setNewLinkList(newList)
                                                }}
                                            className='grid'
                                            tag='div'
                                            ghostClass='drag-background-class'
                                            style={{ ...gridStyle }}
                                            disabled={drag}
                                            animation={animation}
                                            onStart={() =>
                                                setA(0)
                                            }
                                            onChoose={(e) => {
                                                const checkItem = e.item.attributes["data-flip-id"].nodeValue.toString();
                                                const result = checkItem.substring(0, 4)
                                                if (result !== 'link') {
                                                    setFolderDisabled(true)
                                                }
                                            }}
                                            onUnchoose={() => {
                                                setFolderDisabled(false)
                                            }}
                                            onEnd={(e) => {
                                                setTimeout(() => {
                                                    setA(1)
                                                }, 10);
                                            }}
                                        >
                                            {item.content.map((item, index) => {
                                                return (
                                                    <DefaultStyle
                                                        key={item.link + item.type + item.id}
                                                        id={index}
                                                        edit={edit}
                                                        item={item}
                                                        linkList={newlinkList}
                                                        setLinkList={setNewLinkList}
                                                        radius={radius}
                                                        num={num}
                                                        gap={gap}
                                                        widthNum={widthNum}
                                                        heightNum={heightNum}
                                                        tabsActiveKey={tabsActiveKey}
                                                        cardStyle={cardStyle}
                                                        linkOpen={linkOpen}
                                                        setA={setA}
                                                        folderDisabled={folderDisabled}
                                                        otherList={otherList}
                                                        setOtherList={setOtherList}
                                                        click={click}
                                                    />
                                                )
                                            })}
                                        </ReactSortable>
                                    </animated.div>
                                </div>
                            )
                        })}
                    </Slider>
                </Flipper>
            </>
        )
    } else if (cardStyle === 'onlyIconCard') {
        return (
            <>
                <Flipper flipKey={showKey(a)} spring='veryGentle'>
                    <Slider
                        ref={e => { tabs.current = e }}
                        {...settings}
                    >
                        {newlinkList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <animated.div id='grid-div' style={{ ...linkListAnimation, display: 'flex', justifyContent: 'center' }}>
                                        <ReactSortable
                                            group='1'
                                            id={`sortable${index}`}
                                            key='sortable1'
                                            list={item.content}
                                            setList={
                                                (e) => {
                                                    newlinkList[index].content = e
                                                    const newList = _.cloneDeep(newlinkList)
                                                    setNewLinkList(newList)
                                                }}
                                            tag='div'
                                            ghostClass='drag-background-class'
                                            className='grid'
                                            style={{ ...gridStyle }}
                                            disabled={drag}
                                            animation={animation}
                                            onStart={() => setA(0)}
                                            onEnd={() => {
                                                setTimeout(() => {
                                                    setA(1)
                                                }, 10);
                                            }}
                                            onChoose={(e) => {
                                                const checkItem = e.item.attributes["data-flip-id"].nodeValue.toString();
                                                const result = checkItem.substring(0, 4)
                                                if (result !== 'link') {
                                                    setFolderDisabled(true)
                                                }
                                            }}
                                            onUnchoose={() => {
                                                setFolderDisabled(false)
                                            }}
                                        >
                                            {item.content.map((item, index) => {
                                                return (
                                                    <OnlyIconStyle
                                                        key={item.link + item.type + item.id}
                                                        id={index}
                                                        edit={edit}
                                                        item={item}
                                                        linkList={newlinkList}
                                                        setLinkList={setNewLinkList}
                                                        radius={radius}
                                                        num={num}
                                                        gap={gap}
                                                        widthNum={widthNum}
                                                        heightNum={heightNum}
                                                        tabsActiveKey={tabsActiveKey}
                                                        cardStyle={cardStyle}
                                                        linkOpen={linkOpen}
                                                        setA={setA}
                                                        folderDisabled={folderDisabled}
                                                        otherList={otherList}
                                                        setOtherList={setOtherList}
                                                        click={click}
                                                    />
                                                )
                                            })}
                                        </ReactSortable>
                                    </animated.div>
                                </div>
                            )
                        })}
                    </Slider>
                </Flipper>
            </>
        )
    } else if (cardStyle === 'phoneCard') {
        return (
            <>
                <Flipper flipKey={showKey(a)} spring='veryGentle'>
                    <Slider
                        ref={e => { tabs.current = e }}
                        {...settings}
                    >
                        {newlinkList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <animated.div id='grid-div' style={{ ...linkListAnimation, display: 'flex', justifyContent: 'center' }}>
                                        <ReactSortable
                                            group='1'
                                            id={`sortable${index}`}
                                            key='sortable1'
                                            list={item.content}
                                            setList={
                                                (e) => {
                                                    newlinkList[index].content = e
                                                    const newList = _.cloneDeep(newlinkList)
                                                    setNewLinkList(newList)
                                                }}
                                            tag='div'
                                            ghostClass='drag-background-class'
                                            className='grid'
                                            style={{ ...gridStyle }}
                                            disabled={drag}
                                            animation={animation}
                                            onStart={() => setA(0)}
                                            onEnd={() => {
                                                setTimeout(() => {
                                                    setA(1)
                                                }, 10);
                                            }}
                                            onChoose={(e) => {
                                                const checkItem = e.item.attributes["data-flip-id"].nodeValue.toString();
                                                const result = checkItem.substring(0, 4)
                                                if (result !== 'link') {
                                                    setFolderDisabled(true)
                                                }
                                            }}
                                            onUnchoose={() => {
                                                setFolderDisabled(false)
                                            }}
                                        >
                                            {item.content.map((item, index) => {
                                                return (
                                                    <PhoneStyle
                                                        key={item.link + item.type + item.id}
                                                        id={index}
                                                        edit={edit}
                                                        item={item}
                                                        linkList={newlinkList}
                                                        setLinkList={setNewLinkList}
                                                        radius={radius}
                                                        num={num}
                                                        gap={gap}
                                                        widthNum={widthNum}
                                                        heightNum={heightNum}
                                                        tabsActiveKey={tabsActiveKey}
                                                        cardStyle={cardStyle}
                                                        linkOpen={linkOpen}
                                                        setA={setA}
                                                        folderDisabled={folderDisabled}
                                                        otherList={otherList}
                                                        setOtherList={setOtherList}
                                                        click={click}
                                                    />
                                                )
                                            })}
                                        </ReactSortable>
                                    </animated.div>
                                </div>
                            )
                        })}
                    </Slider>
                </Flipper>
            </>
        )
    } else if (cardStyle === 'onlyText') {
        return (
            <>
                <Flipper flipKey={showKey(a)} spring='veryGentle'>
                    <Slider
                        ref={e => { tabs.current = e }}
                        {...settings}
                    >
                        {newlinkList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <animated.div id='grid-div' style={{ ...linkListAnimation, display: 'flex', justifyContent: 'center' }}>
                                        <ReactSortable
                                            group='1'
                                            id={`sortable${index}`}
                                            key='sortable1'
                                            list={item.content}
                                            setList={
                                                (e) => {
                                                    newlinkList[index].content = e
                                                    const newList = _.cloneDeep(newlinkList)
                                                    setNewLinkList(newList)
                                                }}
                                            tag='div'
                                            ghostClass='drag-background-class'
                                            className='grid'
                                            style={{ ...gridStyle }}
                                            disabled={drag}
                                            animation={animation}
                                            onStart={() => setA(0)}
                                            onEnd={() => {
                                                setTimeout(() => {
                                                    setA(1)
                                                }, 10);
                                            }}
                                            onChoose={(e) => {
                                                const checkItem = e.item.attributes["data-flip-id"].nodeValue.toString();
                                                const result = checkItem.substring(0, 4)
                                                if (result !== 'link') {
                                                    setFolderDisabled(true)
                                                }
                                            }}
                                            onUnchoose={() => {
                                                setFolderDisabled(false)
                                            }}
                                        >
                                            {item.content.map((item, index) => {
                                                return (
                                                    <OnlyText
                                                        key={item.link + item.type + item.id}
                                                        id={index}
                                                        edit={edit}
                                                        item={item}
                                                        linkList={newlinkList}
                                                        setLinkList={setNewLinkList}
                                                        radius={radius}
                                                        num={num}
                                                        gap={gap}
                                                        widthNum={widthNum}
                                                        heightNum={heightNum}
                                                        tabsActiveKey={tabsActiveKey}
                                                        cardStyle={cardStyle}
                                                        linkOpen={linkOpen}
                                                        setA={setA}
                                                        folderDisabled={folderDisabled}
                                                        otherList={otherList}
                                                        setOtherList={setOtherList}
                                                        click={click}
                                                        fontColor={fontColor}
                                                    />
                                                )
                                            })}
                                        </ReactSortable>
                                    </animated.div>
                                </div>
                            )
                        })}
                    </Slider>
                </Flipper>
            </>
        )
    }
}

export default ShowList;
