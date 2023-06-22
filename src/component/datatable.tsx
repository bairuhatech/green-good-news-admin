import React from "react";
import { Container } from "react-bootstrap";
import { Card, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

function CommenDataTable(props: any) {
  const scrollConfig = {
    x: '100vh', 
    y:'50vh',   
    scrollToFirstRowOnChange: true, 
  }
 
  return (
    <div className="mt-5">
      <Card className="commen-table-Card">
        <Table columns={props.columns} dataSource={props.data} scroll={scrollConfig} className="commen-table-custom-scrollbar"/>
      </Card>
    </div>
  );
}

export default CommenDataTable;
