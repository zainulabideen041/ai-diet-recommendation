import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./layout.css";

const Layout = ({ MainSection }) => {
  return (
    <div className="Layout-Container">
      <div className="navigation">
        <Navbar />
      </div>

      <main className="main-content">{MainSection}</main>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
