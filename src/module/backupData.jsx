import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Input,
	Modal,
	Radio,
	Row,
	Space,
	Upload,
	message,
} from "antd";
import beautify from "js-beautify";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import getLocalData from "../common/getLocalData";
import transformToBookmarks from "../common/transformToBookmarks";

const { TextArea } = Input;

function BackupData() {
	const [data2, setData2] = useState();
	const [backupData, setBackupData] = useState("");
	const [backupModal, setBackupModal] = useState(false);
	const [check, setCheck] = useState("all");
	const [styleCheck, setStyleCheck] = useState("txt");

	const getLocalStorage = useCallback(async () => {
		const data = await getLocalData();
		setData2(data);
	}, []);

	useEffect(() => {
		if (backupModal) {
			setBackupData("");
			setCheck("all");
			setStyleCheck("txt");
			setTimeout(() => {
				getLocalStorage();
			}, 500);
		}
		return setData2();
		// eslint-disable-next-line
	}, [backupModal]);

	const saveFile = useCallback(
		(text) => {
			if (text) {
				let formattedText = text;
				if (styleCheck === "html") {
					formattedText = beautify.html(text.replace(/\\/g, ""), {
						indent_size: 2,
					});
				}
				const blob = new Blob([formattedText], {
					type: "text/html;charset=utf-8",
				});
				const objectURL = URL.createObjectURL(blob);
				const aTag = document.createElement("a");
				aTag.href = objectURL;
				aTag.download = `funtabs趣标签页备份数据${new Date().toISOString()}.${styleCheck}`;
				aTag.click();
				URL.revokeObjectURL(objectURL);
				message.success("数据导出本地成功，请妥善保存！");
			} else {
				message.error("导出数据为空！");
			}
		},
		[styleCheck]
	);

	const analysisData = useCallback((e) => {
		const content = e.target.value;
		if (content !== "") {
			try {
				const content2 = JSON.parse(content);
				if (typeof content2 === "number") {
					message.error("数据格式错误，解析失败！");
				}
			} catch (e) {
				message.error("数据格式错误，解析失败！");
			}
		}
	}, []);

	const restoreLocalStorage = useCallback((data) => {
		const token = window.localStorage.getItem("token");
		window.localStorage.clear();
		Object.entries(data).forEach(([key, value]) => {
			if (
				key.startsWith("time") ||
				key.startsWith("note") ||
				key.startsWith("begin") ||
				key.startsWith("end") ||
				key.startsWith("hotEvent") ||
				key.startsWith("weather_") ||
				key === "token" ||
				key === "brightness" ||
				key === "funtabs" ||
				key === "showClock" ||
				key === "activeKey" ||
				key === "wallpaperType" ||
				key === "fontColor" ||
				key === "linkOpen" ||
				key === "paddingTop" ||
				key === "boxShadow" ||
				key === "backgroundImage" ||
				key === "blur" ||
				key === "model" ||
				key === "noticeOpen" ||
				key === "boxShadowOpen" ||
				key === "showSearch" ||
				key === "webTitle" ||
				key === "searchEngine" ||
				key === "searchEngineList" ||
				key === "localHotEventColor" ||
				key === "timeArea" ||
				key === "logoUrl" ||
				key === "saveTime" ||
				key === "clockAreaHeight" ||
				key === "showSettings" ||
				key === "searchBackgroundColor" ||
				key === "searchBlurOpen" ||
				key === "searchBlurNumber" ||
				key === "searchRadius" ||
				key === "searchFontColor" ||
				key === "timeSeconds" ||
				key === "searchAutoFocus"
			) {
				window.localStorage.setItem(key, value);
			}
		});
		if (token) {
			window.localStorage.setItem("token", token);
		}
	}, []);

	const save = useCallback(() => {
		if (backupData !== "") {
			try {
				const data = JSON.parse(backupData, (key, value) => {
					if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(value)) {
						return new Date(value);
					}
					return value;
				});
				if (typeof data === "number") {
					message.error("保存失败！");
				} else {
					restoreLocalStorage(data);
					message.success("保存成功");
					setBackupModal(false);
				}
			} catch (e) {
				message.error("数据格式错误，保存失败！");
			}
		} else {
			message.error("恢复数据未填写，保存失败～");
		}
	}, [backupData, restoreLocalStorage]);

	const options = useMemo(
		() => [
			{ label: "全部", value: "all" },
			{ label: "布局卡片", value: "card" },
		],
		[]
	);

	const fileType = useMemo(
		() => [
			{ label: "文本（.txt）", value: "txt" },
			{ label: "浏览器书签（.html)", value: "html" },
		],
		[]
	);

	const getCardData = useCallback(async () => {
		const cardData = {};
		const linkList = await localStorage.getItem("funtabs");
		cardData["funtabs"] = linkList;
		return cardData;
	}, []);

	const changeCheck = useCallback(
		async (e) => {
			setCheck(e.target.value);
			const type = e.target.value;
			if (type === "card") {
				const cardData = await getCardData();
				setData2(cardData);
			} else {
				setStyleCheck("txt");
				getLocalStorage();
			}
		},
		[getCardData, getLocalStorage]
	);

	const changeCheck2 = useCallback(
		async (e) => {
			setStyleCheck(e.target.value);
			const type = e.target.value;
			if (type === "html") {
				const localFuntabsData = JSON.parse(localStorage.getItem("funtabs"));

				if (localFuntabsData ) {
					setCheck("card");
					const content = localFuntabsData.newData.content;
					const newContent = [...content];
					for (let i = 0; i < newContent.length; i++) {
						newContent[i].type = "folder";
					}
					const newStr = transformToBookmarks(newContent);
					setData2(newStr);
				} else {
					message.error("未保存个性编辑内容，将无法导出浏览器书签样式");
					setStyleCheck("txt");
				}
			} else {
				if (check === "card") {
					const cardData = await getCardData();
					setData2(cardData);
				} else {
					getLocalStorage();
				}
			}
		},
		[check, getCardData, getLocalStorage]
	);

	return (
		<>
			<p onClick={() => setBackupModal(true)}>备份/恢复数据</p>
			<Modal
				title="备份/恢复数据"
				open={backupModal}
				onCancel={() => setBackupModal(false)}
				okText="确认导入"
				cancelText="取消"
				onOk={save}
				focusTriggerAfterClose={false}
				destroyOnClose
			>
				<Row style={{ margin: "12px 0px", alignItems: "center" }}>
					<Col flex="78px">导出数据：</Col>
					<Col flex="1">
						<TextArea rows={1} value={JSON.stringify(data2)} />
					</Col>
					<Col>
						<Button
							style={{ width: "80px" }}
							icon={<DownloadOutlined />}
							onClick={() => {
								saveFile(JSON.stringify(data2));
							}}
						>
							导出
						</Button>
					</Col>
				</Row>
				<Row style={{ alignItems: "center" }}>
					<Col flex="78px">导入数据：</Col>
					<Col flex="1">
						<Input
							value={backupData}
							autoComplete="off"
							onChange={(e) => setBackupData(e.target.value)}
							onBlur={analysisData}
						/>
					</Col>
					<Col>
						<Upload
							accept=".txt"
							showUploadList={false}
							maxCount={1}
							beforeUpload={(file) => {
								var reader = new FileReader();
								reader.readAsText(file);
								reader.onloadend = function () {
									setBackupData(reader.result);
									message.success("导入成功");
								};
								return false;
							}}
						>
							<Button style={{ width: "80px" }} icon={<UploadOutlined />}>
								导入
							</Button>
						</Upload>
					</Col>
				</Row>
				<Space style={{ padding: "16px 0px 0px 0px" }} wrap size={0}>
					<p style={{ width: "78px" }}>导出范围：</p>
					<Radio.Group
						options={options}
						onChange={changeCheck}
						value={check}
						optionType="default"
					/>
				</Space>
				<Space style={{ padding: "18px 0px 0px 0px" }} wrap size={0}>
					<p style={{ width: "78px" }}>导出格式：</p>
					<Radio.Group
						options={fileType}
						onChange={changeCheck2}
						value={styleCheck}
						optionType="txt"
					/>
				</Space>
			</Modal>
		</>
	);
}

export default BackupData;
