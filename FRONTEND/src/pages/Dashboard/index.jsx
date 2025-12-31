import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Activity,
  Heart,
  Target,
  Ruler,
  Weight,
  Apple,
  AlertTriangle,
  Sparkles,
  Crown,
  CheckCircle,
  Zap,
  Flame,
  TrendingUp,
  Award,
  Star,
  Users,
  Clock,
  ChevronRight,
  Edit3,
  Settings,
} from "lucide-react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { myDetails } = useSelector((state) => state.user);

  if (!myDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const health = myDetails.health || {};

  // Helper functions
  const getBMI = () => {
    if (health.height && health.weight) {
      const heightInM = health.height / 100;
      const bmi = health.weight / (heightInM * heightInM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi) => {
    if (!bmi) return null;
    if (bmi < 18.5)
      return { text: "Underweight", color: "text-blue-600", bg: "bg-blue-50" };
    if (bmi < 25)
      return { text: "Normal", color: "text-green-600", bg: "bg-green-50" };
    if (bmi < 30)
      return {
        text: "Overweight",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return { text: "Obese", color: "text-red-600", bg: "bg-red-50" };
  };

  const getActivityIcon = (level) => {
    switch (level) {
      case "sedentary":
        return <Users className="w-5 h-5" />;
      case "light":
        return <Activity className="w-5 h-5" />;
      case "moderate":
        return <TrendingUp className="w-5 h-5" />;
      case "active":
        return <Zap className="w-5 h-5" />;
      case "very active":
        return <Flame className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getGoalIcon = (goal) => {
    switch (goal) {
      case "weight_loss":
        return <TrendingUp className="w-5 h-5 rotate-180" />;
      case "muscle_gain":
        return <Award className="w-5 h-5" />;
      case "maintenance":
        return <Target className="w-5 h-5" />;
      case "balanced":
        return <Star className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const formatGoalText = (goal) => {
    switch (goal) {
      case "weight_loss":
        return "Weight Loss";
      case "muscle_gain":
        return "Muscle Gain";
      case "maintenance":
        return "Maintenance";
      case "balanced":
        return "Balanced Diet";
      default:
        return "Not Set";
    }
  };

  const bmi = getBMI();
  const bmiStatus = getBMIStatus(bmi);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const FloatingElement = ({ children, delay = 0, className = "" }) => (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: [0, -10, 0],
        opacity: 1,
        rotate: [0, 1, 0],
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 0.5 },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const StatCard = ({
    title,
    value,
    icon,
    gradient,
    delay = 0,
    unit = "",
    subtext = "",
  }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      <div
        className={`relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500`}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}
          >
            {icon}
          </div>
          <motion.div whileHover={{ rotate: 5 }} className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {value}
              {unit}
            </div>
            {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
          </motion.div>
        </div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
      </div>
    </motion.div>
  );

  const ProfileCard = () => (
    <motion.div
      variants={itemVariants}
      className="relative col-span-1 md:col-span-2 lg:col-span-3"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 rounded-3xl blur-2xl" />
      <div className="relative backdrop-blur-2xl bg-white/80 border border-white/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-300/20 to-orange-300/20 rounded-full blur-3xl translate-y-24 -translate-x-24" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Avatar Section */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                {myDetails.role === "admin" ? (
                  <Crown className="w-4 h-4 text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-gray-800 mb-2"
              >
                Welcome back, {myDetails.name}! 👋
              </motion.h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{myDetails.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      myDetails.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {myDetails.role === "admin" ? "👑 Admin" : "👤 User"}
                  </span>
                </div>
                {myDetails.isGoogleAuth && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Google Auth
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                Member since{" "}
                {new Date(myDetails.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center hover:cursor-pointer gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const MainSection = (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/30 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-20">
          <div className="w-2 h-2 bg-indigo-300 rounded-full opacity-40" />
        </FloatingElement>
        <FloatingElement delay={1} className="absolute top-40 right-40">
          <div className="w-3 h-3 bg-purple-300 rounded-full opacity-30" />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute bottom-40 left-40">
          <div className="w-2 h-2 bg-pink-300 rounded-full opacity-40" />
        </FloatingElement>
        <FloatingElement delay={3} className="absolute bottom-20 right-20">
          <div className="w-4 h-4 bg-orange-300 rounded-full opacity-20" />
        </FloatingElement>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Header */}
          <ProfileCard />

          {/* Health Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Age"
              value={health.age || "Not set"}
              icon={<Calendar className="w-6 h-6 text-white" />}
              gradient="from-blue-500 to-cyan-500"
              unit={health.age ? " years" : ""}
            />

            <StatCard
              title="Height"
              value={health.height || "Not set"}
              icon={<Ruler className="w-6 h-6 text-white" />}
              gradient="from-green-500 to-emerald-500"
              unit={health.height ? " cm" : ""}
            />

            <StatCard
              title="Weight"
              value={health.weight || "Not set"}
              icon={<Weight className="w-6 h-6 text-white" />}
              gradient="from-purple-500 to-pink-500"
              unit={health.weight ? " kg" : ""}
            />

            {bmi && (
              <StatCard
                title="BMI"
                value={bmi}
                icon={<Activity className="w-6 h-6 text-white" />}
                gradient="from-orange-500 to-red-500"
                subtext={bmiStatus?.text}
              />
            )}
          </div>

          {/* Health Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Info
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      Gender
                    </span>
                    <span className="font-medium text-gray-800 capitalize">
                      {health.gender || "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30">
                    <span className="flex items-center gap-2 text-gray-600">
                      {getActivityIcon(health.activityLevel)}
                      Activity Level
                    </span>
                    <span className="font-medium text-gray-800 capitalize">
                      {health.activityLevel?.replace("_", " ") || "Not set"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/30">
                    <span className="flex items-center gap-2 text-gray-600">
                      {getGoalIcon(health.goal)}
                      Fitness Goal
                    </span>
                    <span className="font-medium text-gray-800">
                      {formatGoalText(health.goal)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Diet & Health Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 to-purple-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Diet & Health
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Dietary Preferences */}
                  <div className="p-4 bg-white/50 rounded-xl border border-white/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Apple className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-700">
                        Dietary Preferences
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {health.dietaryPreferences?.length ? (
                        health.dietaryPreferences.map((pref, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {pref.charAt(0).toUpperCase() + pref.slice(1)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          None specified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="p-4 bg-white/50 rounded-xl border border-white/30">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-gray-700">
                        Allergies
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {health.allergies?.length ? (
                        health.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          None reported
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Medical Conditions */}
                  <div className="p-4 bg-white/50 rounded-xl border border-white/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">
                        Medical Conditions
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {health.medicalConditions?.length ? (
                        health.medicalConditions.map((condition, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">
                          None reported
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center hover:cursor-pointer gap-3 p-4 bg-white/60 hover:bg-white/80 rounded-xl border border-white/40 transition-all duration-300 group"
                >
                  <Settings className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  <span
                    onClick={() => navigate("/profile")}
                    className="font-medium text-gray-700 group-hover:text-gray-800"
                  >
                    Update Health Info
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 hover:cursor-pointer bg-white/60 hover:bg-white/80 rounded-xl border border-white/40 transition-all duration-300 group"
                >
                  <Apple className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                  <span
                    onClick={() => navigate("/menu")}
                    className="font-medium text-gray-700 group-hover:text-gray-800 "
                  >
                    Get AI Recommendation
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center hover:cursor-pointer gap-3 p-4 bg-white/60 hover:bg-white/80 rounded-xl border border-white/40 transition-all duration-300 group"
                >
                  <Clock className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  <span
                    onClick={() => navigate("/ai-recommend")}
                    className="font-medium text-gray-700 group-hover:text-gray-800"
                  >
                    View History
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default UserDashboard;
