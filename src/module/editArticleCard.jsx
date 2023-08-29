import { SettingTwoTone, UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Empty,
	Image,
	Input,
	Modal,
	Row,
	Select,
	Upload,
	message,
} from "antd";
import ImgCrop from "antd-img-crop";
import _ from "lodash";
import { useEffect, useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { get, post } from "../common/fetch";
import variable from "../common/variable";

const options = [
	{ label: "1行1列", value: "11" },
	{ label: "2行1列", value: "21" },
	{ label: "2行2列", value: "22" },
	{ label: "3行1列", value: "31" },
	{ label: "3行2列", value: "32" },
	{ label: "3行3列", value: "33" },
];

function EditArticleCard(props) {
	const { id, item, num, linkList, setLinkList, setDisabled } = props;
	const [modalOpen, setModalOpen] = useState(false);
	const [articleUrl, setArticleUrl] = useState("");
	const [articleTitle, setArticleTitle] = useState("");
	const [articleContent, setArticleContent] = useState("");
	const [articleCover, setArticleCover] = useState("");
	const [size, setSize] = useState("");

	useEffect(() => {
		setArticleUrl(item.link);
		setArticleTitle(item.label);
		setArticleContent(item.content);
		setArticleCover(item.cover);
		setSize(item.size);
		// eslint-disable-next-line
	}, [modalOpen]);

	function saveEditArticle() {
		if (setDisabled) {
			setDisabled(false);
		}
		const editList = _.cloneDeep(linkList);
		let editResult = {
			label: articleTitle,
			link: articleUrl,
			content: articleContent,
			cover: articleCover,
			size: size,
			type: "article",
			x: item.x ? item.x : 80,
			y: item.y ? item.y : 20,
		};
		editList[num].content.splice(id, 1, editResult);

		setLinkList(editList);
		setModalOpen(false);
	}

	function showEditModal() {
		if (setDisabled) {
			setDisabled(true);
		}
		setModalOpen(true);
	}

	function showSettingsButton() {
		return (
			<SettingTwoTone className="edit-button-style" onClick={showEditModal} />
		);
	}

	function getArticleContent() {
		if (articleUrl) {
			get(variable.getArticleContent + articleUrl).then((res) => {
				if (res) {
					setArticleTitle(res.title.trim());
					setArticleContent(res.content.trim());
					setArticleCover(res.cover.trim());
				} else {
					message.error("自动获取笔记内容失败");
				}
			});
		}
	}

	const handleArticleUrlChange = (e) => {
		setArticleUrl(e.target.value);
	};

	const handleArticleTitleChange = (e) => {
		setArticleTitle(e.target.value);
	};

	const handleArticleContentChange = (newContent) => {
		setArticleContent(newContent);
	};

	const handleSizeChange = (newSize) => {
		setSize(newSize);
	};

	const handleArticleCoverChange = (e) => {
		setArticleCover(e.target.value);
	};

	const handleImageUpload = (file) => {
		if (file.size / 1024 / 1024 > 5) {
			message.error("文件大小不能超过 5MB！");
			return false;
		}
		const formData = new FormData();
		formData.append("file", file);
		const token = window.localStorage.getItem("token");
		if (token) {
			post(`${variable.uploadImages}`, formData, token).then((res) => {
				setArticleCover(res.url);
			});
		} else {
			message.error("用户未登录，上传封面图失败");
		}
		return false;
	};

	return (
		<>
			{showSettingsButton()}
			{modalOpen ? (
				<Modal
					title="编辑笔记"
					centered
					open={modalOpen}
					bodyStyle={{
						maxHeight: "80vh",
						overflow: "scroll",
					}}
					style={{
						maxWidth: "677px",
						padding: "12px",
					}}
					width={"100%"}
					destroyOnClose={true}
					onCancel={() => {
						if (setDisabled) {
							setDisabled(false);
						}
						setModalOpen(false);
					}}
					okText="保存"
					cancelText="取消"
					onOk={saveEditArticle}
					focusTriggerAfterClose={false}
				>
					<Row className="input-div">
						<Col flex="72px">笔记地址：</Col>
						<Col flex="1">
							<Input
								placeholder="输入笔记地址获取内容（非必填）"
								value={articleUrl}
								autoComplete="off"
								onChange={handleArticleUrlChange}
								allowClear
							/>
						</Col>
						<Col>
							<Button onClick={getArticleContent} disabled={!articleUrl}>
								获取文章信息
							</Button>
						</Col>
					</Row>
					<Row className="input-div">
						<Col flex="72px">笔记标题</Col>
						<Col flex="1">
							<Input
								value={articleTitle}
								autoComplete="off"
								placeholder="请输入笔记标题"
								onChange={handleArticleTitleChange}
								allowClear
							/>
						</Col>
					</Row>
					<Row className="input-div" style={{ alignItems: "flex-start" }}>
						<Col flex="72px" style={{ marginTop: "4px" }}>
							笔记内容：
						</Col>
						<Col flex="1">
							<ReactMde
								value={articleContent}
								onChange={handleArticleContentChange}
								disablePreview={true}
							/>
						</Col>
					</Row>
					<Row className="input-div" style={{ alignItems: "flex-start" }}>
						<Col flex="72px" style={{ marginTop: "4px" }}>
							卡片大小：
						</Col>
						<Col flex="1">
							<Select
								value={size}
								onChange={handleSizeChange}
								style={{ width: "100px" }}
								options={options}
							/>
						</Col>
					</Row>
					<Row
						className="input-div"
						style={{ alignItems: "baseline", marginTop: "16px" }}
					>
						<Col flex="72px">笔记封面：</Col>
						<Col flex="1">
							<div style={{ display: "flex" }}>
								<Input
									autoComplete="off"
									value={articleCover}
									onChange={handleArticleCoverChange}
									placeholder="请输入封面图地址或上传图片"
									allowClear
								/>
								<ImgCrop
									quality={0.1}
									rotationSlider
									modalTitle="裁剪图片"
									modalOk="确定"
									modalCancel="取消"
								>
									<Upload
										accept=".png , .jpg , .jpeg "
										maxCount={1}
										beforeUpload={handleImageUpload}
										showUploadList={false}
									>
										<Button>
											<UploadOutlined />
										</Button>
									</Upload>
								</ImgCrop>
							</div>
							<div style={{ marginTop: "8px" }}>
								<div
									style={{
										position: "relative",
										width: "auto",
										height: "150px",
										background: "rgb(245, 245, 245)",
										padding: "10px",
									}}
								>
									<div
										style={{
											borderRadius: `10px`,
											display: "flex",
											width: "calc(100% - 20px)",
											height: "calc(100% - 20px)",
											padding: "10px",
											background: "#ffffff",
											justifyContent: "center",
										}}
									>
										{articleCover ? (
											<Image
												preview={{
													mask: "预览大图",
												}}
												src={articleCover}
												height={"100%"}
												crossOrigin="anonymous"
											/>
										) : (
											<Empty
												description="暂无封面图"
												image={Empty.PRESENTED_IMAGE_SIMPLE}
											/>
										)}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Modal>
			) : null}
		</>
	);
}

export default EditArticleCard;
