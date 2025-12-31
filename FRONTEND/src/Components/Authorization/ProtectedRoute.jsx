import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { getmyDetails } from "../../redux/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../redux/auth-slice";
import Loader from "../../loader";

const publicRoutes = ["/", "/login"];
const userRoutes = ["dashboard", "menu", "aichat", "profile", "contact"];

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Check login on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Load user details when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getmyDetails());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isLoading) return; // Wait until auth check finishes

    const isPublicRoute = publicRoutes.includes(pathname);
    const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));

    // Redirect `/home` → `/`
    if (pathname === "/home") {
      navigate("/", { replace: true });
      return;
    }

    if (isAuthenticated) {
      if (isPublicRoute) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (isUserRoute) {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, pathname, navigate]);

  // Show loader while checking auth
  if (isLoading) {
    return <Loader />;
  }

  // ✅ Render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
