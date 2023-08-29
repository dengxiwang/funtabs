import { PlusCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	ColorPicker,
	Input,
	Modal,
	Row,
	Select,
	Space,
	Tabs,
	Upload,
	message
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { get, post } from "../common/fetch";
import { postClear } from "../common/fetchClear";
import "../common/funtabs.css";
import { hexToRgb } from "../common/hexToRgb";
import variable from "../common/variable";
import components from "../component/componentList";
import AddArticleCard from "./addArticleCard";
import { funtabsData } from "./data";

const imgStyle = {
	width: "auto",
	height: "100%",
	margin: "0px 10px 0px 0px",
};

//网格布局样式信息
const gridStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill,minmax(120px, 1fr))",
	columnGap: "12px",
	rowGap: "12px",
	gridAutoFlow: "dense",
};

const modalBodyStyle = {
	display: "flex",
	flexDirection: "column",
};

const AddNewCard = (props) => {
	const {
		model,
		num,
		linkList,
		setLinkList,
		tabsActiveKey,
		setTabsActiveKey,
		type,
		edit,
		cardStyle,
	} = props;
	const [isAddModalOpen, setAddIsModalOpen] = useState(false);
	const [addLinkSize, setAddLinkSize] = useState("11");
	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [ellipsis] = useState("true");
	const [color, setColor] = useState("#ffffff");
	linkList.forEach((item) => {
		Object.assign(item, { value: item.key });
	});
	const [activeTab, setActiveTab] = useState("link");
	const [articleUrl, setArticleUrl] = useState("");
	const [articleTitle, setArticleTitle] = useState("");
	const [articleContent, setArticleContent] = useState("");
	const [articleCover, setArticleCover] = useState("");

	useEffect(() => {
		return () => {
			setA("");
			setB("");
			setC("");
			setAddLinkSize("11");
			setColor("#ffffff");
			setActiveTab("link");
			setArticleUrl("");
			setArticleTitle("");
			setArticleCover("");
			setArticleContent("");
		};
	}, [isAddModalOpen]);

	const showAddModal = () => {
		setAddIsModalOpen(true);
	};

	const newCardSize = (value) => {
		if (cardStyle !== "onlyText") {
			setAddLinkSize(value);
		} else {
			message.error("文字经典模式下卡片尺寸只可为1行1列");
		}
	};

	const saveAddNewLink = (a, b, c, color, from) => {
		if (a === "" || b === "" || color === "") {
			message.error("添加卡片需填写完整信息");
		} else {
			//确保新增卡片的唯一id
			const id = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
			const addResult = {
				label: a,
				link: b,
				size: addLinkSize,
				icon: c,
				type: "link",
				backgroundColor: color,
				x: 80,
				y: 20,
				id: id,
			};
			var judgement;
			const addResultList = _.cloneDeep(linkList);
			//重复性校验
			for (let i = 0; i < linkList[num].content.length; i++) {
				if (linkList[num].content[i].link) {
					if (
						linkList[num].content[i].link.split("//")[1] === b.split("//")[1]
					) {
						judgement = true;
					}
				}
			}
			if (judgement === true) {
				message.error("这个已经添加过了哟～");
			} else {
				addResultList[num].content.push(addResult);
				setLinkList(addResultList);
				saveLinkList(addResultList);
				message.success(
					`已添加到【${
						linkList.filter((item) => item.key === tabsActiveKey)[0].label
					}】分类`
				);
				const token = localStorage.getItem("token");
				if (token) {
					saveWebInfo(a, b, c, color, token);
				}
				if (from === undefined) {
					setAddIsModalOpen(false);
				}
			}
		}
	};

	async function saveWebInfo(label, link, icon, backgroundColor, token) {
		const formData = new FormData();
		formData.append("label", label);
		formData.append("link", link);
		formData.append("icon", icon);
		formData.append("backgroundColor", backgroundColor);
		try {
			await postClear(variable.saveWebInfo, formData, token);
		} catch (error) {}
	}

	function saveArticle(url, title, content, cover) {
		if (title === "" || content === "") {
			message.error("请将标题或内容填写完整后再添加");
		} else {
			const id = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
			let addResultList;
			const addResult = {
				id: id,
				label: title,
				link: url,
				cover: cover,
				content: content,
				type: "article",
				size: cardStyle === "defaultCard" ? "21" : "22",
				x: 80,
				y: 20,
			};
			addResultList = linkList.map((item) => {
				if (item.key === tabsActiveKey) {
					return {
						...item,
						content: [...item.content, addResult],
					};
				} else {
					return item;
				}
			});
			message.success(
				`笔记已添加到【${
					linkList.filter((item) => item.key === tabsActiveKey)[0].label
				}】分类`
			);
			setAddIsModalOpen(false);
			setLinkList(addResultList);
			saveLinkList(addResultList);
		}
	}

	const cancelAdd = () => {
		setAddIsModalOpen(false);
	};

	const addComponent = (type, label) => {
		const id = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
		let addResultList;
		if (cardStyle === "onlyText") {
			if (["localWeather", "markdown", "timeProgress"].includes(type)) {
				addResultList = linkList.map((item) => {
					if (item.key === tabsActiveKey) {
						const addResult = {
							label: label,
							type: type,
							id: id,
							x: 80,
							y: 20,
							content: [],
							size: "21",
						};
						return {
							...item,
							content: [...item.content, addResult],
						};
					} else {
						return item;
					}
				});
				message.success(
					`已添加到【${
						linkList.filter((item) => item.key === tabsActiveKey)[0].label
					}】分类`
				);
			} else {
				message.error("文字经典模式下不支持添加该组件");
				return;
			}
		} else {
			addResultList = linkList.map((item) => {
				if (item.key === tabsActiveKey) {
					const addResult = {
						label: label,
						type: type,
						id: id,
						x: 80,
						y: 20,
						content: [],
						size: "21",
					};
					return {
						...item,
						content: [...item.content, addResult],
					};
				} else {
					return item;
				}
			});
			message.success(
				`已添加到【${
					linkList.filter((item) => item.key === tabsActiveKey)[0].label
				}】分类`
			);
		}
		setLinkList(addResultList);
		saveLinkList(addResultList);
	};

	function saveLinkList(addResultList) {
		if (type === 1 && edit === "none") {
			var newData; //本地存储数据是newData
			//如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
			const localData = JSON.parse(window.localStorage.getItem("funtabs"));
			if (localData) {
				newData = localData.newData;
			} else {
				newData = funtabsData;
			}
			newData.content = addResultList;
			//存储到本地
			window.localStorage.setItem("funtabs", JSON.stringify({ newData }));
			window.localStorage.setItem("saveTime", Date.now());
		}
	}

	function showMore() {
		return (
			<div>
				<Select
					defaultValue={tabsActiveKey}
					style={{
						width: 120,
					}}
					onChange={(e) => {
						setTabsActiveKey(e.key);
						localStorage.setItem("activeKey", e.key);
					}}
					labelInValue
					options={linkList}
				/>
			</div>
		);
	}

	function showFooter() {
		if (activeTab === "link" || activeTab === "article") {
			return (
				<div
					className="input-div"
					style={{ marginBottom: "0px", justifyContent: " flex-end" }}
				>
					<Space>
						<Button onClick={cancelAdd}>取消</Button>
						<Button
							type="primary"
							onClick={() => {
								return activeTab === "link"
									? saveAddNewLink(a, b, c, color)
									: saveArticle(
											articleUrl,
											articleTitle,
											articleContent,
											articleCover
									  );
							}}
						>
							添加
						</Button>
					</Space>
				</div>
			);
		} else {
			return null;
		}
	}

	function showHeight() {
		if (activeTab === "link" || activeTab === "article") {
			return "328px";
		} else {
			return "372px";
		}
	}

	function showType() {
		if (type === 1) {
			return <p onClick={showAddModal}>新增卡片</p>;
		} else {
			return (
				<Button
					type="primary"
					style={{
						color: "#fff",
						display: model,
					}}
					onClick={showAddModal}
				>
					新增卡片
				</Button>
			);
		}
	}

	function getWebInfo() {
		var domain = b.split("/"); //以“/”进行分割
		if (domain[2]) {
			domain = domain[2];
			if (domain.substring(0, 4) === "www.") {
				domain = domain.slice(4);
			}
		} else {
			domain = ""; //如果url不正确就取空
		}
		if (domain) {
			get(`${variable.webTitle + b}`)
				.then((res) => {
					if (typeof res !== "object" && res) {
						setA(res);
					}
				})
				.catch((error) => {
					message.error("无法获取该网站标题，请自行设置");
				});
			get(`${variable.favicon + b}`)
				.then((res) => {
					if (typeof res === "object" && res && res.icon) {
						setC(res.icon);
						if (res.backgroundColor) {
							setColor(res.backgroundColor);
						}
					}
				})
				.catch((error) => {
					message.error("无法获取该网站图标，请自行设置");
				});
		}
	}

	return (
		<>
			{showType()}
			{isAddModalOpen ? (
				<Modal
					title={
						<Space>
							<p style={{ fontSize: "16px" }}>新增卡片</p>
						</Space>
					}
					focusTriggerAfterClose={false}
					open={isAddModalOpen}
					onCancel={cancelAdd}
					footer={showFooter()}
					bodyStyle={modalBodyStyle}
					destroyOnClose
				>
					<Tabs
						onChange={(e) => {
							setActiveTab(e);
						}}
						defaultActiveKey={activeTab}
						style={{ height: showHeight(), overflow: "hidden" }}
						tabBarExtraContent={showMore()}
						items={[
							{
								label: `网址导航`,
								key: "link",
								children: (
									<>
										<Row className="input-div">
											<Col flex="72px">网站地址：</Col>
											<Col flex="1">
												<Input
													autoComplete="off"
													onChange={(e) => {
														let result = e.target.value.trim();
														if (result) {
															var result2;
															if (result.substring(0, 7) === "http://") {
																result2 = result;
															} else if (
																result.substring(0, 8) === "https://"
															) {
																result2 = result;
															} else {
																result2 = "http://".concat(result);
															}
															setB(result2);
														} else {
															setB("");
														}
													}}
													placeholder="不需要http://或https://"
													allowClear
												/>
											</Col>
											<Col>
												<Button onClick={getWebInfo} disabled={!b}>
													获取网站信息
												</Button>
											</Col>
										</Row>
										<Row className="input-div">
											<Col flex="72px">卡片名称：</Col>
											<Col flex="1">
												<Input
													value={a}
													autoComplete="off"
													onChange={(e) => {
														setA(e.target.value);
													}}
													allowClear
													placeholder="在此输入卡片名称"
												/>
											</Col>
										</Row>
										<Row className="input-div">
											<Space wrap size={2}>
												<Col flex="72px">卡片大小：</Col>
												<Col>
													<Select
														defaultValue={"11"}
														onChange={newCardSize}
														style={{
															marginRight: "12px",
															width: 100,
														}}
														options={[
															{
																value: "11",
																label: "1行1列",
															},
															{
																value: "12",
																label: "1行2列",
															},
															{
																value: "21",
																label: "2行1列",
															},
															{
																value: "22",
																label: "2行2列",
															},
														]}
													/>
												</Col>
												<Col flex="72px">背景颜色：</Col>
												<Col>
													<div
														style={{ display: "flex", flexDirection: "row" }}
													>
														<Input
															autoComplete="off"
															style={{ width: "88px", textAlign: "center" }}
															value={color}
															onChange={(e) => setColor(e.target.value)}
														/>
														<ColorPicker
															trigger="hover"
															value={color}
															onChange={(e) => {
																setColor(e.toHexString());
															}}
														/>
													</div>
												</Col>
											</Space>
										</Row>
										<Row className="input-div">
											<Col flex="72px">图标地址：</Col>
											<Col flex="1">
												<Input
													id="addIcon"
													autoComplete="off"
													value={c}
													onChange={(e) => {
														setC(e.target.value);
													}}
													allowClear
													placeholder="图标地址常为网站域名后加上“/favicon.ico”"
												/>
											</Col>
											<Col flex="46px">
												<Upload
													accept=".png , .jpg , .jpeg , .svg , .ico"
													beforeUpload={(file) => {
														if (file.size > 102400) {
															message.error("文件大小不能超过100KB！");
															return false;
														}
														// var reader = new FileReader();
														// reader.readAsDataURL(file);
														// reader.onloadend = function () {
														//     setC(reader.result)
														// }
														const formData = new FormData();
														formData.append("file", file);
														const token = window.localStorage.getItem("token");
														if (token) {
															post(
																`${variable.uploadFavicon}`,
																formData,
																token
															).then((res) => {
																setC(res.url);
															});
														} else {
															message.error("用户未登录，更换图标失败");
														}
														return false;
													}}
													maxCount={1}
													showUploadList={false}
												>
													<Button>
														<UploadOutlined />
													</Button>
												</Upload>
											</Col>
										</Row>
										<Row className="input-div" style={{ marginBottom: "0px" }}>
											<Col flex="72px">卡片预览：</Col>
											<Col flex="200px">
												<div
													style={{
														position: "relative",
														width: "156px",
														height: "66px",
														background: "rgb(245, 245, 245)",
														padding: "10px",
													}}
												>
													<div
														style={{
															overflow: "hidden",
															position: "relative",
															borderRadius: `10px`,
															display: "flex",
															width: "calc(100% - 20px)",
															height: "calc(100% - 20px)",
															padding: "10px",
															background: color,
														}}
													>
														<img style={imgStyle} src={c} alt=""></img>
														<div
															style={{
																display: "flex",
																marginBottom: "-14px",
																alignItems: "center",
															}}
														>
															<Paragraph
																style={{
																	fontWeight: "bold",
																	color: hexToRgb(color),
																}}
																ellipsis={
																	ellipsis
																		? {
																				rows: 2,
																		  }
																		: false
																}
															>
																{a}
															</Paragraph>
														</div>
														<img
															src={c}
															alt=""
															style={{
																position: "absolute",
																height: "100%",
																top: "0px",
																right: "-10px",
																opacity: 0.1,
																transform: "rotate(-30deg)",
															}}
														></img>
													</div>
												</div>
											</Col>
										</Row>
									</>
								),
							},
							{
								label: "笔记收藏",
								key: "article",
								children: (
									<AddArticleCard
										articleTitle={articleTitle}
										setArticleTitle={setArticleTitle}
										articleContent={articleContent}
										setArticleContent={setArticleContent}
										articleUrl={articleUrl}
										setArticleUrl={setArticleUrl}
										articleCover={articleCover}
										setArticleCover={setArticleCover}
									/>
								),
							},
							{
								label: "小组件",
								key: "components",
								children: (
									<div style={gridStyle}>
										{components.map((item, index) => {
											return (
												<div
													key={index}
													style={{
														display: "flex",
														flexDirection: "column",
														height: "100px",
														padding: "12px 0px",
														border: "1px solid #f3f3f3",
														alignItems: "center",
														backgroundColor: "#f0f0f0",
														borderRadius: "8px",
														position: "relative",
													}}
												>
													<img
														className=""
														alt="funtabs｜趣标签页，给你不一样的浏览器起始页"
														src={item.img}
														style={{
															width: "auto",
															height: "76px",
														}}
													/>
													<Space
														style={{
															display: "flex",
															margin: "8px 4px",
														}}
													>
														<p
															style={{
																fontSize: "14px",
																fontWeight: "bold",
															}}
														>
															{item.label}
														</p>
														<PlusCircleTwoTone
															style={{
																scale: "1.25",
															}}
															onClick={() => {
																addComponent(item.type, item.label);
															}}
														/>
													</Space>
												</div>
											);
										})}
									</div>
								),
							},
							// {
							// 	label: "热门推荐",
							// 	key: "recommend",
							// 	children: <RecommendAddList saveAddNewLink={saveAddNewLink} />,
							// },
						]}
					/>
				</Modal>
			) : null}
		</>
	);
};

export default AddNewCard;
