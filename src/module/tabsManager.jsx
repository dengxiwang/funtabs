import {
	ApartmentOutlined,
	DeleteOutlined,
	SwapOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	Input,
	Modal,
	Popconfirm,
	Popover,
	Row,
	Select,
	Space,
	message,
} from "antd";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "../common/funtabs.css";
import { funtabsData } from "./data";

const TabsManager = (props) => {
	const {
		linkList,
		setLinkList,
		setTabsVisibility,
		tabsActiveKey,
		setTabsActiveKey,
		tabs,
		type,
		edit,
	} = props;

	const [state, setState] = useState({
		tabsData: _.cloneDeep(linkList),
		opened: false,
		drag: true,
		mergeTarget: null,
	});

	const { tabsData, opened, drag, mergeTarget } = state;

	useEffect(() => {
		window.sessionStorage.setItem("tabs", JSON.stringify(linkList));
	}, [opened, linkList]);

	const addTabs = useCallback(() => {
		if (tabsData.filter((item) => item.label === "").length !== 0) {
			message.error("存在空白分类，创建失败");
		} else {
			const key = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
			const newTabsData = _.cloneDeep(tabsData);
			newTabsData.push({
				label: "",
				key: key,
				content: [],
			});
			setState({ ...state, tabsData: newTabsData });
		}
		// eslint-disable-next-line
	}, [tabsData]);

	const tabsVis = useCallback(() => {
		const newTabsData = _.cloneDeep(tabsData);
		const a = newTabsData.length;
		setTabsVisibility(a === 1 ? "none" : "");
	}, [setTabsVisibility, tabsData]);

	const deleteTabs = useCallback(
		(index) => {
			const newTabsData = _.cloneDeep(tabsData);
			if (newTabsData.length === 1) {
				message.error("删除失败，至少保留一个分类");
			} else {
				newTabsData.splice(index, 1);
				setState({ ...state, tabsData: newTabsData });
				message.success("删除成功");
			}
		},
		[state, tabsData]
	);

	const saveTabs = useCallback(() => {
		const newTabsData = _.cloneDeep(tabsData);
		const hasDuplicateLabel = newTabsData.some((item, index) => {
			return (
				newTabsData.findIndex(
					(innerItem, innerIndex) =>
						innerIndex !== index && item.label === innerItem.label
				) !== -1
			);
		});
		if (newTabsData.filter((item) => item.label === "").length !== 0) {
			message.error("请填写完整分类名称");
		} else if (hasDuplicateLabel) {
			message.error("分类名称不可重复");
		} else {
			let num;
			for (let i = 0; i < newTabsData.length; i++) {
				if (newTabsData[i].key === tabsActiveKey) {
					num = i;
				}
			}
			try {
				setTabsActiveKey(newTabsData[num].key);
				tabs.current.slickGoTo(num, true);
				window.localStorage.setItem("activeKey", newTabsData[num].key);
			} catch (error) {
				const len = newTabsData.length - 1;
				setTabsActiveKey(newTabsData[len].key);
				tabs.current.slickGoTo(newTabsData[len], true);
				window.localStorage.setItem("activeKey", newTabsData[len].key);
			}
			sessionStorage.setItem("tabs", JSON.stringify(newTabsData));
			setTimeout(() => {
				setLinkList(newTabsData);
			}, 0);
			if (type === 1 && edit === "none") {
				let newData;
				const localData = JSON.parse(window.localStorage.getItem("funtabs"));
				if (localData) {
					newData = localData.newData;
				} else {
					newData = funtabsData;
				}
				newData.content = newTabsData;
				localStorage.setItem("funtabs", JSON.stringify({ newData }));
				window.localStorage.setItem("saveTime", Date.now());
				setTimeout(() => {
					setLinkList(newData.content);
				}, 0);
			}
			setState({ ...state, opened: false });
			tabsVis();
		}
	}, [
		state,
		tabsData,
		tabsActiveKey,
		setTabsActiveKey,
		tabs,
		type,
		edit,
		setLinkList,
		tabsVis,
	]);

	const showType = useMemo(() => {
		const onClickHandler = () => {
			setState({ ...state, tabsData: linkList, opened: true });
		};

		if (type === 1) {
			return <p onClick={onClickHandler}>分类管理</p>;
		} else {
			return (
				<Button type="primary" onClick={onClickHandler}>
					分类管理
				</Button>
			);
		}
	}, [linkList, state, type]);

	const mergeTabs = useCallback(
		(key) => (
			<>
				<Row
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Col>目标分类：</Col>
					<Col flex={1}>
						<Select
							value={
								!tabsData.some((option) => option.value === mergeTarget)
									? null
									: mergeTarget
							}
							style={{ width: "100%" }}
							options={tabsData}
							onChange={(e) => {
								setState({ ...state, mergeTarget: e });
							}}
						/>
					</Col>
				</Row>
				<Space
					style={{
						display: "flex",
						marginTop: "12px",
						justifyContent: "flex-end",
					}}
				>
					<Button
						type="primary"
						size="small"
						onClick={() => {
							merge(mergeTarget, key);
						}}
					>
						确认
					</Button>
				</Space>
			</>
		),
		// eslint-disable-next-line
		[mergeTarget, state, tabsData]
	);

	const merge = useCallback(
		(target, key) => {
			if (target === null || target === undefined) {
				return message.error("请选择目标分类");
			}
			if (target === key) {
				return message.error("目标分类与当前分类不可相同");
			}
			const newTabsData = _.cloneDeep(tabsData);
			if (newTabsData.length === 1) {
				message.error("合并失败，当前只有一个分类");
			} else {
				const targetIndex = newTabsData.findIndex(
					(item) => item.key === target
				);
				const sourceIndex = newTabsData.findIndex((item) => item.key === key);

				if (targetIndex !== -1 && sourceIndex !== -1) {
					const targetCategory = newTabsData[targetIndex];
					const sourceCategory = newTabsData[sourceIndex];
					targetCategory.content = targetCategory.content.concat(
						sourceCategory.content
					);
					newTabsData.splice(sourceIndex, 1);
					setState({ ...state, tabsData: newTabsData });
					message.success("合并成功");
				} else {
					return message.error("目标分类或当前分类不存在");
				}
			}
		},
		[tabsData, state]
	);

	return (
		<>
			{showType}
			{opened ? (
				<Modal
					title="分类管理"
					open={opened}
					onCancel={() => {
						setState({ ...state, opened: false });
					}}
					afterClose={() => {
						const data = JSON.parse(window.sessionStorage.getItem("tabs"));
						setLinkList(data);
					}}
					focusTriggerAfterClose={false}
					okText="确认"
					cancelText="取消"
					destroyOnClose={true}
					bodyStyle={{
						maxHeight: "320px",
						marginTop: "12px",
						overflow: "scroll",
					}}
					footer={
						<Row>
							<Col>
								<Button type="primary" onClick={addTabs}>
									新增
								</Button>
							</Col>
							<Col
								flex="auto"
								style={{ display: "flex", justifyContent: "flex-end" }}
							>
								<Space>
									<Button
										onClick={() => {
											setState({ ...state, opened: false });
										}}
									>
										取消
									</Button>
									<Button type="primary" onClick={saveTabs}>
										确认
									</Button>
								</Space>
							</Col>
						</Row>
					}
				>
					<ReactSortable
						id="tabsManager"
						key="tabsManager"
						list={tabsData}
						setList={(e) => {
							setState({ ...state, tabsData: e });
						}}
						tag="div"
						disabled={drag}
						animation={200}
						style={{
							marginBottom: "-12px",
						}}
						ghostClass="drag-background-class"
					>
						{tabsData.map((item, index) => {
							const key = item.key;
							return (
								<Row
									key={item.key}
									style={{ marginBottom: "12px", alignItems: "center" }}
								>
									<Col flex="78px">分类名称:</Col>
									<Col flex="1">
										<Input
											defaultValue={item.label}
											autoComplete="off"
											onChange={(e) => {
												tabsData.filter((item) => item.key === key)[0].label =
													e.target.value.trim();
												const newData = [...tabsData];
												setState({ ...state, tabsData: newData });
											}}
										/>
									</Col>
									<Col>
										<Button
											style={{
												cursor: "move",
											}}
											onMouseEnter={() => {
												setState({ ...state, drag: false });
											}}
											onMouseLeave={() => {
												setState({ ...state, drag: true });
											}}
										>
											<SwapOutlined rotate={90} />
										</Button>
										<Popover
											zIndex={1000}
											title="请选择您要合并至的分类"
											placement="topRight"
											content={mergeTabs(key)}
											trigger="click"
										>
											<Button>
												<ApartmentOutlined />
											</Button>
										</Popover>
										<Popconfirm
											title="确认删除？"
											okText="确定"
											cancelText="取消"
											onConfirm={() => {
												deleteTabs(index);
											}}
										>
											<Button danger>
												<DeleteOutlined />
											</Button>
										</Popconfirm>
									</Col>
								</Row>
							);
						})}
					</ReactSortable>
				</Modal>
			) : null}
		</>
	);
};

export default TabsManager;
