import React, { useEffect, useState } from "react";
import PageHeader from "../../component/pageheader";
import { useNavigate } from "react-router-dom";
import { Checkbox, Input } from "antd";
import { BsFilterCircle, BsSearch } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import DataTable from "./component/datatable";
import Settings from "../../assets/image/Vector.png";
import datas from "./data.json";

function PodcastScreen() {
  // const [data, setData] = useState<array>(JSON.parse(datas));
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <PageHeader title={"Podcast"} goBack={() => navigate("/Auth/home")} />
      <div className="mt-3">
        <Row>
          <Col md={6} xs={12}>
            <div className="d-flex flex-row">
              <div className="mx-2   filterBox">
                <BsFilterCircle size={20} color="#0055A6" />
                <span className="filterText">Filter</span>
              </div>
              <div className="mx-2 serchBox">
                <Input
                  className="serchInput"
                  placeholder={"type here to search any content "}
                  bordered={false}
                />
                <BsSearch size={20} color="#0055A6" />
              </div>
            </div>
          </Col>
          <Col
            md={6}
            xs={12}
            color="red"
            className="d-flex justify-content-end "
          >
            <div className="d-flex flex-row">
              <div className="mx-2 d-flex align-items-center">
                <Checkbox className="checkBox">News Created Date</Checkbox>
              </div>
              <div className="mx-2 d-flex align-items-center">
                <Checkbox className="checkBox">news updated date</Checkbox>
              </div>
            </div>
            <div className="mx-2">
              <img src={Settings} alt="settingsIcon" />
            </div>
          </Col>
        </Row>
        <DataTable data={datas} />
      </div>
    </div>
  );
}

export default PodcastScreen;
