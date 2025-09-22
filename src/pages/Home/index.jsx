import { useState, useEffect } from "react";
import {
  Brain,
  Activity,
  Scan,
  FileText,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
  Play,
  Check,
  Download,
} from "lucide-react";
import Layout from "../../Components/Layout/Layout";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Disease Detection",
      description:
        "Advanced machine learning algorithms analyze symptoms to provide accurate disease predictions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Scan,
      title: "Prescription Scanning",
      description:
        "OCR-powered prescription analysis with medication insights and digital storage",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description:
        "Real-time health tracking with personalized recommendations and alerts",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      title: "Medical Tool Recognition",
      description:
        "Camera-based medical tool identification with usage tutorials",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Users Helped", icon: Users },
    { number: "99.2%", label: "Accuracy Rate", icon: Shield },
    { number: "24/7", label: "AI Support", icon: Zap },
    { number: "4.9", label: "User Rating", icon: Star },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "General Practitioner",
      content:
        "This AI platform has revolutionized how I approach preliminary diagnostics. Incredibly accurate and user-friendly.",
      rating: 5,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0f2fe'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%230277bd'%3EDS%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Michael Chen",
      role: "Health Enthusiast",
      content:
        "The prescription scanning feature saved me hours of research. The AI recommendations are spot-on!",
      rating: 5,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f3e5f5'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%237b1fa2'%3EMC%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Emma Rodriguez",
      role: "Nurse",
      content:
        "Amazing tool for patient education. The medical tool recognition feature is incredibly helpful.",
      rating: 5,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e8f5e8'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%23388e3c'%3EER%3C/text%3E%3C/svg%3E",
    },
  ];

  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Next-Gen{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                AI Health
              </span>{" "}
              Companion
            </h1>
          </div>

          <div className="animate-fade-in-delay-200">
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered healthcare platform providing instant
              disease diagnosis, prescription analysis, and personalized health
              recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>Start Diagnosis</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/80 backdrop-blur text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Floating feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  activeFeature === index
                    ? "ring-2 ring-blue-500 shadow-2xl scale-105"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 1s ease-out forwards",
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const StatsSection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful AI-Driven Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our comprehensive suite of
            AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect width='500' height='400' fill='%23f8fafc'/%3E%3Ccircle cx='250' cy='200' r='80' fill='%23e2e8f0' stroke='%2364748b' stroke-width='2'/%3E%3Cpath d='M200 200 L230 230 L300 160' stroke='%2315803d' stroke-width='4' fill='none'/%3E%3Ctext x='250' y='280' text-anchor='middle' font-size='16' fill='%23374151'%3EAI Health Analysis%3C/text%3E%3Ctext x='250' y='300' text-anchor='middle' font-size='12' fill='%236b7280'%3EPowered by Advanced ML%3C/text%3E%3C/svg%3E"
                alt="AI Health Analysis Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Check className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See what doctors and users are saying about our AI platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Health Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of users who trust our AI-powered health platform for
          accurate diagnoses and personalized care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Start Free Trial</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Download App</span>
          </button>
        </div>
      </div>
    </section>
  );

  // Fixed mainSection - properly defined as JSX component
  const MainSection = (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 1s ease-out;
        }

        .animate-fade-in-delay-200 {
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .animate-fade-in-delay-400 {
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .w-128 {
          width: 32rem;
        }

        .h-128 {
          height: 32rem;
        }
      `}</style>

      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default Home;
