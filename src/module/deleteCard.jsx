import { CloseCircleTwoTone } from "@ant-design/icons";
import { message } from "antd";
import _ from 'lodash';

const DeleteCard = (props) => {
    const {
        linkList,
        num,
        item,
        id,
        setLinkList,
        cardStyle
    } = props;

    const ListData = _.cloneDeep(linkList);

    function deleteContent() {
        if (linkList[num] && linkList[num].content) {
            ListData[num].content.splice(id, 1);
            const content = linkList[num].content[id];
            if (content.content && content.content.length) {
                const c = content.content;
                if (content.type === 'folder') {
                    for (let i = 0; i < c.length; i++) {
                        c[i].x = 80;
                        c[i].y = 20;
                        ListData[num].content.push(c[i]);
                    }
                }
            }
        } else if (ListData[0].content) {
            ListData[0].content.splice(id, 1);
            const content = linkList[0].content[id];
            if (content.content && content.content.length) {
                const c = content.content;
                if (content.type === 'folder') {
                    for (let i = 0; i < c.length; i++) {
                        c[i].x = 80;
                        c[i].y = 20;
                        ListData[0].content.push(c[i]);
                    }
                }
            }
        } else {
            ListData.splice(id, 1);
        }
        return ListData;
    }

    function deleteCard() {
        const list = deleteContent();
        setLinkList(list);
        //删除卡片的同时清除相应的本地缓存
        if (item.id) {
            ['note', 'beginTime', 'endTime', 'timeText', 'timeType', 'hotEvent'].forEach(key => {
                window.localStorage.removeItem(`${key}${item.id}`);
            });
        }
    }

    function showStyle() {
        return cardStyle === 'onlyText' ? {
            top: '0px',
            right: '0px',
            padding: '4px'
        } : {
            top: '-8px',
            right: '-8px',
        };
    }

    return (
        <>
            <CloseCircleTwoTone
                onClick={() => {
                    message.success(`卡片删除成功`)
                    deleteCard()
                }}
                twoToneColor='red'
                className='delete-button-style'
                style={showStyle()} />
        </>
    )
}
export default DeleteCard;