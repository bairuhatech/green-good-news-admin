// import S3 from "../config/S3";
import { message } from "antd";
import { API } from "../config/API";
const S3FileUpload = require("react-s3").default;
// window.Buffer = window.Buffer || require("buffer").Buffer;

const GET = async (url: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const POST = async (url: any, body: any) => {
    return new Promise(async (resolve, reject) => {
      fetch(API.BASE_URL + url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  const PUT = () => {};
  
  const DELETE = () => {};
  
//   const FILE_UPLOAD = async (file: any) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (file && file.name) {
//           message.loading({
//             type: "loading",
//             content: "Action in progress..",
//             duration: 1,
//           });
//           const response = await S3FileUpload.uploadFile(file, S3);
//           if (response && response.location) {
//             resolve(response.location);
//           } else {
//             reject("faild");
//           }
//         } else {
//           resolve(null);
//         }
//       } catch (err) {
//         reject(err);
//       }
//     });
//   };
  
  export { GET, POST, PUT, DELETE };