import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleSuccessfullLogin } from '../../store/userSlice';
// import { Navigate } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);
  const navigate = useNavigate();

  // Check if there is a token in the local storage
  // This useEffect runs when the component is first shown or when 'dispatch' changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Dispatch the successful login action with the token
    if (token) {
      // If a token exists, mark the user as logged in by updating 'logged' to true
      dispatch(handleSuccessfullLogin({ logged: true, token }));
    }
    // - Conditional rendering based on the 'logged' state
    // - If not logged in, navigate to the login page
    // - If logged in, render the HomePage component
    if (!logged) {
      navigate('/login');
    }
    // The useEffect updates the state whenever there is a change in 'dispatch', 'logged', or 'navigate'.
    // add navigate due to eslint
  }, [dispatch, logged, navigate]);
  return (
    <Routes>
      {/* Routes accessible to all users, whether logged in or not */}
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-coloc" element={<SignUpColocPage />} />
      {/*  !created ? {<SignUpColocPage />} : <Navigate to="/create-profil" / > */}
      <Route path="/join-coloc" element={<SignJoinColocPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/" element={<HomePage />} />

      {/* Protected routes requiring login */}
      {!logged ? '' : <Route path="/profile" element={<ProfilePage />} />}
      {!logged ? '' : <Route path="/profile/:user" element={<ProfilePage />} />}
      {!logged ? '' : <Route path="/rules" element={<RulesPage />} />}
      {!logged ? '' : <Route path="/events" element={<CalendarPage />} />}
      {!logged ? '' : <Route path="/messaging" element={<MessagePage />} />}
      {!logged ? '' : <Route path="/vote" element={<VotePage />} />}
      {!logged ? '' : <Route path="/expenses" element={<ExpensesPage />} />}
      {!logged ? '' : <Route path="/tasks" element={<TaskPage />} />}
      {!logged ? '' : <Route path="/settings" element={<SettingPage />} />}
      {!logged ? '' : <Route path="/faq" element={<FaqPage />} />}
      {!logged ? (
        ''
      ) : (
        <Route path="/shopping-list" element={<ShoppingPage />} />
      )}

      {/*  {logged ? <Route path="/" element={<HomePage />} /> : navigate('/login')} */}
      {/* Redirect to the NotFoundPage if the route is not found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
