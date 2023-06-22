import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../../component/pageheader";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { BsFilterCircle, BsSearch } from "react-icons/bs";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Settings from "../../assets/image/Vector.png";

import "./styles.css";
import { Button, Checkbox, Input } from "antd";
// import DataTable from "./component/datatable";
import NewForm from "./component/newform";
import ReelsList from "./component/reelsList";
import Loadingbox from "../../component/loadingbox";

function ReelsScreen() {
  const navigate = useNavigate();
  const [isReels, setIsReels] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateNew, setIsCreateNew] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    let url = "https://suprabhaatham-dev.herokuapp.com/api/reels";
    axios.get(url).then((response) => {
      let data = response.data.data;
      console.log("Reels Data ---> ", data);
      setData(data);
      setIsLoading(false);
    });
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div style={{ height: "100vh" }}>
      <PageHeader
        title={"Reels"}
        total={data.length}
        item={"Reels"}
        goBack={() => setIsReels(true)}
        onBtnPress={() => setIsReels(false)}
      />
      <div className="mt-3">
        {isReels ? (
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
              <div className="mx-2">
                <img src={Settings} alt="settingsIcon" />
              </div>
            </Col>
          </Row>
        ) : null}

        <div className="mt5">
          {isReels ? (
            isLoading ? (
              <Loadingbox />
            ) : (
              <ReelsList data={data} />
            )
          ) : (
            <NewForm onClose={() => setIsReels(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReelsScreen;
