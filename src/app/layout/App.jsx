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
import UserList from "../../features/company/UserList";
import TrialUserList from "../../features/company/TrialUserList";
import UserProfilePage from "../../features/profiles/profilePage/UserProfilePage";
import ChatPage from "../../features/chat/ChatPage";
import MatchUserList from "../../features/companyMember/MatchUserList";
import CompanyNavBar from "../../features/nav/CompanyNavBar";
import DecidedCompanyList from "../../features/user/DecidedCompanyList";
import DecidedUserList from "../../features/company/DecidedUserList";
import TrialForm from "../../features/company/TrialForm";
import OfferCompanyList from "../../features/user/OfferCompanyList";
import CompanyHomePage from "../../features/company/CompanyHomePage";
import OfferUserList from "../../features/company/OfferUserList";
import MatchUser from "../../features/company/MatchUser";
import MatchCompany from "../../features/user/MatchCompany";
import TrialUserProfilePage from "../../features/profiles/profilePage/TrialUserProfilePage";
import MeetyDashbord from "../../features/meety/meetyDashbord/MeetyDashbord";
import MeetyForm from "../../features/meety/meetyForm/MeetyForm";
import MeetyCompanyList from "../../features/meety/meetyUser/MeetyCompanyList";
import MeetyUserList from "../../features/meety/meetyCompany/MeetyUserList";

function App() {
  const { key,meetykey } = useLocation();
  //初期化
  const { initialized } = useSelector((state) => state.async);
  if (!initialized) return <LoadingComponent content='Loading app...' />;
  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path='/userType' component={UserTypePage} />
      <Route
        //Homeページでナビゲーションバーを非表示にする
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <CompanyNavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/meety' component={MeetyDashbord} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              {/* 求職者側 */}
              <PrivateRoute path='/trial' component={TrialList} />
              <PrivateRoute path='/meetyCompany' component={MeetyCompanyList} />
              <PrivateRoute path='/offerCompany' component={OfferCompanyList} />
              <PrivateRoute path='/matchCompany' component={MatchCompany} />
              <PrivateRoute
                path='/decidedCompany'
                component={DecidedCompanyList}
              />
              {/* 会社側 */}
              <PrivateRoute path='/companyHome' component={CompanyHomePage} />
              <PrivateRoute path='/userList' component={UserList} />
              <PrivateRoute path='/trialUserList' component={TrialUserList} />
              <PrivateRoute path='/offerUserList' component={OfferUserList} />
              <PrivateRoute path='/matchUser' component={MatchUser} />
              <PrivateRoute path='/decidedUser' component={DecidedUserList} />
              <PrivateRoute path='/trialForm/:id' component={TrialForm} />
              <PrivateRoute path='/meetyUser' component={MeetyUserList} />

              {/* 会社のメンバー */}
              <PrivateRoute path='/matchUserList' component={MatchUserList} />
              {/* <PrivateRoute path='/decidedUser' component={DecidedUserList} /> */}

              {/* チャット */}
              <PrivateRoute path='/chat/:id' component={ChatPage} />
              {/* 同じコンポーネントを開くためのroute */}
              {/* PrivateRoute→アクセス制限 */}
              <PrivateRoute
                key={key}
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
              <PrivateRoute
                key={meetykey}
                path={["/createMeety", "/manageMeety/:id"]}
                component={MeetyForm}
              />
              <PrivateRoute path='/account' component={AccountPage} />
              <PrivateRoute path='/profile/:id' component={ProfilePage} />
              <PrivateRoute
                path='/userProfile/:id'
                component={UserProfilePage}
              />
              <PrivateRoute
                path='/trialUserProfile/:id'
                component={TrialUserProfilePage}
              />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
