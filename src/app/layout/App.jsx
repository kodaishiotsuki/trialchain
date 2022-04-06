import React from "react";
import { useLocation, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/Home/HomePage";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import TrialList from "../../features/user/TrialList";
import UserTypePage from "../../features/auth/UserTypePage";
import TrialResult from "../../features/user/TrialResult";
import UserList from "../../features/company/UserList";
import TrialUserList from "../../features/company/TrialUserList";

function App() {
  const { key } = useLocation();
  //初期化
  const { initialized } = useSelector((state) => state.async);
  if (!initialized) return <LoadingComponent content='Loading app...' />;
  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path='/usertype' component={UserTypePage} />
      <Route
        //Homeページでナビゲーションバーを非表示にする
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/trial' component={TrialList} />
              <Route path='/trialResult' component={TrialResult} />
              <Route path='/userList' component={UserList} />
              <Route path='/trialUserList' component={TrialUserList} />
              <Route path='/events/:id' component={EventDetailedPage} />

              {/* 同じコンポーネントを開くためのroute */}
              {/* PrivateRoute→アクセス制限 */}
              <PrivateRoute
                key={key}
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
              <PrivateRoute path='/account' component={AccountPage} />
              <PrivateRoute path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
