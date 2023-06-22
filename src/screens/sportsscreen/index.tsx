import React from "react";
import PageHeader from "../../component/pageheader";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


function SportScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title={"Sports"} goBack={() => navigate('/Auth/home')} />
    </div>
  );
}

export default SportScreen;
