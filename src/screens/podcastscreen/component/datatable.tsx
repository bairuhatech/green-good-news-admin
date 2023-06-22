import React from "react";
import { Container } from "react-bootstrap";
import { Card, Space, Table, Tag } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { ColumnsType } from "antd/es/table";

function DataTable(props: any) {
  interface DataType {
    key: string;
    id: number;
    news: string;
    newshead: string;
    address: string;
    imageurl: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        return <a>{text}</a>;
      },
    },
    {
      title: "News Title",
      dataIndex: "news",
      key: "age",
      render: (text, record: any) => {
        console.log("text", text);
        console.log("record", record);
        return <div>{record.news}</div>;
      },
    },
    {
      title: "News Headline",
      dataIndex: "newshead",
      key: "address",
      render: (text, record: any) => {
        return <div>{record.newshead}</div>;
      },
    },
    {
      title: "News Photos",
      key: "imageurl",
      dataIndex: "imageurl",
      render: (text, record: any) => {
        record.imageurl.map((item: any) => {
          console.log("text", item);
        });
        return (
          <div>
            {/* <img
              key={record.attributes.image}
              src={record.attributes.image}
              alt="Table Image"
              style={{ width: "100px" }}
            /> */}
          </div>
        );
      },
    },
    {
      title: "News Type",
      key: "action",
      render: (_, record) => <Space size="middle">Regional</Space>,
    },
    {
      title: "Status",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <Tag color="lime">Published</Tag>
        </Space>
      ),
    },
    {
      title: "Task",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <RiDeleteBin6Line size={25} color="#9ba9b6" />
        </Space>
      ),
    },
  ];
  return (
    <div className="mt-5">
      <Card
        bordered
        style={{
          width: "100%",
          overflow: "scroll",
          height: "70vh",
          borderColor: "#f5f5f5",
        }}
      >
        <Table columns={columns} dataSource={props.data} bordered={false} />
      </Card>
    </div>
  );
}

export default DataTable;
