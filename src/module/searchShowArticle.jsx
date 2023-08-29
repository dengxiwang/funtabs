import { Button, Modal, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function SearchShowArticle({ label, link, content }) {
	const [modalOpen, setModalOpen] = useState(false);
	const toggleModal = () => setModalOpen(!modalOpen);

	// 自定义渲染器 renderer
	const renderer = {
		img: ({ alt, src }) => (
			<img
				alt={alt}
				src={`${src}`}
				style={{ maxWidth: "100%", textIndent: "-3.2ch" }}
				crossOrigin="anonymous"
			/>
		),
		p: ({ children, node }) => {
			const hasElement = node.children[0].type !== "text";
			return (
				<p style={{ textIndent: hasElement ? 0 : "2ch", lineHeight: 2 }}>
					{children}
				</p>
			);
		},
	};

	return (
		<>
			<Button
				style={{ width: "calc(100% - 8px)", background: "none" }}
				onClick={toggleModal}
			>
				{label}
			</Button>
			{modalOpen ? (
				<Modal
					destroyOnClose={true}
					width={"100%"}
					zIndex={100000}
					focusTriggerAfterClose={false}
					title={
						<Space
							style={{
								width: "100%",
								justifyContent: "space-between",
								flexDirection: `${link ? "" : "row-reverse"}`,
							}}
						>
							{link ? (
								<Button
									onClick={() => {
										window.open(link);
									}}
								>
									查看原文
								</Button>
							) : null}
							<Button type="default" onClick={toggleModal}>
								关闭
							</Button>
						</Space>
					}
					style={{ maxWidth: "677px", padding: "12px" }}
					bodyStyle={{
						display: "flex",
						justifyContent: "center",
						height: "calc(100vh - 112px)",
						overflow: "scroll",
					}}
					centered
					footer={false}
					open={modalOpen}
					onCancel={toggleModal}
					closable={false}
				>
					<div style={{ width: "100%", maxWidth: "677px" }}>
						<Title level={3} style={{ marginTop: "0px", textAlign: "center" }}>
							{label}
						</Title>
						<ReactMarkdown components={renderer}>{content}</ReactMarkdown>
					</div>
				</Modal>
			) : null}
		</>
	);
}

export default SearchShowArticle;
