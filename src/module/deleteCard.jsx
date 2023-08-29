import { CloseCircleTwoTone } from "@ant-design/icons";
import { message } from "antd";
import _ from "lodash";
import { useCallback, useMemo } from "react";

const DeleteCard = (props) => {
	const { linkList, num, item, id, setLinkList, cardStyle } = props;

	const deleteContent = useCallback(() => {
		const listData = _.cloneDeep(linkList);
		let target = null;

		if (
			linkList[num]?.content &&
			(!linkList[num].type || linkList[num].type === "folder")
		) {
			target = listData[num];
		} else if (
			listData[0]?.content &&
			(!linkList[0].type || linkList[0].type === "folder")
		) {
			target = listData[0];
		} else {
			listData.splice(id, 1);
		}

		if (target) {
			const content = target.content[id];
			target.content.splice(id, 1);

			if (
				content?.content &&
				content.content.length &&
				content.type === "folder"
			) {
				const c = content.content;
				for (let i = 0; i < c.length; i++) {
					c[i].x = 80;
					c[i].y = 20;
					target.content.push(c[i]);
				}
			}
		}

		return listData;
	}, [id, linkList, num]);

	const deleteCard = useCallback(() => {
		const list = deleteContent();
		setLinkList(list);

		if (item.id) {
			[
				"note",
				"beginTime",
				"endTime",
				"timeText",
				"timeType",
				"weather_",
				"data_weather_",
			].map((key) => localStorage.removeItem(`${key}${item.id}`));
		}
		if (item.type === "hotEventList") {
			localStorage.removeItem("hotEventData");
		}
		// eslint-disable-next-line
	}, [deleteContent, item.id, setLinkList]);

	const showStyle = useMemo(() => {
		return cardStyle === "onlyText"
			? {
					top: "0px",
					right: "0px",
					padding: "4px",
			  }
			: {
					top: "-8px",
					right: "-8px",
			  };
	}, [cardStyle]);

	return (
		<>
			<CloseCircleTwoTone
				onClick={() => {
					message.success(`卡片删除成功`);
					deleteCard();
				}}
				twoToneColor="red"
				className="delete-button-style"
				style={showStyle}
			/>
		</>
	);
};

export default DeleteCard;
