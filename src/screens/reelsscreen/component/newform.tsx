import { Button, Form, Input, message, Select, Spin, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
import moment from "moment";
import { uploadImageToS3 } from "../../../config/s3config/s3fileUpload";
// import '@tinymce/tinymce/themes/silver';
import { MdOutlineOndemandVideo } from "react-icons/md";

function NewForm(props: any) {
  const [form] = Form.useForm();
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [videoUrl, setVideoUrl] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isUploading, setIsUploading] = useState<any>(false);

  useEffect(() => {
    // loadCategories();
  }, []);

  const loadCategories = () => {
    let url = "https://suprabhaatham-dev.herokuapp.com/api/categories";
    axios.get(url).then((response) => {
      let data = response.data.data;
      // setCategories(data);
    });
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const onFinish = (values: any) => {
    // console.log("Create started");
    setIsLoading(true);
    let requestObj = {
      data: {
        title: values.title,
        description: description,
        video: videoUrl,
      },
    };

    // console.log(requestObj);

    let url = "https://suprabhaatham-dev.herokuapp.com/api/reels";
    axios
      .post(url, requestObj)
      .then((response) => {
        console.log(response);
        // console.log("Create Ended");
        setIsLoading(false);
        form.resetFields();
        props.onClose();
        message.success(
          <div>
            Success : <b>Saved</b>
          </div>
        );
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Form values:", requestObj);
  };

  const onUpload = (val: any) => {
    setIsUploading(true);
    console.log("Upload started");
    const fileName = `${moment().format("YYYY-MM-DD")}-suprabhaatham-reels.mp4`;
    const file = val.fileList[0].originFileObj;
    const response = uploadImageToS3(file, fileName);
    response.then((location) => {
      setVideoUrl(location.Location);
      // console.log("Upload Ended");
      console.log(location.Location);
      setIsUploading(false);
    });
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          name="add-news"
        >
          <Row>
            <div className="publishBox">
              <Button>Publish</Button>
              <div style={{ margin: 1 }} />
              {/* <Button htmlType="submit">Save</Button> */}
              <Button htmlType="submit">{isLoading ? <Spin /> : "Save"}</Button>
            </div>
          </Row>
          <br />
          <br />

          <Row>
            <Col md="6" xs="12">
              <Form.Item
                label={<span className="newsFormLabels">Title</span>}
                name="title"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col md="6">
              <Form.Item
                label={<span className="newsFormLabels">File</span>}
                name="video"
              >
                <Upload onChange={(val) => onUpload(val)}>
                  <Input
                    disabled
                    placeholder="Select Video"
                    suffix={isUploading ? <Spin /> : <FcAddImage />}
                  />
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <br />
          <Row>
            <Col md="6" xs="12">
              <Form.Item
                label={<span className="newsFormLabels">Description</span>}
                name="description"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default NewForm;
