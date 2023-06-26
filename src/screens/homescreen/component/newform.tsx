import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
import moment from "moment";
import Loadingbox from "../../../component/loadingbox";
import { uploadImageToS3 } from "../../../config/s3config/s3fileUpload";
// import '@tinymce/tinymce/themes/silver';

function NewForm(props: any) {
	let InitialBody =
		props.items &&
		props.items.id &&
		props.items.attributes &&
		props.items.attributes.body;
	const [form] = Form.useForm();
	const [content, setContent] = useState<any>(InitialBody);
	const [categories, setCategories] = useState([]);
	const [imageurl, setImageurl] = useState("");
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(true);

	useEffect(() => {
		loadCategories();
		setTimeout(() => {
			setLoading2(false);
		}, 500);
	}, []);

	const loadCategories = () => {
		let url =
			"https://green-good-news-server-9a460dab0f63.herokuapp.com/api/categories";
		axios.get(url).then((response) => {
			let data = response.data.data;
			setCategories(data);
		});
	};

	const handleEditorChange = (content: any, editor: any) => {
		setContent(content);
	};

	const formItemLayout = {
		labelCol: {
			span: 24,
		},
		wrapperCol: {
			span: 12,
		},
	};
	const onFinish = async (values: any) => {
		setLoading(true);
		let requestObj = {
			data: {
				Title: values.title,
				Head: values.head,
				Body: content,
				Image: imageurl,
				categories: values.categories,
			},
		};

		let url =
			props.items && props.items.id
				? `https://green-good-news-server-9a460dab0f63.herokuapp.com/api/all-news/${props.items.id}`
				: `https://green-good-news-server-9a460dab0f63.herokuapp.com/api/all-news`;
		let method = props.items && props.items.id ? "PUT" : "POST";
		axios({
			method: method,
			url: url,
			data: requestObj,
		})
			.then((response) => {
				console.log(response);
				form.resetFields();
				setContent("");
				props.onClose();
				setLoading(false);
				message.success(
					<div>
						Success : <b>Saved</b>
					</div>
				);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const onUpload = (val: any) => {
		const fileName = `${moment().format(
			"YYYY-MM-DDHH:MM:SS"
		)}suprabhaatham-news.png`;
		const file = val.fileList[0].originFileObj;
		const response = uploadImageToS3(file, fileName);
		response.then((location) => {
			setImageurl(location.Location);
		});
	};

	return loading2 ? (
		<Loadingbox />
	) : (
		<div>
			<div>
				<Form
					{...formItemLayout}
					onFinish={onFinish}
					form={form}
					name="add-news"
					initialValues={{
						title:
							props.items &&
							props.items.id &&
							props.items.attributes &&
							props.items.attributes.title,
						head:
							props.items &&
							props.items.id &&
							props.items.attributes &&
							props.items.attributes.head,
						image:
							props.items &&
							props.items.id &&
							props.items.attributes &&
							props.items.attributes.image,
						categories:
							props.items &&
							props.items.id &&
							props.items.attributes &&
							props.items.attributes.categories &&
							props.items.attributes.categories.data.map((item: any) => {
								return item?.id;
							}),
					}}>
					<Row>
						<div className="publishBox">
							{props.items && props.items.id ? <Button>Publish</Button> : null}
							<div style={{ margin: 1 }} />
							<Button htmlType="submit" loading={loading}>
								{props.items && props.items.id ? "Edit" : "Save"}
							</Button>
						</div>
					</Row>
					<Row>
						<Col md="6" xs="12">
							<Form.Item
								label={<span className="newsFormLabels">News Title </span>}
								name="title">
								<Input />
							</Form.Item>
						</Col>
						<Col md="6" xs="12">
							<Form.Item
								label={<span className="newsFormLabels">News Heading</span>}
								name="head">
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Editor
						apiKey="0ytm2725w7qe1hqx9wssxsu6tjockgcop843kek0v74zbvjr" // Replace with your API key
						value={content}
						init={{
							height: 500,
							menubar: true,
							directionality: "ltr",
							plugins: [
								"advlist autolink lists link image",
								"charmap print preview anchor help",
								"searchreplace visualblocks code",
								"insertdatetime media table paste wordcount",
							],
							toolbar:
								"  | bold italic | \
      alignleft aligncenter alignright | \
      bullist numlist outdent indent |subscript superscript |link unlink| help | forecolor backcolor | \
      \
      \
           \
       | image ",
						}}
						onEditorChange={handleEditorChange}
					/>
					<br />
					<Row>
						<Col md="6">
							<Form.Item
								label={<span className="newsFormLabels">Image</span>}
								name="image">
								<Upload onChange={(val) => onUpload(val)}>
									<Input suffix={<FcAddImage />} />
								</Upload>
							</Form.Item>
						</Col>
						<Col md="6">
							<Form.Item
								label={<span className="newsFormLabels">Categories</span>}
								name="categories">
								<Select mode="multiple">
									{categories.length &&
										categories.map((item: any, index: any) => {
											return (
												<Select.Option key={index} value={item.id}>
													{item.attributes.Category}
												</Select.Option>
											);
										})}
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}

export default NewForm;
