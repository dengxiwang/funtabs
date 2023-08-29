import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Image, Input, Row, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useCallback } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { get, post } from "../common/fetch";
import variable from "../common/variable";

const AddArticleCard = React.memo((props) => {
	const {
		articleUrl,
		setArticleUrl,
		articleTitle,
		setArticleTitle,
		articleContent,
		setArticleContent,
		articleCover,
		setArticleCover,
	} = props;

	const getArticleContent = useCallback(() => {
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
	}, [articleUrl, setArticleTitle, setArticleContent, setArticleCover]);

	const handleBeforeUpload = useCallback(
		async (file) => {
			if (file.size / 1024 / 1024 > 5) {
				message.error("文件大小不能超过 5MB！");
				return false;
			}
			const formData = new FormData();
			formData.append("file", file);
			const token = window.localStorage.getItem("token");
			if (token) {
				try {
					const res = await post(`${variable.uploadImages}`, formData, token);
					setArticleCover(res.url);
				} catch (error) {
					message.error("用户未登录，上传封面图失败");
				}
			} else {
				message.error("用户未登录，上传封面图失败");
			}
			return false;
		},
		[setArticleCover]
	);

	return (
		<>
			<Row className="input-div">
				<Col flex="72px">笔记地址：</Col>
				<Col flex="1">
					<Input
						placeholder="输入笔记地址获取内容"
						autoComplete="off"
						value={articleUrl}
						onChange={(e) => {
							setArticleUrl(e.target.value);
						}}
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
						placeholder="请输入笔记标题"
						autoComplete="off"
						onChange={(e) => {
							setArticleTitle(e.target.value);
						}}
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
						onChange={setArticleContent}
						disablePreview={true}
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
							value={articleCover}
							autoComplete="off"
							onChange={(e) => {
								setArticleCover(e.target.value);
							}}
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
								beforeUpload={handleBeforeUpload}
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
		</>
	);
});

export default AddArticleCard;
