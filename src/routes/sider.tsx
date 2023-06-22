import React from 'react'
import Menus from "./menu.json";
import MenuItem from "./menuitem";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useParams } from 'react-router-dom';
const { Header, Content, Sider } = Layout;




function Siders() {


  return (
    <Sider
          width={136}
          style={{
            background: "#F0F2F5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
          trigger={null}
          collapsible
        >
          <>
            <div className="routingSiderTop" />
            <div className="routingSiderMenu">
              {Menus.map((item, index) => {
                return(
                <MenuItem key={index} icon={item.icon} title={item.title} path={item.navigete} />
              )})}
            </div>
            <div className="routingSiderBottom" />
          </>
        </Sider>
  )
}

export default Siders