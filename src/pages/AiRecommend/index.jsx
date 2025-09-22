import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aiRecommend, setCurrentRecommendation } from "../../redux/ai-slice";
import Layout from "../../Components/Layout/Layout";
import { useLocation } from "react-router-dom";
import Loader from "../../loader";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  HeartPulse,
  Clock,
  Lightbulb,
  Zap,
  Star,
  Leaf,
  Target,
  TrendingUp,
  History,
  ChevronRight,
  Calendar,
  User,
  Apple,
  ArrowLeft,
} from "lucide-react";

const AiRecommendation = () => {
  const dispatch = useDispatch();
  const { aiRecommendations, currentRecommendation, isLoading } = useSelector(
    (state) => state.ai
  );
  const { state } = useLocation();
  const item = state?.item;
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (item) {
        await dispatch(aiRecommend(item));
      }
      console.log("no item");
    };
    getData();
  }, [dispatch, item]);

  // Use currentRecommendation if available, otherwise fall back to the first recommendation
  const recommendation = currentRecommendation || aiRecommendations[0] || {};

  const getRecommendationStyle = (rec) => {
    switch (rec) {
      case "yes":
        return {
          icon: <CheckCircle className="w-12 h-12" />,
          gradient: "from-emerald-400 via-green-500 to-teal-600",
          glowColor: "shadow-emerald-500/50",
          bgColor: "from-emerald-50/80 to-green-100/60",
          borderColor: "border-emerald-200/60",
          label: "Recommended ✅",
          emoji: "✨",
          accentColor: "text-emerald-600",
        };
      case "no":
        return {
          icon: <XCircle className="w-12 h-12" />,
          gradient: "from-red-400 via-rose-500 to-pink-600",
          glowColor: "shadow-red-500/50",
          bgColor: "from-red-50/80 to-rose-100/60",
          borderColor: "border-red-200/60",
          label: "Not Recommended ❌",
          emoji: "⚠️",
          accentColor: "text-red-600",
        };
      case "moderate":
        return {
          icon: <AlertTriangle className="w-12 h-12" />,
          gradient: "from-amber-400 via-yellow-500 to-orange-500",
          glowColor: "shadow-amber-500/50",
          bgColor: "from-amber-50/80 to-yellow-100/60",
          borderColor: "border-amber-200/60",
          label: "Moderation ⚖️",
          emoji: "⚖️",
          accentColor: "text-amber-600",
        };
      default:
        return {
          icon: <Sparkles className="w-12 h-12" />,
          gradient: "from-slate-400 via-gray-500 to-slate-600",
          glowColor: "shadow-gray-500/50",
          bgColor: "from-gray-50/80 to-slate-100/60",
          borderColor: "border-gray-200/60",
          label: "Pending...",
          emoji: "🤔",
          accentColor: "text-gray-600",
        };
    }
  };

  const style = getRecommendationStyle(recommendation.recommendation);

  const FloatingParticle = ({
    delay = 0,
    size = "w-2 h-2",
    color = "bg-white/20",
  }) => (
    <motion.div
      className={`absolute rounded-full ${size} ${color}`}
      animate={{
        y: [-20, -100],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  const SectionCard = ({ title, icon, children, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.3 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
      <div
        className={`relative backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
          color || "border-gray-200/60"
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="text-gray-700 leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSelectRecommendation = (rec) => {
    dispatch(setCurrentRecommendation(rec));
    setShowHistory(false);
  };

  const HistoryPanel = () => (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-96 bg-white/95 backdrop-blur-xl border-l border-white/30 shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <History className="w-6 h-6" />
            Previous Recommendations
          </h3>
          <button
            onClick={() => setShowHistory(false)}
            className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {aiRecommendations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No previous recommendations yet
            </p>
          ) : (
            aiRecommendations.map((rec, index) => {
              const recStyle = getRecommendationStyle(rec.recommendation);
              const isActive = currentRecommendation?.id === rec.id;

              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectRecommendation(rec)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isActive
                      ? "bg-blue-50/80 border-blue-200/60"
                      : "bg-white/60 border-white/30 hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          recStyle.accentColor === "text-emerald-600"
                            ? "bg-emerald-500"
                            : recStyle.accentColor === "text-red-600"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {typeof rec.foodItem === "string"
                          ? rec.foodItem
                          : rec.foodItem?.name || "Unknown Item"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(rec.analyzedAt || rec.timestamp)}
                    </div>
                  </div>

                  <div
                    className={`text-xs mt-2 px-2 py-1 rounded-full inline-block ${recStyle.bgColor}`}
                  >
                    {recStyle.label}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );

  const UserHealthCard = () => {
    if (
      !recommendation.userHealth ||
      Object.keys(recommendation.userHealth).length === 0
    ) {
      return null;
    }

    return (
      <SectionCard
        title="Your Health Profile"
        icon={<User className="text-blue-600 w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(recommendation.userHealth).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 rounded-xl bg-blue-50/50 backdrop-blur-sm border border-blue-100/50"
            >
              <span className="font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-gray-600">
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  };

  const FoodItemCard = () => {
    if (!recommendation.foodItem) {
      return null;
    }

    const foodItem = recommendation.foodItem;

    // Helper function to format nutrition data
    const formatNutritionData = (nutritionString) => {
      try {
        // Remove the outer quotes and parse as JSON
        const cleanString = nutritionString.replace(/^"|"$/g, "");
        const nutritionObj = JSON.parse(cleanString);
        return nutritionObj;
      } catch (error) {
        return null;
      }
    };

    // Helper function to check if URL is an image
    const isImageUrl = (url) => {
      return (
        typeof url === "string" &&
        (url.includes("imgur.com") ||
          url.match(/\.(jpg|jpeg|png|gif|webp)/) ||
          url.includes("image"))
      );
    };

    return (
      <SectionCard
        title="Food Item Details"
        icon={<Apple className="text-orange-600 w-6 h-6" />}
      >
        <div className="space-y-4">
          {typeof foodItem === "string" ? (
            <div className="p-4 rounded-xl bg-orange-50/50 backdrop-blur-sm border border-orange-100/50">
              <div className="flex items-center gap-3">
                <Apple className="w-6 h-6 text-orange-500" />
                <span className="text-lg font-medium text-gray-700">
                  {foodItem}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(foodItem).map(([key, value]) => {
                // Skip ID field
                if (key === "id" || key === "_id") {
                  return null;
                }

                // Handle image URLs
                if (isImageUrl(value)) {
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-orange-50/50 backdrop-blur-sm border border-orange-100/50"
                    >
                      <h4 className="font-medium text-gray-700 capitalize mb-3">
                        {key.replace(/([A-Z])/g, " $1")}
                      </h4>
                      <div className="flex justify-center">
                        <img
                          src={value}
                          alt={foodItem.name || "Food item"}
                          className="max-w-48 max-h-48 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div className="hidden p-8 text-center text-gray-500">
                          <Apple className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                          <p>Image not available</p>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Handle nutrition data
                if (key.toLowerCase() === "nutrition") {
                  const nutritionData = formatNutritionData(value);
                  if (nutritionData) {
                    return (
                      <div
                        key={key}
                        className="p-4 rounded-xl bg-orange-50/50 backdrop-blur-sm border border-orange-100/50"
                      >
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-green-500" />
                          Nutrition Information
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(nutritionData).map(
                            ([nutrient, amount]) => (
                              <div
                                key={nutrient}
                                className="bg-white/60 p-3 rounded-lg border border-orange-100/30"
                              >
                                <div className="text-sm font-medium text-gray-600 capitalize">
                                  {nutrient.replace(/_/g, " ")}
                                </div>
                                <div className="text-lg font-semibold text-gray-800">
                                  {amount}
                                  {nutrient === "calories"
                                    ? ""
                                    : nutrient.includes("protein") ||
                                      nutrient.includes("carbs") ||
                                      nutrient.includes("fat")
                                    ? "g"
                                    : nutrient.includes("sodium")
                                    ? "mg"
                                    : ""}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    );
                  }
                }

                // Handle regular fields
                return (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-orange-50/50 backdrop-blur-sm border border-orange-100/50"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-gray-600 text-right max-w-xs break-words">
                        {key === "price"
                          ? `${value}`
                          : key === "rate"
                          ? `${value}/5 ⭐`
                          : typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SectionCard>
    );
  };

  const MainSection = (
    <div className="pt-20 min-h-[80vh] bg-gradient-to-br from-slate-50 via-emerald-50/50 to-teal-100/30 relative overflow-hidden flex justify-center items-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
        <motion.div
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* History Panel */}
      <AnimatePresence>{showHistory && <HistoryPanel />}</AnimatePresence>

      {/* History Button */}
      {!isLoading && aiRecommendations.length > 0 && (
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowHistory(true)}
          className="fixed top-24 right-6 z-40 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90"
        >
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              History ({aiRecommendations.length})
            </span>
          </div>
        </motion.button>
      )}

      {isLoading ? (
        <div className="relative z-10">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/30"
        >
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`relative h-52 bg-gradient-to-r ${style.gradient} flex items-center justify-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-white/30"
            >
              <Sparkles className="w-16 h-16" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="absolute z-10">
              <Sparkles className="w-14 h-14 text-white opacity-90" />
            </motion.div>
            <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg z-10">
              AI Food Recommendation
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-6 left-6 text-4xl"
            >
              {style.emoji}
            </motion.div>
            {recommendation.analyzedAt && (
              <div className="absolute bottom-6 right-6 text-white/80 text-sm">
                {formatDate(recommendation.analyzedAt)}
              </div>
            )}
          </motion.div>

          {/* Enhanced Content */}
          <div className="p-8 space-y-6">
            {/* Enhanced Status */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border font-semibold ${style.bgColor} ${style.borderColor} backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10"
              >
                {style.icon}
              </motion.div>
              <span className={`text-xl relative z-10 ${style.accentColor}`}>
                {style.label}
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-auto relative z-10"
              >
                <Star className={`w-6 h-6 ${style.accentColor}`} />
              </motion.div>
            </motion.div>

            {/* Food Item Card */}
            <FoodItemCard />

            {/* User Health Card */}
            <UserHealthCard />

            {/* Enhanced Friendly Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl blur-sm" />
              <p className="relative text-xl text-gray-800 font-medium leading-relaxed p-6 rounded-2xl backdrop-blur-sm bg-white/50 border border-white/30">
                {recommendation.friendlyText}
              </p>
            </motion.div>

            {/* Enhanced Reason */}
            <SectionCard
              title="Why this suggestion?"
              icon={<Target className="text-purple-600 w-6 h-6" />}
            >
              <p className="text-lg">{recommendation.reason}</p>
            </SectionCard>

            {/* Enhanced Benefits */}
            {recommendation.benefits?.length > 0 && (
              <SectionCard
                title="Health Benefits 🌱"
                icon={<TrendingUp className="text-green-600 w-6 h-6" />}
              >
                <div className="space-y-3">
                  {recommendation.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-50/50 backdrop-blur-sm border border-green-100/50"
                    >
                      <Leaf className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Enhanced Side Effects */}
            {recommendation.sideEffects?.length > 0 && (
              <SectionCard
                title="Risks / Side Effects ⚠️"
                icon={<XCircle className="text-red-600 w-6 h-6" />}
              >
                <div className="space-y-3">
                  {recommendation.sideEffects.map((effect, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-50/50 backdrop-blur-sm border border-red-100/50"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">{effect}</span>
                    </motion.div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Enhanced Best Time */}
            {recommendation.bestTimeToEat && (
              <SectionCard
                title="Best Time to Eat 🕒"
                icon={<Clock className="text-blue-600 w-6 h-6" />}
              >
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-cyan-50/50 backdrop-blur-sm border border-blue-100/50">
                  <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700">
                    {recommendation.bestTimeToEat}
                  </p>
                </div>
              </SectionCard>
            )}

            {/* Enhanced Suggestions */}
            {recommendation.suggestions && (
              <SectionCard
                title="Extra Suggestions 💡"
                icon={<Lightbulb className="text-amber-600 w-6 h-6" />}
              >
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/50 to-yellow-50/50 backdrop-blur-sm border border-amber-100/50">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    </motion.div>
                    <p className="text-lg text-gray-700">
                      {recommendation.suggestions}
                    </p>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Enhanced Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-center pt-4"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/30 text-gray-600">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HeartPulse className="w-5 h-5 text-red-500" />
                </motion.div>
                <span>AI-powered nutritional analysis</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default AiRecommendation;
