import './App.scss';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { persistValuesState } from '../../store/userSlice';
import WelcomePage from '../pages/authentication/Welcome/WelcomePage';
import LoginPage from '../pages/authentication/Login/LoginPage';
import SignUpPage from '../pages/authentication/SignUp/SignUpPage';
import SignUpColocPage from '../pages/authentication/SignUpColoc/SignUpColocPage';
import SignJoinColocPage from '../pages/authentication/SignJoinColoc/SignJoinColocPage';
import CreateProfilePage from '../pages/authentication/CreateProfile/CreateProfilePage';
import HomePage from '../pages/Home/HomePage';
import ProfilePage from '../pages/Profile/ProfilePage';
import RulesPage from '../pages/Rules/RulesPage';
import CalendarPage from '../pages/Calendar/CalendarPage';
import ShoppingPage from '../pages/Shopping/ShoppingPage';
import MessagePage from '../pages/Message/MessagePage';
import VotePage from '../pages/Vote/VotePage';
import ExpensesPage from '../pages/Expense/ExpensePage';
import TaskPage from '../pages/Task/TaskPage';
import SettingPage from '../pages/Setting/SettingPage';
import FaqPage from '../pages/Faq/FaqPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import ProfileUserPage from '../pages/ProfileUser/ProfileUserPage';

function App() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user.userData);
  // console.log('userId', userData);
  const users = useSelector((state) => state.user.users);
  const colocs = users.filter((user) => user.id !== userData.userId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const settingInfo = JSON.parse(localStorage.getItem('settingInfo'));
    // console.log('settingUser dans app', settingInfo);
    // Check if there is a token in the local storage
    // This useEffect runs when the component is first shown or when 'dispatch' changes
    if (token) {
      dispatch(persistValuesState({ token, user, logged: true, settingInfo }));
    }
    // Set loading to false once the initial processing is done
    setLoading(false);
  }, [dispatch]);

  // useEffect to display /create-profile page if is the first connection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && !user.firstname && !user.birthdate) {
      // Redirects to the profile creation page
      navigate('/create-profile');
    }
  }, [navigate]);

  // If still loading, you can show a loading spinner or any other indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`backgroundApp ${!logged ? 'backgroungAuth' : ''}`}>
      <Routes>
        {/* Routes accessible to all users, whether logged in or not */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup-coloc" element={<SignUpColocPage />} />
        {/*  !created ? {<SignUpColocPage />} : <Navigate to="/login" / > */}
        <Route path="/join-coloc" element={<SignJoinColocPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />

        {/* Protected routes requiring login */}
        {logged ? (
          <>
            {' '}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:colocId" element={<ProfileUserPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/events" element={<CalendarPage />} />
            <Route path="/messaging" element={<MessagePage />} />
            <Route path="/vote" element={<VotePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/shopping-list" element={<ShoppingPage />} />
            <Route path="/" element={<HomePage />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/profile/:userId" element={<Navigate to="/login" />} />
            <Route path="/rules" element={<Navigate to="/login" />} />
            <Route path="/events" element={<Navigate to="/login" />} />
            <Route path="/messaging" element={<Navigate to="/login" />} />
            <Route path="/vote" element={<Navigate to="/login" />} />
            <Route path="/expenses" element={<Navigate to="/login" />} />
            <Route path="/tasks" element={<Navigate to="/login" />} />
            <Route path="/settings" element={<Navigate to="/login" />} />
            <Route path="/faq" element={<Navigate to="/login" />} />
            <Route path="/shopping-list" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Redirect to the NotFoundPage if the route is not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
