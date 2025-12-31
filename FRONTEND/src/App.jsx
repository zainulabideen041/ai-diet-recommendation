import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./Components/ScrollToTop";
import NotFoundPage from "./Components/PageNotFound";
import ProtectedRoute from "./Components/Authorization/ProtectedRoute";
import Loader from "./loader";
import "./App.css";

const Login = lazy(() => import("./pages/Authentication/login"));
const AiRecommend = lazy(() => import("./pages/AiRecommend"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));
const AiChat = lazy(() => import("./pages/Aichat"));
const Menu = lazy(() => import("./pages/menu"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ai-recommend/:item?" element={<AiRecommend />} />
            <Route path="/aichat" element={<AiChat />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
