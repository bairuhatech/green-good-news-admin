import React from "react";
import { Container } from "react-bootstrap";
import { Card, Space, Table, Tag, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
import axios from "axios";

function DataTable(props: any) {
  interface DataType {
    key: string;
    id: number;
    news: string;
    newshead: string;
    address: string;
    imageurl: string[];
  }
  const scrollConfig = {
    x: "100vh",
    y: "50vh",
    scrollToFirstRowOnChange: true,
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (text, record, index) => {
        return <div className="">{index + 1}</div>;
      },
    },
    {
      title: "News Title",
      dataIndex: "news",
      key: "news",
      width: 500,
      render: (text, record: any) => {
        return <div  style={{  fontSize: "10px"}}>{record.attributes.title}</div>;
      },
    },
    {
      title: "News Headline",
      dataIndex: "newshead",
      key: "newshead",
      width: 500,
      render: (text, record: any) => {
        return <div style={{  fontSize: "10px"}}>{record.attributes.head}</div>;
      },
    },
    {
      title: "News Photos",
      key: "imageurl",
      dataIndex: "imageurl",
      render: (text, record: any) => {
        return (
          <div>
            <img
              key={record.attributes.image}
              src={record.attributes.image}
              alt="Table Image"
              style={{ width: "70px" }}
            />
          </div>
        );
      },
    },
    {
      title: "News type",
      dataIndex: "newshead",
      key: "address",
      render: (text, record: any) => {
        return (
          <div style={{  fontSize: "10px"}}>
            {record.attributes.categories.data.map((item: any) => {
              return <div>{item.attributes.category}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tag color="lime" style={{  fontSize: "10px"}}>Published</Tag>
        </Space>
      ),
    },
    {
      title: "Task",
      key: "action",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
            }}
          >
            <Space size="middle">
              <RiEditBoxLine
                size={25}
                color="#9ba9b6"
                onClick={() => props.onEdit(record)}
              />
            </Space>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDeleteItem(record.id)}
            >
              <Space size="middle">
                <RiDeleteBin6Line size={25} color="#9ba9b6" />
              </Space>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onDeleteItem = (id: any) => {
    let url = `https://suprabhaatham-dev.herokuapp.com/api/all-news/${id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        message.success("Successfully deleted");
        props.loadData();
      })
      .catch((err) => {
        console.log(err);
        message.destroy("Something went wrong...!");
      });
  };

  return (
    <div className="mt-5">
      <Card className="commen-table-Card">
        <Table
          columns={columns}
          dataSource={props.data}
          // scroll={scrollConfig}
          className="commen-table-custom-scrollbar"
        />
      </Card>
    </div>
  );
}

export default DataTable;
