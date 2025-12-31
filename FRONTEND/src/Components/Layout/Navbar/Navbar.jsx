import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/aimed-removed.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/auth-slice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userRoutes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Menu", path: "/menu" },
    { name: "AI Chat", path: "/aichat" },
    { name: "Contact", path: "/contact" },
  ];

  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());
    if (res.payload?.success) {
      navigate("/");
    }
  };

  const renderLinks = (routes) =>
    routes.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.name}
          to={item.path}
          className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 
            ${
              isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
            }`}
        >
          {item.name}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
      );
    });

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isAuthenticated
                ? renderLinks(userRoutes)
                : renderLinks(publicRoutes)}
            </div>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() =>
                isAuthenticated ? navigate("/profile") : navigate("/login")
              }
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isAuthenticated ? "Profile" : "Get Started"}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="border border-transparent bg-white text-gray-800 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all duration-300"
              >
                Log out
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-md">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {(isAuthenticated ? userRoutes : publicRoutes).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  isAuthenticated ? navigate("/profile") : navigate("/login");
                }}
                className="bg-gradient-to-r hover:cursor-pointer from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300"
              >
                {isAuthenticated ? "Profile" : "Get Started"}
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="border hover:cursor-pointer border-gray-300 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
