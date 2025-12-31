import {
  Heart,
  Target,
  Eye,
  Shield,
  Users,
  Award,
  TrendingUp,
  Globe,
  Lightbulb,
  Zap,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Brain,
} from "lucide-react";
import Layout from "../../Components/Layout/Layout";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Pushing boundaries with cutting-edge AI technology to transform healthcare delivery",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Accuracy",
      description:
        "Committed to 99.2% precision in disease detection through rigorous testing and validation",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Privacy",
      description:
        "Your health data is sacred. We use enterprise-grade encryption and never share your information",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Accessibility",
      description:
        "Making advanced healthcare AI available to everyone, everywhere, regardless of location",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description:
        "Every feature designed with user experience and patient outcomes as top priorities",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Excellence",
      description:
        "Striving for perfection in every diagnosis, recommendation, and user interaction",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const achievements = [
    {
      icon: Users,
      stat: "50K+",
      label: "Active Users",
      description: "Healthcare professionals and patients worldwide",
    },
    {
      icon: Award,
      stat: "99.2%",
      label: "Accuracy Rate",
      description: "In AI disease detection and diagnosis",
    },
    {
      icon: Globe,
      stat: "50+",
      label: "Countries",
      description: "Global reach across multiple continents",
    },
    {
      icon: TrendingUp,
      stat: "1M+",
      label: "Diagnoses",
      description: "Successful AI-powered health assessments",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      expertise: "AI Healthcare & Clinical Research",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0f2fe'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%230277bd'%3ESM%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Alex Chen",
      role: "Chief Technology Officer",
      expertise: "Machine Learning & AI Architecture",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f3e5f5'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%237b1fa2'%3EAC%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Dr. James Rodriguez",
      role: "Head of Research",
      expertise: "Medical AI & Data Science",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e8f5e8'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%23388e3c'%3EJR%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Emily Zhang",
      role: "Chief Product Officer",
      expertise: "Healthcare UX & Product Strategy",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23fff3e0'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='36' fill='%23e65100'%3EEZ%3C/text%3E%3C/svg%3E",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "Company founded with mission to democratize AI healthcare",
    },
    {
      year: "2021",
      title: "First Product",
      description: "Launched AI disease detection with 95% accuracy",
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Reached 10K users and expanded to 20 countries",
    },
    {
      year: "2023",
      title: "Innovation",
      description: "Achieved 99.2% accuracy and added prescription scanning",
    },
    {
      year: "2024",
      title: "Global Impact",
      description: "50K+ users, 50+ countries, 1M+ diagnoses completed",
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
            Revolutionizing Healthcare{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-delay-200">
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make advanced healthcare accessible to
            everyone through the power of artificial intelligence and machine
            learning.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {achievement.stat}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-gray-600">
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const StorySection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2020, our journey began with a simple yet powerful
              vision: to bridge the gap between advanced medical AI technology
              and everyday healthcare needs.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We recognized that while AI had tremendous potential to transform
              healthcare, it remained inaccessible to most people. Our team of
              medical professionals, AI researchers, and engineers came together
              to change that.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, we're proud to serve over 50,000 users across 50+
              countries, providing accurate AI-powered health insights that
              empower people to take control of their wellbeing.
            </p>

            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Evidence-Based Approach
                </h4>
                <p className="text-gray-600">
                  Every algorithm validated against medical research and
                  clinical data
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Continuous Innovation
                </h4>
                <p className="text-gray-600">
                  Regular updates with latest medical AI breakthroughs
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Global Impact
                </h4>
                <p className="text-gray-600">
                  Serving diverse communities worldwide with localized support
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-blue-200 hover:border-blue-500 transition-colors duration-300"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {milestone.year}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ValuesSection = () => (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const TeamSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-600">
            Experts in AI, medicine, and healthcare innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Join Our Mission
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Be part of the healthcare revolution. Together, we can make advanced
          AI healthcare accessible to everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Get Started</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Join Our Team</span>
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
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default About;
