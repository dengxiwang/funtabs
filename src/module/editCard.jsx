import { SettingTwoTone, UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	ColorPicker,
	Input,
	Modal,
	Row,
	Select,
	Space,
	Upload,
	message,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { get, post } from "../common/fetch";
import { postClear } from "../common/fetchClear";
import { hexToRgb } from "../common/hexToRgb";
import variable from "../common/variable";

const imgStyle = {
	width: "auto",
	height: "100%",
	margin: "0px 10px 0px 0px",
};

const EditCard = (props) => {
	const {
		id,
		linkList,
		num,
		setLinkList,
		setBackgroundColor,
		setDisabled,
		cardStyle,
	} = props;

	const [link, setLink] = useState(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				try {
					return linkList[num].content[id].link;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].link;
				} catch (error) {
					return "";
				}
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				try {
					return linkList[0].content[id].link;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].link;
				} catch (error) {
					return "";
				}
			}
		}
	});
	const [label, setLabel] = useState(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				try {
					return linkList[num].content[id].label;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].label;
				} catch (error) {
					return "";
				}
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				try {
					return linkList[0].content[id].label;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].label;
				} catch (error) {
					return "";
				}
			}
		}
	});
	const [icon, setIcon] = useState(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				try {
					return linkList[num].content[id].icon;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].icon;
				} catch (error) {
					return "";
				}
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				try {
					return linkList[0].content[id].icon;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].icon;
				} catch (error) {
					return "";
				}
			}
		}
	});
	const [size, setSize] = useState(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				try {
					return linkList[num].content[id].size;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].size;
				} catch (error) {
					return "";
				}
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				try {
					return linkList[0].content[id].size;
				} catch (error) {
					return "";
				}
			} else {
				try {
					return linkList[id].size;
				} catch (error) {
					return "";
				}
			}
		}
	});
	const [color, setColor] = useState(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				try {
					if (linkList[num].content[id].backgroundColor) {
						return linkList[num].content[id].backgroundColor;
					} else {
						return "#ffffff";
					}
				} catch (error) {
					return "";
				}
			} else {
				try {
					if (linkList[id].backgroundColor) {
						return linkList[id].backgroundColor;
					} else {
						return "#ffffff";
					}
				} catch (error) {
					return "";
				}
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				try {
					if (linkList[0].content[id].backgroundColor) {
						return linkList[0].content[id].backgroundColor;
					} else {
						return "#ffffff";
					}
				} catch (error) {
					return "";
				}
			} else {
				try {
					if (linkList[id].backgroundColor) {
						return linkList[id].backgroundColor;
					} else {
						return "#ffffff";
					}
				} catch (error) {
					return "";
				}
			}
		}
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [ellipsis] = useState("true");

	useEffect(() => {
		if (linkList[num]) {
			if (
				linkList[num].content &&
				(!linkList[num].type || linkList[num].type === "folder")
			) {
				setLink(() => {
					try {
						return linkList[num].content[id].link;
					} catch (error) {
						return "";
					}
				});
				setLabel(() => {
					try {
						return linkList[num].content[id].label;
					} catch (error) {
						return "";
					}
				});
				setIcon(() => {
					try {
						return linkList[num].content[id].icon;
					} catch (error) {
						return "";
					}
				});
				setSize(() => {
					try {
						return linkList[num].content[id].size;
					} catch (error) {
						return "";
					}
				});
				setColor(() => {
					try {
						if (linkList[num].content[id].backgroundColor) {
							return linkList[num].content[id].backgroundColor;
						} else {
							return "#ffffff";
						}
					} catch (error) {
						return "";
					}
				});
			} else {
				setLink(() => {
					try {
						return linkList[id].link;
					} catch (error) {
						return "";
					}
				});
				setLabel(() => {
					try {
						return linkList[id].label;
					} catch (error) {
						return "";
					}
				});
				setIcon(() => {
					try {
						return linkList[id].icon;
					} catch (error) {
						return "";
					}
				});
				setSize(() => {
					try {
						return linkList[id].size;
					} catch (error) {
						return "";
					}
				});
				setColor(() => {
					try {
						if (linkList[id].backgroundColor) {
							return linkList[id].backgroundColor;
						} else {
							return "#ffffff";
						}
					} catch (error) {
						return "";
					}
				});
			}
		} else {
			if (
				linkList[0].content &&
				(!linkList[0].type || linkList[0].type === "folder")
			) {
				setLink(() => {
					try {
						return linkList[0].content[id].link;
					} catch (error) {
						return "";
					}
				});
				setLabel(() => {
					try {
						return linkList[0].content[id].label;
					} catch (error) {
						return "";
					}
				});
				setIcon(() => {
					try {
						return linkList[0].content[id].icon;
					} catch (error) {
						return "";
					}
				});
				setSize(() => {
					try {
						return linkList[0].content[id].size;
					} catch (error) {
						return "";
					}
				});
				setColor(() => {
					try {
						if (linkList[0].content[id].backgroundColor) {
							return linkList[0].content[id].backgroundColor;
						} else {
							return "#ffffff";
						}
					} catch (error) {
						return "";
					}
				});
			} else {
				setLink(() => {
					try {
						return linkList[id].link;
					} catch (error) {
						return "";
					}
				});
				setLabel(() => {
					try {
						return linkList[id].label;
					} catch (error) {
						return "";
					}
				});
				setIcon(() => {
					try {
						return linkList[id].icon;
					} catch (error) {
						return "";
					}
				});
				setSize(() => {
					try {
						return linkList[id].size;
					} catch (error) {
						return "";
					}
				});
				setColor(() => {
					try {
						if (linkList[id].backgroundColor) {
							return linkList[id].backgroundColor;
						} else {
							return "#ffffff";
						}
					} catch (error) {
						return "";
					}
				});
			}
		}
		// eslint-disable-next-line
	}, [isModalOpen]);

	const showEditModal = () => {
		if (setDisabled) {
			setDisabled(true);
		}
		setIsModalOpen(true);
	};

	const cancelEditModal = () => {
		if (setDisabled) {
			setDisabled(false);
		}
		setIsModalOpen(false);
	};

	function saveEdit() {
		if (setDisabled) {
			setDisabled(false);
		}
		if (!label || !link || !size || !color) {
			message.error("卡片信息缺少");
			return;
		}
		message.success("编辑成功");
		let editResult = {
			label: label,
			link: link,
			size: size,
			icon: icon,
			type: "link",
			backgroundColor: color,
		};
		const editList = _.cloneDeep(linkList);
		if (
			linkList[num].content &&
			(!linkList[num].type || linkList[num].type === "folder")
		) {
			editResult.x = editList[num].content[id].x;
			editResult.y = editList[num].content[id].y;
			editList[num].content.splice(id, 1, editResult);
		} else {
			editResult.x = editList[id].x;
			editResult.y = editList[id].y;
			editList.splice(id, 1, editResult);
		}
		setLinkList(editList);
		setBackgroundColor(color);
		const token = window.localStorage.getItem("token");
		if (token) {
			saveWebInfo(label, link, icon, color, token);
		}
		setIsModalOpen(false);
	}

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

	function showSettingsButton() {
		if (cardStyle === "onlyText") {
			return (
				<>
					<SettingTwoTone
						className="edit-button-style2"
						onClick={showEditModal}
					/>
				</>
			);
		} else {
			return (
				<SettingTwoTone className="edit-button-style" onClick={showEditModal} />
			);
		}
	}

	function getWebInfo() {
		var domain = link.split("/"); //以“/”进行分割
		if (domain[2]) {
			domain = domain[2];
			if (domain.substring(0, 4) === "www.") {
				domain = domain.slice(4);
			}
		} else {
			domain = ""; //如果url不正确就取空
		}
		if (domain) {
			get(`${variable.webTitle + link}`)
				.then((res) => {
					if (typeof res !== "object" && res) {
						setLabel(res);
					}
				})
				.catch((error) => {
					message.error("无法获取该网站标题，请自行设置");
				});
			get(`${variable.favicon + link}`)
				.then((res) => {
					if (typeof res === "object" && res && res.icon) {
						setIcon(res.icon);
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
			{showSettingsButton()}
			{isModalOpen ? (
				<Modal
					title="编辑卡片"
					open={isModalOpen}
					onOk={saveEdit}
					onCancel={cancelEditModal}
					okText="确定"
					cancelText="取消"
					destroyOnClose
					focusTriggerAfterClose={false}
				>
					<Row className="input-div">
						<Col flex="72px">链接地址：</Col>
						<Col flex="1">
							<Input
								defaultValue={link}
								autoComplete="off"
								onChange={(e) => {
									let result = e.target.value.trim();
									if (result) {
										var result2;
										if (result.substring(0, 7) === "http://") {
											result2 = result;
										} else if (result.substring(0, 8) === "https://") {
											result2 = result;
										} else {
											result2 = "http://".concat(result);
										}
										setLink(result2);
									} else {
										setLink("");
									}
								}}
								placeholder="不需要http://或https://"
							/>
						</Col>
						<Col>
							<Button onClick={getWebInfo} disabled={!link}>
								获取网站信息
							</Button>
						</Col>
					</Row>
					<Row className="input-div">
						<Col flex="72px">卡片名称：</Col>
						<Col flex="1">
							<Input
								value={label}
								autoComplete="off"
								onChange={(e) => {
									setLabel(e.target.value);
								}}
								placeholder="输入链接后自动获取卡片名称"
							/>
						</Col>
					</Row>
					<Row className="input-div">
						<Space wrap size={2}>
							<Col flex="72px">卡片大小：</Col>
							<Col>
								<Select
									id="addSize"
									defaultValue={size}
									onChange={(e) => {
										setSize(e);
									}}
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
								<div style={{ display: "flex", flexDirection: "row" }}>
									<Input
										style={{ width: "88px", textAlign: "center" }}
										value={color}
										autoComplete="off"
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
								value={icon}
								autoComplete="off"
								onChange={(e) => {
									setIcon(e.target.value);
								}}
								placeholder="图标地址常为网站域名后加上“/favicon.ico”"
							/>
						</Col>
						<Col flex="46px">
							<Upload
								accept=".png , .jpg , .jpeg , .svg , ico"
								beforeUpload={(file) => {
									// var reader = new FileReader();
									// reader.readAsDataURL(file);
									// reader.onloadend = function () {
									//     setIcon(reader.result)
									// }
									if (file.size > 102400) {
										message.error("文件大小不能超过100KB！");
										return false;
									}
									const formData = new FormData();
									formData.append("file", file);
									const token = window.localStorage.getItem("token");
									if (token) {
										post(`${variable.uploadFavicon}`, formData, token).then(
											(res) => {
												setIcon(res.url);
											}
										);
									} else {
										message.error("用户未登录，更换图标失败");
									}
									return false;
								}}
								showUploadList={false}
								maxCount={1}
							>
								<Button>
									<UploadOutlined />
								</Button>
							</Upload>
						</Col>
					</Row>
					<Row className="input-div">
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
									<img style={imgStyle} src={icon} alt=""></img>
									<div
										style={{
											display: "flex",
											marginBottom: "-14px",
											alignItems: "center",
										}}
									>
										<Paragraph
											style={{ fontWeight: "bold", color: hexToRgb(color) }}
											ellipsis={
												ellipsis
													? {
															rows: 2,
													  }
													: false
											}
										>
											{label}
										</Paragraph>
									</div>
									<img
										src={icon}
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
				</Modal>
			) : null}
		</>
	);
};

export default EditCard;
