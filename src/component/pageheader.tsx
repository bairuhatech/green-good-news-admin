import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import "./styles.css";
import { Button } from "antd";
import { Col, Row } from "react-bootstrap";

function PageHeader(props: any) {
	return (
		<div className="pageHeaderConatiner">
			<div className="headerIconBox">
				<BsArrowLeftCircle
					size={30}
					color="green"
					onClick={() => props.goBack()}
				/>
			</div>

			<Row>
				<Col sm={6} xs={9} md={"6"}>
					<div>
						<span className="headerTitle">{props.title}</span>
					</div>
					<span className="headerDiscription">
						Total {props.total} {props.item}
					</span>
				</Col>
				<Col sm="6" xs={3} md={"6"} className="d-flex justify-content-end">
					<Button
						type="primary"
						className="headerBtn"
						onClick={() => props.onBtnPress()}>
						Create News Entry
					</Button>
				</Col>
			</Row>
		</div>
	);
}

export default PageHeader;
