import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, message } from "antd";
// import Logo from "../../assets/image/suprabhathamlogo.svg";
import ggnLogo from "../../assets/image/ggnlogogreen.png";
import "./styles.css";
import { POST } from "../../utils/apirequest";
import { API } from "../../config/API";

import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userslice";

const LoginScreen = (props: any) => {
	// ------------------state-----------
	const [loading, setLoading] = useState(false);

	//   ---variables---
	const dispatch = useDispatch();
	const navigate: any = useNavigate();

	//   ----functions----
	const onFinish = async (values: any) => {
		setLoading(true);
		let body = {
			email: values.username,
			password: values.password,
		};
		let url = API.LOGIN;
		try {
			const response: any = await POST(url, body);
			if (response) {
				dispatch(login(response.data));
				navigate("/Auth");
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	//   =========screenview========
	return (
		<div className="loginSection">
			<div className="box1">
				<div className="box2">
					<div className="logo">
						{/* <img src={Logo} alt="suprabhatham-logo" style={{ width: "50%" }} /> */}
						{/* Green Good News */}
						<img src={ggnLogo} className="ggnLogo" />
					</div>
					<div>
						<Form
							name="basic"
							labelCol={{
								span: 24,
							}}
							wrapperCol={{
								span: 24,
							}}
							style={{
								width: "100%",
								textAlign: "center",
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off">
							<Form.Item
								label="Username"
								name="username"
								rules={[
									{
										required: true,
										message: "Please input your username!",
									},
								]}>
								<Input style={{ width: "100%" }} />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										message: "Please input your password!",
										required: true,
									},
								]}>
								<Input.Password style={{ width: "100%" }} />
							</Form.Item>

							<Form.Item
								name="remember"
								valuePropName="checked"
								wrapperCol={{
									offset: 0,
									span: 16,
								}}>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Form.Item
								wrapperCol={{
									// offset: ,
									span: 24,
								}}>
								<Button
									className="antBttnLogin"
									type="primary"
									htmlType="submit"
									loading={loading}>
									Login
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
