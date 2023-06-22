import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Siders from "./sider";

const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer placement="left" onClose={onClose} open={open}>
        <Siders />
      </Drawer>
    </>
  );
};

export default MobileDrawer;
