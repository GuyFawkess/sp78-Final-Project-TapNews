import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import NavbarBottom from "./component/navbar";
import { Footer } from "./component/footer";
import { Feed } from "./pages/Feed";
import { UserProfile } from "./pages/UserProfile";
import { FriendsView } from "./pages/Friends";
import { FriendProfileView } from "./pages/FriendProfileView";
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
                        <div style={{overflow:'hidden'}}>
                            <Routes>
                                <Route element={<Feed />} path="/" />
                                <Route element={<Home />} path="/signup" />
                                <Route element={<Demo />} path="/login" />
                                <Route element={<FriendsView />} path="/friends" />
                                <Route element={<UserProfile/>} path="/profile" />
                                <Route element={<FriendProfileView />} path="/friends/:friend_id" />
                            </Routes>
                        </div>
                    </ScrollToTop>
                <NavbarBottom />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
