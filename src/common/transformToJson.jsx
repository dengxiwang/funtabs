import { message } from "antd";

// 将方法封装为一个导出的默认函数
export default function transformToJson(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		// 读取文件内容完成后触发 onload 事件
		reader.onload = function (event) {
			const htmlText = event.target.result;
			try {
				const bookmarks = parseChromeBookmarks(htmlText);
				resolve(bookmarks);
			} catch (error) {
				message.error("书签文件格式不对");
			}
		};
		// 开始读取文件内容
		reader.readAsText(file);
	});
}

function parseChromeBookmarks(bookmarkFileContent) {
	const parser = new DOMParser();
	const htmlDocument = parser.parseFromString(bookmarkFileContent, "text/html");
	const bookmarksList = htmlDocument.getElementsByTagName("DL")[0];
	const result = [];
	for (let node of bookmarksList.childNodes) {
		if (node.nodeName === "DT") {
			if (node.querySelector("h3")) {
				const content = {};
				const h3 = node.querySelector("h3").innerText;
				content.label = h3;
				content.content = [];
				content.key = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
				content.value = content.key;
				const childContent = node.querySelectorAll("dl > dt");
				if (childContent.length !== 0) {
					for (let i = 0; i < childContent.length; i++) {
						const child = childContent[i].children[0];
						if (child.nodeName === "A") {
							const label = child.innerHTML;
							const link = child.href;
							const icon = `https://api.iowen.cn/favicon/${child.hostname}.png`;
							//确保新增卡片的唯一id
							const id =
								Date.parse(new Date()) + Math.floor(Math.random() * 1000);
							const childLink = {
								label,
								link,
								icon,
								type: "link",
								size: "11",
								backgroundColor: "#ffffff",
								x: 80,
								y: 20,
								id: id,
							};
							content.content.push(childLink);
						}
					}
				}
				result.push(content);
			} else {
				const content = {};
				content.label = "其他书签";
				content.key = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
				content.content = [];
				content.value = content.key;
				const childContent = node.querySelectorAll("A");
				if (childContent.length !== 0) {
					for (let m = 0; m < childContent.length; m++) {
						const child = childContent[m];
						const label = child.innerHTML;
						const link = child.href;
						const icon = `https://api.iowen.cn/favicon/${child.hostname}.png`; //确保新增卡片的唯一id
						const id =
							Date.parse(new Date()) + Math.floor(Math.random() * 1000);
						const childLink = {
							label,
							link,
							icon,
							type: "link",
							size: "11",
							backgroundColor: "#ffffff",
							x: 80,
							y: 20,
							id: id,
						};
						content.content.push(childLink);
					}
				}
				result.push(content);
			}
		}
	}
	const other = result.filter((item) => item.label === "其他书签");
	if (other.length !== 0) {
		const mergedBookmarks = result
			.filter((item) => item.label === "其他书签")
			.reduce((result, item) => result.concat(item.content), []);
		const key = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
		const mergeResult = {
			label: "其他书签",
			content: mergedBookmarks,
			key: key,
			value: key,
		};
		const otherBookmarks = result.filter((item) => item.label !== "其他书签");
		const newResult = [...otherBookmarks];
		newResult.push(mergeResult);
		return newResult;
	}
	return result;
}
