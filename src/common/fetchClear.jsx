import { message } from "antd";

// 统一的请求函数
const request = async (url, config, token) => {
	try {
		const res = await fetch(url, config);

		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}`);
		}

		const contentType = res.headers.get("content-type");

		if (
			contentType.indexOf("application/json") === -1 &&
			contentType.indexOf("application/octet-stream") === -1
		) {
			return await res.text();
		}

		if (contentType.indexOf("application/json") !== -1) {
			const result = await res.json();

			if (result.hasOwnProperty("code") && result.code !== 200) {
				if (result.code === -3) {
					window.localStorage.removeItem("token");
					message.error("身份验证失败，请重新登录");
					setTimeout(() => {
						window.location.reload(true);
					}, 1000);
					return;
				} else if (result.code === -1) {
					throw new Error(`Request failed with code ${result.code}`);
				}
			}

			return result.data;
		}

		const blob = await res.blob();
		return blob;
	} catch (error) {
		throw error;
	}
};

const debounce = (func, delay) => {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		return new Promise((resolve, reject) => {
			timer = setTimeout(async () => {
				try {
					const result = await func(...args);
					resolve(result);
				} catch (error) {
					reject(error);
				}
			}, delay);
		});
	};
};

//GET请求函数
export const getClear = (url, params, token) => {
	let queryString = "";
	if (params) {
		queryString = Object.entries(params)
			.map(
				([key, value]) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			)
			.join("&");
	}

	return new Promise((resolve, reject) => {
		request(
			`${url}${queryString ? `?${queryString}` : ""}`,
			{
				method: "GET",
				mode: "cors",
				headers: {
					token: token,
				},
			},
			token
		)
			.then(resolve)
			.catch((error) => reject(error));
	});
};

//POST请求函数
export const postClear = debounce((url, data, token) => {
	if (data instanceof FormData) {
		return new Promise((resolve, reject) => {
			request(
				url,
				{
					body: data,
					method: "POST",
					headers: {
						token: token,
					},
				},
				token
			)
				.then(resolve)
				.catch((error) => {
					reject(error); // 直接返回错误
				});
		});
	} else {
		return new Promise((resolve, reject) => {
			request(
				url,
				{
					body: JSON.stringify(data),
					headers: {
						"content-type": "application/json",
						token: token,
					},
					method: "POST",
				},
				token
			)
				.then(resolve)
				.catch((error) => {
					reject(error); // 直接返回错误
				});
		});
	}
}, 300);
