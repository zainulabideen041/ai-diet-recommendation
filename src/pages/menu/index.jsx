import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Flame,
  Zap,
  Beef,
  Award,
  Clock,
  Heart,
  Search,
} from "lucide-react";
import {
  bbqData,
  breadsData,
  burgersData,
  chocoData,
  pizzasData,
  chickenData,
} from "../../../dataset/foodItems";

import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const BBQPage = () => {
  // Define categories with their data and display info
  const categories = [
    { key: "bbq", name: "BBQ", data: bbqData, emoji: "🔥" },
    { key: "bread", name: "Breads", data: breadsData, emoji: "🍞" },
    { key: "burger", name: "Burgers", data: burgersData, emoji: "🍔" },
    { key: "pizza", name: "Pizzas", data: pizzasData, emoji: "🍕" },
    { key: "chocolate", name: "Chocolate", data: chocoData, emoji: "🍫" },
    { key: "chickendata", name: "Chicken", data: chickenData, emoji: "🍗" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [data, setData] = useState(categories[0].data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 20;

  // Update data when category changes
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(categories[0].data);

  // Update filtered data when search term or category changes
  useEffect(() => {
    const category = categories.find((cat) => cat.key === selectedCategory);
    if (category) {
      const filtered = category.data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.dsc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page when search or category changes
    }
  }, [searchTerm, selectedCategory]);

  // Get current category info
  const currentCategory = categories.find(
    (cat) => cat.key === selectedCategory
  );
  const categoryDisplayName = currentCategory ? currentCategory.name : "Food";

  // Update the pagination to use filteredData instead of data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handle category selection
  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  // Star rating component
  const StarRating = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span
          className={`ml-1 font-medium ${
            size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs"
          } text-gray-600`}
        >
          ({rating})
        </span>
      </div>
    );
  };

  const navigate = useNavigate();

  const getAiRecommendation = (item) => {
    navigate(`/ai-recommend/${item.name}`, { state: { item } });
  };

  // Modal component
  const Modal = ({ item, onClose }) => {
    if (!item) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="relative h-72">
            <img
              src={item.img}
              alt={item.dsc}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
              <p className="text-lg text-white/90">{item.dsc}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="font-medium">{item.country}</span>
                  </div>
                  <StarRating rating={item.rate} size="lg" />
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 mb-6">
                  <div className="text-center">
                    <div className="flex gap-3">
                      <button
                        onClick={() => getAiRecommendation(item)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                      >
                        Get Ai Recommendation
                      </button>
                      <button className="p-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Beef className="text-red-500" />
                  Nutrition Facts
                </h3>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4 text-center">
                      <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">
                        {item.nutrition?.calories || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center">
                      <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">
                        {item.nutrition?.protein_g || "N/A"}g
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Fat</span>
                      <span className="font-semibold">
                        {item.nutrition?.fat_g || "N/A"}g
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Carbs</span>
                      <span className="font-semibold">
                        {item.nutrition?.carbs_g || "N/A"}g
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Sodium</span>
                      <span className="font-semibold">
                        {item.nutrition?.sodium_mg || "N/A"}mg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pagination
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const showPages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
      let endPage = Math.min(totalPages, startPage + showPages - 1);

      if (endPage - startPage < showPages - 1) {
        startPage = Math.max(1, endPage - showPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-1 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
              currentPage === page
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const MainSection = (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              PREMIUM COLLECTION
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Premium {categoryDisplayName}
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
              Handpicked from legendary sources across the nation. Experience
              authentic flavors delivered to your doorstep.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-red-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>{data.length} Premium Options</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Fast Nationwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span>Top Rated Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Browse Categories
              </h2>
              <p className="text-gray-600">
                Choose from our premium food collections
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => handleCategorySelect(category.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.key
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">
                    ({category.data.length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* // Filter Bar with Search */}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {categoryDisplayName} Collection
              </h3>
              <p className="text-gray-600">
                Showing {Math.min(startIndex + 1, filteredData.length)}-
                {Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} premium{" "}
                {categoryDisplayName.toLowerCase()} options
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>Sort by Price</option>
                <option>Sort by Rating</option>
                <option>Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden"
              >
                {/* Image Container - Only render if item.img exists */}
                {item.img && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.dsc}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Premium Badge */}
                    {item.rate === 5 && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        PREMIUM
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`p-5 ${!item.img ? "pt-6" : ""}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                    {item.dsc}
                  </p>

                  {/* Location & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium truncate">
                        {item.country}
                      </span>
                    </div>
                    <StarRating rating={item.rate} />
                  </div>

                  {/* Nutrition Preview */}
                  {item.nutrition && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span className="text-xs font-medium text-orange-700">
                          {item.nutrition.calories} cal
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-blue-500" />
                        <span className="text-xs font-medium text-blue-700">
                          {item.nutrition.protein_g}g protein
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
        {/* Pagination */}
        <Pagination />
      </div>

      {/* Modal */}
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default BBQPage;
