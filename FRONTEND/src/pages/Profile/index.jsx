import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyDetails } from "../../redux/user-slice";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Ruler,
  Weight,
  Activity,
  Heart,
  AlertCircle,
  Save,
  Edit3,
  X,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Layout from "../../Components/Layout/Layout";

const Profile = () => {
  const dispatch = useDispatch();
  const { myDetails } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    health: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      activityLevel: "",
      dietaryPreferences: [],
      allergies: [],
      medicalConditions: [],
      goal: "",
    },
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (myDetails) {
      setFormData({
        name: myDetails.name || "",
        health: {
          age: myDetails.health?.age || "",
          gender: myDetails.health?.gender || "",
          height: myDetails.health?.height || "",
          weight: myDetails.health?.weight || "",
          activityLevel: myDetails.health?.activityLevel || "",
          dietaryPreferences: myDetails.health?.dietaryPreferences || [],
          allergies: myDetails.health?.allergies || [],
          medicalConditions: myDetails.health?.medicalConditions || [],
          goal: myDetails.health?.goal || "",
        },
      });
    }
  }, [myDetails]);

  const handleInputChange = (field, value, isHealth = false) => {
    if (isHealth) {
      setFormData((prev) => ({
        ...prev,
        health: {
          ...prev.health,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (field, value, action = "add") => {
    setFormData((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        [field]:
          action === "add"
            ? [...prev.health[field], value]
            : prev.health[field].filter((item) => item !== value),
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (
      formData.health.age &&
      (formData.health.age < 1 || formData.health.age > 120)
    ) {
      newErrors.age = "Please enter a valid age (1-120)";
    }

    if (
      formData.health.height &&
      (formData.health.height < 50 || formData.health.height > 300)
    ) {
      newErrors.height = "Please enter a valid height (50-300 cm)";
    }

    if (
      formData.health.weight &&
      (formData.health.weight < 20 || formData.health.weight > 500)
    ) {
      newErrors.weight = "Please enter a valid weight (20-500 kg)";
    }

    // Password validation if changing password
    if (showPasswordSection) {
      if (!passwordData.currentPassword.trim()) {
        newErrors.currentPassword = "Current password is required";
      }
      if (!passwordData.newPassword.trim()) {
        newErrors.newPassword = "New password is required";
      } else if (passwordData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Prepare update data according to backend structure
      const updateData = {
        name: formData.name,
        health: formData.health,
      };

      // Add password data if changing password
      if (showPasswordSection) {
        updateData.currentPassword = passwordData.currentPassword;
        updateData.newPassword = passwordData.newPassword;
      }

      const res = await dispatch(updateMyDetails(updateData));

      // Reset password fields and hide password section
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordSection(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Handle specific error for wrong current password
      if (error.response?.status === 401) {
        setErrors({ currentPassword: "Current password is incorrect" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (myDetails) {
      setFormData({
        name: myDetails.name || "",
        health: {
          age: myDetails.health?.age || "",
          gender: myDetails.health?.gender || "",
          height: myDetails.health?.height || "",
          weight: myDetails.health?.weight || "",
          activityLevel: myDetails.health?.activityLevel || "",
          dietaryPreferences: myDetails.health?.dietaryPreferences || [],
          allergies: myDetails.health?.allergies || [],
          medicalConditions: myDetails.health?.medicalConditions || [],
          goal: myDetails.health?.goal || "",
        },
      });
    }
    // Reset password data
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordSection(false);
    setErrors({});
    setIsEditing(false);
  };

  const ArrayInput = ({ label, field, options, placeholder }) => {
    const [inputValue, setInputValue] = useState("");

    const addItem = () => {
      if (
        inputValue.trim() &&
        !formData.health[field].includes(inputValue.trim())
      ) {
        handleArrayChange(field, inputValue.trim(), "add");
        setInputValue("");
      }
    };

    const removeItem = (item) => {
      handleArrayChange(field, item, "remove");
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              {options ? (
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select {label.toLowerCase()}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.health[field].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    className="hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {formData.health[field].length > 0 ? (
              formData.health[field].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic">None specified</span>
            )}
          </div>
        )}
      </div>
    );
  };

  const MainSection = (
    <div className="max-w-4xl mx-auto p-6 space-y-8 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
            <p className="text-blue-100">
              Manage your personal information and health preferences
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            ) : (
              <p className="text-gray-900 font-medium">
                {formData.name || "Not specified"}
              </p>
            )}
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <p className="text-gray-900">
                {myDetails?.email || "Not specified"}
              </p>
              {myDetails?.isGoogleAuth && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Google Auth
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed from this page
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  myDetails?.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {myDetails?.role || "user"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <p className="text-gray-900">
                {myDetails?.createdAt
                  ? new Date(myDetails.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        {isEditing && !myDetails?.isGoogleAuth && (
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">
                  Change Password
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(!showPasswordSection);
                  if (showPasswordSection) {
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setErrors((prev) => {
                      const {
                        currentPassword,
                        newPassword,
                        confirmPassword,
                        ...rest
                      } = prev;
                      return rest;
                    });
                  }
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showPasswordSection
                  ? "Cancel Password Change"
                  : "Change Password"}
              </button>
            </div>

            {showPasswordSection && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.currentPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.newPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Health Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            Health Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.health.age}
                onChange={(e) => handleInputChange("age", e.target.value, true)}
                min="1"
                max="120"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.age ? "border-red-500" : "border-gray-300"
                }`}
              />
            ) : (
              <p className="text-gray-900 font-medium">
                {formData.health.age || "Not specified"} years
              </p>
            )}
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            {isEditing ? (
              <select
                value={formData.health.gender}
                onChange={(e) =>
                  handleInputChange("gender", e.target.value, true)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-gray-900 font-medium capitalize">
                {formData.health.gender || "Not specified"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="number"
                  value={formData.health.height}
                  onChange={(e) =>
                    handleInputChange("height", e.target.value, true)
                  }
                  min="50"
                  max="300"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.height ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span className="absolute right-3 top-2 text-gray-500">cm</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-gray-500" />
                <p className="text-gray-900 font-medium">
                  {formData.health.height || "Not specified"} cm
                </p>
              </div>
            )}
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="number"
                  value={formData.health.weight}
                  onChange={(e) =>
                    handleInputChange("weight", e.target.value, true)
                  }
                  min="20"
                  max="500"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span className="absolute right-3 top-2 text-gray-500">kg</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-gray-500" />
                <p className="text-gray-900 font-medium">
                  {formData.health.weight || "Not specified"} kg
                </p>
              </div>
            )}
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            {isEditing ? (
              <select
                value={formData.health.activityLevel}
                onChange={(e) =>
                  handleInputChange("activityLevel", e.target.value, true)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very active">Very Active</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <p className="text-gray-900 font-medium capitalize">
                  {formData.health.activityLevel || "Not specified"}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Goal
            </label>
            {isEditing ? (
              <select
                value={formData.health.goal}
                onChange={(e) =>
                  handleInputChange("goal", e.target.value, true)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="balanced">Balanced</option>
              </select>
            ) : (
              <p className="text-gray-900 font-medium">
                {formData.health.goal
                  ?.replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()) || "Not specified"}
              </p>
            )}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="border-t pt-6">
          <ArrayInput
            label="Dietary Preferences"
            field="dietaryPreferences"
            options={[
              "vegetarian",
              "vegan",
              "pescatarian",
              "halal",
              "kosher",
              "gluten-free",
              "dairy-free",
              "none",
            ]}
          />
        </div>

        {/* Allergies */}
        <div className="border-t pt-6 mt-6">
          <ArrayInput
            label="Allergies"
            field="allergies"
            placeholder="Add an allergy"
          />
        </div>

        {/* Medical Conditions */}
        <div className="border-t pt-6 mt-6">
          <ArrayInput
            label="Medical Conditions"
            field="medicalConditions"
            placeholder="Add a medical condition"
          />
        </div>
      </div>

      {/* Status Indicators */}
      {myDetails?.banned && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Account Status: Banned</span>
          </div>
        </div>
      )}
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default Profile;
