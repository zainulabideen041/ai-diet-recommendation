import { useState } from "react";
import {
  Brain,
  Activity,
  Scan,
  FileText,
  Shield,
  Zap,
  Lock,
  Cloud,
  Smartphone,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Layout from "../../Components/Layout/Layout";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const mainFeatures = [
    {
      icon: Brain,
      title: "AI Disease Detection",
      description:
        "Advanced machine learning algorithms analyze symptoms to provide accurate disease predictions with 99.2% accuracy rate",
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Multi-symptom analysis engine",
        "Real-time disease probability scoring",
        "Evidence-based recommendations",
        "Integration with medical databases",
      ],
    },
    {
      icon: Scan,
      title: "Prescription Scanning",
      description:
        "OCR-powered prescription analysis with medication insights, drug interactions, and digital storage",
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Instant prescription digitization",
        "Drug interaction warnings",
        "Dosage tracking & reminders",
        "Secure cloud storage",
      ],
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description:
        "Real-time health tracking with personalized recommendations, alerts, and comprehensive analytics",
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Continuous vital signs tracking",
        "Personalized health insights",
        "Anomaly detection alerts",
        "Historical trend analysis",
      ],
    },
    {
      icon: FileText,
      title: "Medical Tool Recognition",
      description:
        "Camera-based medical tool identification with detailed usage tutorials and safety guidelines",
      gradient: "from-orange-500 to-red-500",
      details: [
        "Instant tool identification",
        "Step-by-step usage guides",
        "Safety precautions",
        "Video tutorials library",
      ],
    },
  ];

  const capabilities = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security with end-to-end encryption",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Results in under 3 seconds with 99.9% uptime",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Access your health data anywhere, anytime",
    },
    {
      icon: Smartphone,
      title: "Multi-Platform",
      description: "Works seamlessly on web, iOS, and Android",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is encrypted and never shared",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Available in 50+ countries and 20+ languages",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Accuracy",
      stat: "99.2%",
      description: "Disease detection accuracy rate",
    },
    {
      icon: TrendingUp,
      title: "Efficiency",
      stat: "10x",
      description: "Faster than traditional diagnosis",
    },
    {
      icon: Users,
      title: "Trust",
      stat: "50K+",
      description: "Healthcare professionals using our platform",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      stat: "24/7",
      description: "AI-powered support availability",
    },
  ];

  const HeroSection = () => (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Powerful{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Driven
            </span>{" "}
            Features
          </h1>
        </div>

        <div className="animate-fade-in-delay-200">
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with our comprehensive suite of
            intelligent tools designed to revolutionize your health journey.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <span>Explore Features</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );

  const MainFeaturesSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge AI technology powering your health decisions
          </p>
        </div>

        <div className="space-y-20">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <div className="relative">
                    <div
                      className={`relative z-10 bg-gradient-to-br ${feature.gradient} bg-opacity-10 p-8 rounded-3xl`}
                    >
                      <img
                        src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect width='500' height='400' fill='%23f8fafc' rx='20'/%3E%3Ccircle cx='250' cy='200' r='80' fill='%23e2e8f0' stroke='%2364748b' stroke-width='2'/%3E%3Cpath d='M200 200 L230 230 L300 160' stroke='%2315803d' stroke-width='4' fill='none'/%3E%3Ctext x='250' y='280' text-anchor='middle' font-size='18' fill='%23374151' font-weight='600'%3E${feature.title}%3C/text%3E%3Ctext x='250' y='305' text-anchor='middle' font-size='14' fill='%236b7280'%3EPowered by AI%3C/text%3E%3C/svg%3E`}
                        alt={feature.title}
                        className="w-full h-auto rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-lg animate-pulse`}
                    >
                      <Sparkles className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const CapabilitiesSection = () => (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Platform Capabilities
          </h2>
          <p className="text-xl text-gray-600">
            Built for security, speed, and accessibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const BenefitsSection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-blue-100">
            Trusted by healthcare professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {benefit.stat}
                </div>
                <div className="text-lg font-semibold text-blue-100 mb-1">
                  {benefit.title}
                </div>
                <div className="text-blue-200">{benefit.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Experience AI Health?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of users who trust our platform for accurate diagnoses
          and personalized care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Start Free Trial</span>
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );

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

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

      <HeroSection />
      <MainFeaturesSection />
      <CapabilitiesSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default Features;
