import {
  ArrowRight,
  Brain,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Logo from "./assets/aimed-removed.png";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex space-x-2 mb-6">
            <img src={Logo} alt="" className="h-16 w-auto" />
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Revolutionary AI-powered healthcare platform providing instant
            disease diagnosis, prescription analysis, and personalized health
            recommendations.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {[
              "Home",
              "Features",
              "Scan Prescription",
              "Health Prediction",
              "Blog",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <Mail className="h-5 w-5 mr-3" />
              support@cureai.com
            </li>
            <li className="flex items-center text-gray-400">
              <Phone className="h-5 w-5 mr-3" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center text-gray-400">
              <MapPin className="h-5 w-5 mr-3" />
              San Francisco, CA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 cure<span className="text-blue-400 font-bold">AI</span>. All
            Rights Reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
