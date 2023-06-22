import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./routes/protectedroute";
import NotFound from "./component/notfound";
import LoginScreen from "./screens/loginscreen";
import Routing from "./routes";

function App() {
  //--------state------
  const User = useSelector((state: any) => state.User);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0055A6",
          fontFamily: "Montserrat-Medium",
          borderRadius: 4,
          colorTextPlaceholder: "#888c99",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/Auth/*"
            element={
              <ProtectedRoute isSignedIn={User.auth}>
                <Routing />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
