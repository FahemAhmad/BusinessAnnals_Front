import React, { useEffect, useState } from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import jwtDecode from "jwt-decode";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import Footer from "./Components/Shared/Footer";
import "./App.css";
import PrimryNav from "./Components/Shared/PrimaryNav";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Pages/Logout";
import AimScope from "./Pages/AimScope";
import Description from "./Pages/Description";
import SubmissionGuidlines from "./Pages/SubmissionGuidlines";
import AfterSubmission from "./Pages/AfterSubmission";
import SearchResults from "./Pages/SearchResults";
import AllIssues from "./Pages/AllIssues";
import AboutJournal from "./Pages/AboutJournal";
import CurrentIssues from "./Pages/CurrentIssues";
import EditorialBoard from "./Pages/EditorialBoard";
import ViewArticle from "./Pages/ViewArticle";
import RequireChiefEditor from "./Auth/RequireChiefEditor";
import RequireUser from "./Auth/RequireUser";
import RequireEditor from "./Auth/RequireEditor";
import RequireAuth from "./Auth/RequireLoggedIn";
import ScrollToTop from "./Utility/ScrollToTop";
import AuthActivate from "./Pages/AuthActivate";
import { getCookie, getLocalStorage } from "./Auth/auth";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    try {
      const jwt = getCookie("token");
      const extra = getLocalStorage("user");
      const user = jwtDecode(jwt);

      setState({ user });
    } catch (error) {}
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app">
        <PrimryNav user={state} />
        <ScrollToTop />
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login submit={false} />} />
          <Route path="/editorilBoard" element={<EditorialBoard />} />
          <Route path="/allIssues" element={<AllIssues />} />
          <Route path="/currentIssues/:volume" element={<CurrentIssues />} />
          <Route path="/aboutJournal" element={<AboutJournal />} />
          <Route path="/submitpaper" element={<RequireAuth user={state} />} />
          <Route
            path="/viewArticle/:id"
            element={<ViewArticle user={state} />}
          />
          <Route path="/aimScope" element={<AimScope />} />
          <Route
            path="/searchResult"
            element={<SearchResults user={state} />}
          />
          <Route path="/submissionGuide" element={<SubmissionGuidlines />} />
          <Route path="/afterSubmission" element={<AfterSubmission />} />
          <Route path="/description" element={<Description />} />
          <Route
            path="/user/chief/:id/*"
            element={<RequireChiefEditor user={state} />}
          />
          <Route
            path="/user/publisher/:id/*"
            element={<RequireUser user={state} />}
          />
          <Route
            path="/user/editor/:id/*"
            element={<RequireEditor user={state} />}
          />

          <Route path="/auth/activate/:id" element={<AuthActivate />} />
          <Route path="/auth/password/reset/:id" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
