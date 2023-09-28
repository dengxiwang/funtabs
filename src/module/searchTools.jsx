import {
	DeleteOutlined,
	DownOutlined,
	HistoryOutlined,
	RightOutlined,
	SettingTwoTone,
	SwapOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import Device from "@skillnull/device-js";
import {
	Button,
	Checkbox,
	Col,
	Dropdown,
	Input,
	Modal,
	Popconfirm,
	Row,
	Space,
	Tooltip,
	Upload,
	message,
	theme
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import fetchJsonp from "fetch-jsonp";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { post } from "../common/fetch";
import "../common/funtabs.css";
import variable from "../common/variable";
import { IconSource } from "./iconSource";
const { useToken } = theme;
const SearchTools = (props) => {
	const { showSearch, linkOpen, edit } = props;
	const [searchEngine, setSearchEngine] = useState(() => {
		if (window.localStorage.getItem("searchEngine")) {
			return window.localStorage.getItem("searchEngine");
		} else {
			return "0";
		}
	}); //定义所选搜索引擎的key值
	const [searchContent, setSearchContent] = useState(""); //定义搜索的内容
	const [searchSuggestion, setSearchSuggestion] = useState([]);
	const [trigger] = useState("hover");
	const [showDropdown, setShowDropdown] = useState("");
	const [searchHistory] = useState([]);
	const [searchOption, setSearchOption] = useState(0);
	const { token } = useToken();

	const contentStyle = {
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};

	//定义搜索下拉菜单中的图标的样式
	const imgStyle2 = {
		width: "16px",
		height: "16px",
		marginTop: "5px",
		marginBottom: "5px",
	};

	//搜索引擎下拉菜单
	const localList = window.localStorage.getItem("searchEngineList")
		? JSON.parse(window.localStorage.getItem("searchEngineList"))
		: null;
	const defaultSearchEngineList = [
		{
			label: "必应",
			key: "0",
			link: "https://cn.bing.com/search?q=",
			icon: "/icons/bing2.svg",
			use: true,
		},
		{
			label: "谷歌",
			key: "1",
			link: "https://www.google.com/search?q=",
			icon: "/icons/google2.svg",
			use: true,
		},
		{
			label: "GitHub",
			key: "2",
			link: "https://github.com/search?q=",
			icon: "/icons/github.svg",
			use: true,
		},
		{
			label: "百度",
			key: "3",
			link: "https://www.baidu.com/s?wd=",
			icon: "/icons/baidu2.svg",
			use: true,
		},
		{
			label: "Yandex",
			key: "4",
			link: "https://yandex.com/search/?text=",
			icon: "/icons/yandex-ru.svg",
			use: true,
		},

	];
	const [searchEngineList, setSearchEngineList] = useState(() => {
		try {
			if (localList && localList.length !== 0) {
				return localList;
			} else {
				return defaultSearchEngineList;
			}
		} catch (error) {
			return defaultSearchEngineList;
		}
	});
	const [open, setOpen] = useState(false);
	const [drag, setDrag] = useState(true);
	const [searchEngineData, setSearchEngineData] = useState(
		_.cloneDeep(searchEngineList)
	);
	const [inputFocus, setInputFocus] = useState(false);

	const searchBackgroundColor = useSelector(
		(state) => state.moreSettings.searchBackgroundColor
	);
	const searchBlurOpen = useSelector(
		(state) => state.moreSettings.searchBlurOpen
	);
	const searchBlurNumber = useSelector(
		(state) => state.moreSettings.searchBlurNumber
	);
	const searchRadius = useSelector((state) => state.moreSettings.searchRadius);

	const menuStyle = {
		boxShadow: "none",
	};

	// 切换搜索引擎
	function clickSearchEngine(key) {
		setSearchEngine(key);
		saveSearchEngineToLocalStorage(key);
	}

	// 将搜索引擎存储到本地存储中
	function saveSearchEngineToLocalStorage(key) {
		window.localStorage.setItem("searchEngine", key);
	}

	const SearchOk = () => {
		function showIcon() {
			if (searchContent) {
				return "";
			} else {
				return "hidden";
			}
		}
		return (
			<>
				<RightOutlined
					className="searchButton"
					style={{
						margin: "0px 0px 0px -36px",
						zIndex: "1",
						display: "flex",
						alignItems: "center",
						visibility: showIcon(),
					}}
					onClick={() => {
						handleSearch(searchOption);
					}}
				/>
			</>
		);
	};

	// 将搜索内容添加到搜索历史记录中
	function history(data) {
		const trimmedData = data.trim();
		if (trimmedData.length !== 0) {
			// 如果搜索历史记录中已经存在与当前搜索内容相同的记录，则删除它
			const index = searchHistory.findIndex(
				(item) => item.label === trimmedData
			);
			if (index !== -1) {
				searchHistory.splice(index, 1);
			}
			// 将新的搜索内容添加到搜索历史记录的开头位置
			const newItem = {
				label: trimmedData,
				icon: <HistoryOutlined style={{ scale: "1.2" }} />,
			};
			searchHistory.unshift(newItem);
			// 如果搜索历史记录达到10条，则删除最旧的一条历史记录
			if (searchHistory.length > 10) {
				searchHistory.pop();
			}
		}
	}

	// 处理搜索操作
	function handleSearch(data) {
		if (data === 0) {
			// 判断是否为搜索操作
			if (!searchContent) {
				// 检查搜索内容是否为空
				message.error("请输入您要查询的内容");
			} else {
				history(searchContent); // 将搜索内容添加到搜索历史记录中
				const { link } = searchEngineList.find(
					(item) => item.key === searchEngine
				); // 获取当前选中的搜索引擎链接
				window.open(`${link}${encodeURIComponent(searchContent)}`, linkOpen); //在新页面打开搜索内容
			}
		}
	}

	// 获取百度搜索建议
	function getBaiduSuggestion(content) {
		const api = `https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd=${encodeURIComponent(
			content
		)}&cb=www.baidu.com`;
		fetchJsonp(api, { jsonpCallback: "cb" })
			.then((response) => response.json())
			.then((data) => {
				const result = data.g;
				// 将结果转换为与组件状态匹配的格式
				if (result.length !== 0) {
					const suggestion = result.map((item, index) => ({
						label: item.q,
						key: index,
					}));
					if (suggestion.length !== 0) {
						setSearchSuggestion(suggestion);
						setShowDropdown("");
					} else {
						setShowDropdown("none");
					}
				}
			})
			.catch((ex) => {});
	}

	// 处理搜索内容变化的操作
	function getSearchContent(e) {
		const content = e.target.value;
		setSearchContent(content);
		if (content.length !== 0) {
			const protocol = document.location.protocol;
			if (protocol === "https:" || protocol === "http:") {
				getBaiduSuggestion(content);
			} else {
				// eslint-disable-next-line
				chrome.runtime.sendMessage(
					{ todo: "fetchbaidu", searchContent: encodeURIComponent(content) },
					(res) => {
						if (res.length !== 0) {
							setSearchSuggestion(res);
							setShowDropdown("");
						} else {
							setShowDropdown("none");
						}
					}
				);
			}
		} else {
			if (searchHistory.length !== 0) {
				setSearchSuggestion(searchHistory);
			} else {
				setShowDropdown("none");
			}
		}
	}

	// 处理点击搜索建议项的操作
	const clickSuggestion = ({ key }) => {
		// 从 `key` 参数中获取索引
		const num = parseInt(key.slice(-1));
		// 使用该索引在 `searchSuggestion` 数组中查找对应的搜索建议，并将其设置为当前的搜索内容
		const { label } = searchSuggestion[num];
		setSearchContent(label);
		// 找到当前选中的搜索引擎链接，使用编码过的搜索内容作为查询参数附加到链接中，以新页面打开链接
		const { link } = searchEngineList.find((item) => item.key === searchEngine);
		window.open(`${link}${encodeURIComponent(label)}`, linkOpen);
		// 将搜索内容添加到搜索历史记录中
		history(label);
	};

	function openModal() {
		setOpen(true);
	}

	function closeModal() {
		setOpen(false);
	}

	// 处理删除搜索引擎操作
	function deleteEngine(index) {
		// 如果 `searchEngineData` 数组的长度为 1，则不允许删除并显示错误消息。
		if (searchEngineData.length === 1) {
			message.error("删除失败，至少保留一个搜索引擎～");
		} else {
			// 使用扩展运算符创建新数组并删除指定索引位置的元素
			const newData = [...searchEngineData];
			newData.splice(index, 1);
			// 更新组件状态并显示成功消息
			setSearchEngineData(newData);
			message.success("删除成功");
		}
	}

	// 处理添加搜索引擎操作
	function addSearchEngine() {
		// 如果存在空白的引擎，则不允许添加并显示错误消息。
		if (
			searchEngineData.filter((item) => item.label === "").length !== 0 ||
			searchEngineData.filter((item) => item.link === "").length !== 0
		) {
			message.error("存在空白引擎，创建失败");
		} else {
			// 生成一个唯一的键值作为新添加的搜索引擎的 `key`，然后将其添加到 `searchEngineData` 数组中
			const key = `${Date.parse(new Date())}${Math.floor(
				Math.random() * 1000
			)}`;
			const newData = [
				...searchEngineData,
				{ label: "", key, link: "", icon: "/icons/search.svg" },
			];
			// 更新组件状态
			setSearchEngineData(newData);
		}
	}

	// 处理保存搜索引擎列表操作
	function saveSearchEngine() {
		// 如果存在空白的引擎，则不允许保存并显示错误消息。
		const hasEmptyLabel = searchEngineData.some((item) => item.label === "");
		const hasEmptyLink = searchEngineData.some((item) => item.link === "");
		if (hasEmptyLabel || hasEmptyLink) {
			message.error("请填写完整搜索引擎信息");
		} else {
			// 检查是否至少保留了一个可使用的引擎，如果没有，则不允许保存并显示错误消息。
			const canUse = searchEngineData.filter((item) => item.use);
			if (canUse.length === 0) {
				message.error("至少保留一个搜索引擎可使用！");
			} else {
				// 如果当前选中的搜索引擎不在可使用的引擎列表中，则将选中的搜索引擎更改为第一个可使用的引擎，并将其存储到本地存储中。
				const firstCanUse = canUse[0];
				if (!canUse.some((item) => item.key === searchEngine)) {
					setSearchEngine(firstCanUse.key);
					window.localStorage.setItem("searchEngine", firstCanUse.key);
				}
				// 更新组件状态以及本地存储中的搜索引擎列表和选中的搜索引擎
				setSearchEngineList(searchEngineData);
				window.localStorage.setItem(
					"searchEngineList",
					JSON.stringify(searchEngineData)
				);
				setOpen(false);
				message.success("保存成功");
			}
		}
	}

	function showBackgroundColor(e) {
		return e === searchEngine ? "#00000020" : undefined;
	}

	useEffect(() => {
		window.addEventListener("setItemEvent", function (e) {
			switch (e.key) {
				case "searchEngine":
					setSearchEngine(e.newValue);
					break;
				case "searchEngineList":
					setSearchEngineList(JSON.parse(e.newValue));
					break;
				default:
					break;
			}
		});
		return window.removeEventListener("setItemEvent", function () {});
		// eslint-disable-next-line
	}, []);

	function changeNextSearchEngine() {
		const currentIndex = searchEngineList.findIndex(
			(item) => item.key === searchEngine
		);
		const nextSearchEngine = searchEngineList.find(
			(item, index) => item.use && index > currentIndex
		);
		if (nextSearchEngine) {
			clickSearchEngine(nextSearchEngine.key);
			message.success(`搜索引擎已切换为：${nextSearchEngine.label}`);
		} else {
			const availableSearchEngines = searchEngineList.filter(
				(item) => item.use
			);
			if (availableSearchEngines.length === 1) {
				message.warning("您只设置了一个可用的搜索引擎");
			} else {
				const firstSearchEngine = availableSearchEngines[0];
				clickSearchEngine(firstSearchEngine.key);
				message.success(`搜索引擎已切换为：${firstSearchEngine.label}`);
			}
		}
	}

	const deviceType = useSelector((state) => state.deviceType.type);
	const searchFontColor = useSelector(
		(state) => state.moreSettings.searchFontColor
	);
	const searchAutoFocus = useSelector(
		(state) => state.moreSettings.searchAutoFocus
	);

	return (
		<div style={{ display: showSearch, zIndex: 10 }}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "10px 0px 24px 0px",
				}}
			>
				<div
					id="searchInput"
					className={
						searchFontColor === "#000000"
							? "search-input-style-black"
							: "search-input-style-white"
					}
				>
					<Dropdown
						overlayStyle={{
							zIndex: "1",
						}}
						transitionName=""
						getPopupContainer={() => document.getElementById("searchInput")}
						placement="bottom"
						dropdownRender={() => {
							return (
								<Space
									size={0}
									direction="vertical"
									style={{
										backgroundColor: searchBackgroundColor,
										backdropFilter: searchBlurOpen
											? `blur(${searchBlurNumber}px)`
											: "none",
										WebkitBackdropFilter: searchBlurOpen
											? `blur(${searchBlurNumber}px)`
											: "none",
										width: "88px",
										borderRadius: "8px",
										padding: "4px",
										boxShadow:
											"0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
									}}
								>
									<div
										style={{
											maxHeight: "160px",
											overflow: "scroll",
										}}
									>
										{searchEngineList.map((item, index) => {
											if (item.use === true) {
												return (
													<Button
														id="search-engine"
														type="text"
														key={index}
														style={{
															width: "100%",
															display: "flex",
															alignItems: "center",
															padding: "4px 8px",
															background: showBackgroundColor(item.key),
														}}
														onClick={() => {
															message.success(
																`搜索引擎已切换为：${item.label}`
															);
															clickSearchEngine(item.key);
														}}
													>
														<img
															src={`${item.icon}`}
															style={imgStyle2}
															alt=""
														/>
														<Paragraph
															style={{
																marginBottom: "0px",
																marginLeft: "8px",
															}}
															ellipsis={
																true
																	? {
																			rows: 1,
																			tooltip: {
																				title: item.label,
																				color: "blue",
																				placement: "right",
																				getPopupContainer: () => {
																					document.getElementById(
																						"search-engine"
																					);
																				},
																			},
																	  }
																	: false
															}
														>
															{item.label}
														</Paragraph>
													</Button>
												);
											} else {
												return null;
											}
										})}
									</div>
									<Button
										type="text"
										style={{
											width: "100%",
											display: "flex",
											alignItems: "center",
											padding: "4px 8px",
										}}
										onClick={openModal}
									>
										<SettingTwoTone style={{ fontSize: "16px" }} />
										<Paragraph
											style={{
												marginBottom: "0px",
												marginLeft: "8px",
											}}
										>
											设置
										</Paragraph>
									</Button>
								</Space>
							);
						}}
					>
						<Space className="search-engine-space">
							<img
								src={
									searchEngineList.filter(
										(item) => item.key === searchEngine
									)[0].icon
								}
								style={imgStyle2}
								alt=""
							/>
							<DownOutlined />
						</Space>
					</Dropdown>
					<Dropdown
						menu={{
							items: searchSuggestion,
							onClick: clickSuggestion,
						}}
						transitionName=""
						getPopupContainer={() => document.getElementById("searchInput")}
						dropdownRender={(menu) => {
							const offsetBottom =
								window.innerHeight -
								document.getElementById("search-input").getBoundingClientRect()
									.bottom;
							return (
								<div
									style={{
										...contentStyle,
										backgroundColor: searchBackgroundColor,
										backdropFilter: searchBlurOpen
											? `blur(${searchBlurNumber}px)`
											: "none",
										WebkitBackdropFilter: searchBlurOpen
											? `blur(${searchBlurNumber}px)`
											: "none",
									}}
									className="search-suggestion-dropdown"
								>
									{React.cloneElement(menu, {
										style: {
											...menuStyle,
											maxHeight: offsetBottom - 30,
											overflow: "scroll",
											background: "none",
										},
									})}
								</div>
							);
						}}
						placement="bottom"
						overlayStyle={{
							height: "auto",
							width: "50%",
							maxWidth: "600px",
							minWidth: "320px",
							display: showDropdown,
						}}
						trigger={trigger}
					>
						<Input
							id="search-input"
							placeholder={
								inputFocus && deviceType === "PC"
									? "按下Tab键可快速切换搜索引擎"
									: edit === ""
									? "tips:双击页面可快速切换卡片分类"
									: "开发不易，如您喜欢，感谢捐赠支持！"
							}
							size="large"
							onFocusCapture={() => {
								setInputFocus(true);
							}}
							onBlurCapture={() => {
								setInputFocus(false);
							}}
							style={{
								borderRadius: `${searchRadius}px`,
								padding: "0px 52px 0px 84px",
								backgroundColor: `${searchBackgroundColor}`,
								backdropFilter: searchBlurOpen
									? `blur(${searchBlurNumber}px)`
									: "none",
								WebkitBackdropFilter: searchBlurOpen
									? `blur(${searchBlurNumber}px)`
									: "none",
							}}
							onChange={(e) => {
								getSearchContent(e);
							}}
							onPressEnter={() => {
								handleSearch(searchOption);
							}}
							onCompositionStart={() => {
								Device.Info({ info: ["browserInfo"] }).then((data) => {
									if (!data.browserInfo.startsWith("Firefox")) {
										setSearchOption(1);
									}
								});
							}}
							onCompositionEnd={() => {
								Device.Info({ info: ["browserInfo"] }).then((data) => {
									if (!data.browserInfo.startsWith("Firefox")) {
										setSearchOption(0);
									}
								});
							}}
							onKeyDown={(e) => {
								if (e.key === "Tab") {
									// 如果按下 Tab 键
									e.preventDefault(); // 阻止默认行为
									changeNextSearchEngine();
								} else if (e.key === "Escape") {
									e.preventDefault(); // 阻止默认行为
									document.getElementById("search-input").blur();
								}
							}}
							autoFocus={searchAutoFocus}
							autoComplete="off"
							allowClear
							value={searchContent}
							onMouseEnter={getSearchContent}
						/>
					</Dropdown>
					<SearchOk />
				</div>
			</div>
			{open ? (
				<Modal
					{...{
						open,
						title: "自定义搜索引擎",
						onCancel: closeModal,
						okText: "保存",
						cancelText: "取消",
						destroyOnClose: true,
						focusTriggerAfterClose: false,
						afterClose: () => {
							const localList = window.localStorage.getItem("searchEngineList")
								? JSON.parse(window.localStorage.getItem("searchEngineList"))
								: null;
							if (localList && localList.length !== 0) {
								setSearchEngineData(localList);
								setSearchEngineList(localList);
							} else {
								setSearchEngineData(defaultSearchEngineList);
								setSearchEngineList(defaultSearchEngineList);
							}
						},
						footer: (
							<Row>
								<Col>
									<Space>
										<Button type="primary" onClick={addSearchEngine}>
											新增
										</Button>
										<Popconfirm
											title="恢复至默认的搜索引擎设置？"
											onConfirm={() => {
												message.success("搜索引擎重置成功");
												setSearchEngineData(defaultSearchEngineList);
											}}
											okText="确定"
											cancelText="取消"
										>
											<Button type="primary" danger>
												重置
											</Button>
										</Popconfirm>
									</Space>
								</Col>
								<Col
									flex="auto"
									style={{ display: "flex", justifyContent: "flex-end" }}
								>
									<Space>
										<Button onClick={closeModal}>取消</Button>
										<Button type="primary" onClick={saveSearchEngine}>
											保存
										</Button>
									</Space>
								</Col>
							</Row>
						),
					}}
				>
					<p style={{ marginBottom: "12px" }}>
						例子：“ https://www.baidu.com/s?wd= ”，等号后面为您每次搜索的内容！
					</p>
					<ReactSortable
						{...{
							style: {
								maxHeight: "240px",
								overflow: "scroll",
								marginBottom: "-12px",
							},
							id: "searchEngineManager",
							key: "searchEngineManager",
							list: searchEngineData,
							setList: setSearchEngineData,
							tag: "div",
							disabled: drag,
							animation: 200,
							ghostClass: "drag-background-class",
						}}
					>
						{searchEngineData.map(({ key, use, icon, label, link }, index) => (
							<Row
								{...{
									key,
									style: { marginBottom: "12px", alignItems: "center" },
								}}
							>
								<Col
									flex="25px"
									style={{ display: "flex", alignItems: "center" }}
								>
									<Checkbox
										{...{
											checked: use,
											onChange: (e) => {
												const newData = [...searchEngineData];
												newData[index].use = e.target.checked;
												setSearchEngineData(newData);
											},
										}}
									/>
								</Col>
								<Col
									flex="25px"
									style={{ display: "flex", alignItems: "center" }}
								>
									<img
										{...{
											id: `searchEngine${key}`,
											src: `${icon}`,
											style: imgStyle2,
											alt: "",
										}}
									/>
								</Col>
								<Col flex="55px">
									<Input
										{...{
											maxLength: 10,
											value: label,
											onChange: (e) => {
												const newData = [...searchEngineData];
												newData[index].label = e.target.value.trim();
												setSearchEngineData(newData);
											},
										}}
										autoComplete="off"
									/>
								</Col>
								<Col flex="1">
									<Input
										{...{
											value: link,
											onChange: (e) => {
												const newData = [...searchEngineData];
												newData[index].link = e.target.value.trim();
												setSearchEngineData(newData);
											},
											onBlur: (e) => {
												const inputContent = e.target.value.trim();
												const domain = inputContent
													.split("/")[2]
													?.replace("www.", "");
												if (inputContent.length !== 0) {
													const newIcon = IconSource(domain)?.icon
														? IconSource(domain).icon.startsWith("http")
															? IconSource(domain).icon
															: `/icons/${IconSource(domain).icon}`
														: "/icons/search.svg";
													const newData = [...searchEngineData];
													newData[index].icon = newIcon;
													setSearchEngineData(newData);
													document.getElementById(`searchEngine${key}`).src =
														newIcon;
												}
											},
										}}
										autoComplete="off"
									/>
								</Col>
								<Col>
									<Upload
										{...{
											accept: ".png , .jpg , .jpeg , .svg , .ico",
											beforeUpload: (file) => {
												if (file.size > 102400) {
													message.error("文件大小不能超过100KB！");
													return false;
												}
												const formData = new FormData();
												formData.append("file", file);
												const token = window.localStorage.getItem("token");
												if (token) {
													post(
														`${variable.uploadFavicon}`,
														formData,
														token
													).then((res) => {
														const newData = [...searchEngineData];
														newData[index].icon = res.url;
														setSearchEngineData(newData);
														document.getElementById(`searchEngine${key}`).src =
															res.url;
													});
												} else {
													message.error("用户未登录，更换图标失败");
												}
												return false;
											},
											maxCount: 1,
											showUploadList: false,
										}}
									>
										<Tooltip title="自定义图标">
											<Button>
												<UploadOutlined />
											</Button>
										</Tooltip>
									</Upload>
									<Button
										{...{
											style: {
												cursor: "move",
											},
											onMouseEnter: () => {
												setDrag(false);
											},
											onMouseLeave: () => {
												setDrag(true);
											},
										}}
									>
										<SwapOutlined rotate={90} />
									</Button>
									<Popconfirm
										{...{
											title: "您确定删除该搜索引擎吗？",
											onConfirm: () => deleteEngine(index),
											okText: "确定",
											cancelText: "取消",
										}}
									>
										<Button danger>
											<DeleteOutlined />
										</Button>
									</Popconfirm>
								</Col>
							</Row>
						))}
					</ReactSortable>
				</Modal>
			) : null}
		</div>
	);
};

export default SearchTools;
