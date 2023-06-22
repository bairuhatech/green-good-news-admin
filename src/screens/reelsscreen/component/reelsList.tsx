import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import HoverVideoPlayer from "react-hover-video-player";
import CircularProgress from "@mui/material/CircularProgress";
import { AiFillHeart } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";

function ReelsList(props: any) {
  const [mute, setMute] = useState(true);
  return (
    <>
      <div className="reeslScreen-main-card">
        <Row>
          {props.data?.map((item: any) => {
            return (
              <Col md="2" className="reeslScreen-reel">
                <div>
                  <HoverVideoPlayer
                    style={{
                      // Make the image expand to cover the video's dimensions
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    videoSrc={item.attributes.video}
                    loadingOverlay={
                      <div className="loading-overlay">
                        <CircularProgress style={{ color: "#fff" }} />
                      </div>
                    }
                    volume={0.5}
                    muted={mute}
                    hoverOverlay={
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AiFillPlayCircle
                            onClick={() =>
                              window.open(
                                item.attributes.video,
                                "MsgWindow",
                                "width=450,height=1000"
                              )
                            }
                            size={50}
                            color="white"
                            style={{ opacity: ".8" }}
                          />
                        </div>
                        <div
                          className=""
                          style={{
                            backgroundColor: "black",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            opacity: "0.6",
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                        >
                          <div className="like-item">
                            <AiFillHeart />
                            <span style={{ fontSize: "11px" }}>
                              {item.attributes.likes}
                            </span>
                          </div>
                          <div className="like-item">
                            <RiShareForwardFill />
                            <span style={{ fontSize: "11px" }}>
                              {item.attributes.shares}
                            </span>
                          </div>
                          <div className="like-item">
                            <FaComment />
                            <span style={{ fontSize: "11px" }}>
                              {item.attributes.comments}
                            </span>
                          </div>
                          <div
                            onClick={() => setMute(!mute)}
                            className="like-item"
                          >
                            {mute ? <FaVolumeMute /> : <AiFillSound />}

                            <span style={{ fontSize: "11px" }}></span>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default ReelsList;
