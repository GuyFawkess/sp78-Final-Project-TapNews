import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import PrivateRoutes from "./component/PrivateRoutes";
import { AuthProvider } from "./store/AuthContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import Chat from "./pages/Chat";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <AuthProvider>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<RegisterPage />} path="/register2" />
              <Route element={<LoginPage />} path="/login2" />

              <Route element={<PrivateRoutes />}>
                <Route element={<Chat />} path="/chat" />
              </Route>
              <Route element={<Single />} path="/single/:theid" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </AuthProvider>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
