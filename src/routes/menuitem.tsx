import React, { useState } from "react";
import { Icon } from "@mui/material";
import "./styles.css";
import DynamicIcon from "./DynamicIcon";
import { useNavigate, useLocation } from "react-router-dom";

const MenuItem = (props: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div
			className={
				location.pathname === props.path ? "menuItemActive" : "menuItem"
			}
			onClick={() => navigate(props.path)}>
			<div className="iconBox">
				<DynamicIcon name={props.icon} size={26} color={"green"} />
				<span
					className={
						location.pathname === props.path ? "menuTextActive" : "menuText"
					}>
					{props.title}
				</span>
			</div>
		</div>
	);
};

export default MenuItem;
