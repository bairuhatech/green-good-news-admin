import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../../component/pageheader";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { BsFilterCircle, BsSearch } from "react-icons/bs";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
// import Settings from "../../assets/image/Vector.png";
// import { IoSettingsSharp } from "react-icons/io";
import { RiSettings5Line } from "react-icons/ri";

import "./styles.css";
import { Button, Checkbox, Input } from "antd";
import DataTable from "./component/datatable";
import NewForm from "./component/newform";
import Loadingbox from "../../component/loadingbox";

function HomeScreen() {
	const navigate = useNavigate();
	const [isTable, setIsTable] = useState(true);
	const [isloading, setIsloading] = useState(false);
	const [data, setData] = useState([]);
	const [item, setItem] = useState({});

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		setIsloading(true);
		// let url = "https://suprabhaatham-dev.herokuapp.com/api/all-news";createdAt
		let url =
			"https://suprabhaatham-dev.herokuapp.com/api/all-news?sort=createdAt:DESC&populate[0]=categories";
		axios
			.get(url)
			.then((response) => {
				let data = response.data.data;
				setData(data);
				setIsloading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsloading(false);
			});
	};

	const onChange = (e: CheckboxChangeEvent) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const onEdit = (val: any) => {
		setItem(val);
		setIsTable(false);
	};

	return (
		<div style={{ height: "80vh", overflow: "scroll" }}>
			<PageHeader
				// title={"News"}
				title={<span className="pageTitle">News</span>}
				// goBack={() => navigate("/Auth/home")}
				goBack={() => setIsTable(true)}
				onBtnPress={() => setIsTable(false)}
			/>
			<div className="">
				{isTable ? (
					<Row>
						<Col md={6} xs={12}>
							<div className="d-flex flex-row">
								<div className="mx-2  filterBox">
									{/* <BsFilterCircle size={20} color="#0055A6" /> */}
									<BsFilterCircle size={20} color="green" />
									<span className="filterText">Filter</span>
								</div>
								<div className="mx-2 serchBox">
									<Input
										className="serchInput"
										placeholder={"type here to search any content "}
										bordered={false}
									/>
									<BsSearch size={20} color="green" />
									{/* <BsSearch size={20} color="#0055A6" /> */}
								</div>
							</div>
						</Col>
						<Col
							md={6}
							xs={12}
							color="red"
							className="d-flex justify-content-end ">
							<div className="d-flex flex-row">
								<div className="mx-2 d-flex align-items-center">
									<Checkbox onChange={onChange} className="checkBox">
										News Created Date
									</Checkbox>
								</div>
								<div className="mx-2 d-flex align-items-center">
									<Checkbox onChange={onChange} className="checkBox">
										news updated date
									</Checkbox>
								</div>
							</div>
							<div className="mx-2">
								{/* <img
									src={Settings}
									alt="settingsIcon"
									className="settingsImage"
								/> */}
								<RiSettings5Line size={30} color="green" />
								{/* <IoSettingsSharp /> */}
							</div>
						</Col>
					</Row>
				) : null}

				{isloading ? (
					<Loadingbox />
				) : (
					<div className="mt5">
						{isTable ? (
							<DataTable
								data={data}
								refresh={loadData}
								onEdit={(val: any) => onEdit(val)}
							/>
						) : (
							<NewForm items={item} onClose={() => setIsTable(false)} />
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default HomeScreen;
