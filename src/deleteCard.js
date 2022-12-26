import { CloseCircleTwoTone } from "@ant-design/icons";
import { message } from "antd";

const DeleteCard = (props) => {
    const { linkList, item, id, setLinkList } = props;

    function deleteCard() {
        const ListData = [...linkList]
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success(`【 ${item.label} 】卡片删除成功`)
        //删除卡片的同时清除相应的本地缓存
        if (item.id) {
            window.localStorage.removeItem('note' + item.id)
            window.localStorage.removeItem('beginTime' + item.id)
            window.localStorage.removeItem('endTime' + item.id)
            window.localStorage.removeItem('timeText' + item.id)
            window.localStorage.removeItem('timeType' + item.id)
        }
    }
    return (
        <>
            <CloseCircleTwoTone
                onClick={deleteCard}
                twoToneColor='red'
                className='delete-button-style' />
        </>
    )
}
export default DeleteCard;