import { InteractionTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import _ from 'lodash';
import React from 'react';
import '../common/funtabs.css';

function ChangeList(props) {
    const {
        id,
        num,
        linkList,
        setLinkList,
        otherList,
        setOtherList
    } = props;

    return (
        <>
            <InteractionTwoTone
                className='changeList-button'
                onClick={() => {
                    const uniqeId = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
                    const ListData = _.cloneDeep(linkList)
                    const list = _.cloneDeep(otherList)
                    if (ListData[num]) {
                        if (ListData[num].content) {
                            ListData[num].content[id].x = 80
                            ListData[num].content[id].y = 20
                            if (!ListData[num].content[id].id) {
                                ListData[num].content[id].id = uniqeId
                            }
                            if (list[num]) {
                                list[num].content.push(ListData[num].content[id])
                            } else {
                                list[0].content.push(ListData[num].content[id])
                            }
                            ListData[num].content.splice(id, 1)
                        } else {
                            ListData[id].x = 80
                            ListData[id].y = 20
                            if (!ListData[id].id) {
                                ListData[id].id = uniqeId
                            }
                            if (list[num].content) {
                                list[num].content.push(ListData[id])
                            } else {
                                list[num].push(ListData[id])
                            }
                            ListData.splice(id, 1)
                        }
                    } else {
                        if (ListData[0].content) {
                            ListData[0].content[id].x = 80
                            ListData[0].content[id].y = 20
                            if (!ListData[0].content[id].id) {
                                ListData[0].content[id].id = uniqeId
                            }
                            if (list[num]) {
                                list[num].content.push(ListData[0].content[id])
                            } else {
                                list[0].content.push(ListData[0].content[id])
                            }
                            ListData[0].content.splice(id, 1)
                        } else {
                            ListData[id].x = 80
                            ListData[id].y = 20
                            if (!ListData[id].id) {
                                ListData[id].id = uniqeId
                            }
                            if (list[num].content) {
                                list[num].content.push(ListData[id])
                            } else {
                                list[num].push(ListData[id])
                            }
                            ListData.splice(id, 1)
                        }
                    }
                    message.success('卡片摆放样式切换成功')
                    setLinkList(ListData)
                    setOtherList(list)
                }}
            />
        </>
    );
}

export default ChangeList;