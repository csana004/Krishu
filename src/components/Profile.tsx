import { useEffect, useState } from "react";
import {
  User,
  Edit3,
  Save,
  MapPin,
  Phone,
  Mail,
  Leaf,
  PlusCircle,
  Hash,
  FlaskConical,
  Ruler,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "./shared/Header";
import VoiceButton from "./shared/VoiceButton";

interface ProfileProps {
  user: any;
  onBack: () => void;
}

interface Farm {
  name: string;
  gps: string;
  landSize: string;
  soilReport: File | null;
  npkValue?: string;
}

export default function Profile({ user, onBack }: ProfileProps) {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || (language === "en" ? "Ramesh Kumar" : "രമേശ് കുമാർ"),
    age: "45",
    village: language === "en" ? "Kumarakom" : "കുമാരകം",
    district: language === "en" ? "Kottayam" : "കോട്ടയം",
    landSize: language === "en" ? "2.5 acres" : "2.5 ഏക്കർ",
    soilType: language === "en" ? "Clay soil" : "കളിമണ്ണ്",
    crops:
      language === "en" ? "Rice, Pepper, Coconut" : "നെല്ല്, കുരുമുളക്, തെങ്ങ്",
    irrigation: language === "en" ? "Well irrigation" : "കിണർ നനവ്",
    phone: user.phone || "9876543210",
    email: "ramesh@farmer.com",
    kisanId: "",
    npkValue: "", // Added NPK field
    improvementStatus: "", // Tracks improvement
  });

  // Update formData when language changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name:
        user.name || (language === "en" ? "Ramesh Kumar" : "രമേശ് കുമാർ"),
      village: language === "en" ? "Kumarakom" : "കുമാരകം",
      district: language === "en" ? "Kottayam" : "കോട്ടയം",
      landSize: language === "en" ? "2.5 acres" : "2.5 ഏക്കർ",
      soilType: language === "en" ? "Clay soil" : "കളിമണ്ണ്",
      crops:
        language === "en"
          ? "Rice, Pepper, Coconut"
          : "നെല്ല്, കുരുമുളക്, തെങ്ങ്",
      irrigation: language === "en" ? "Well irrigation" : "കിണർ നനവ്",
    }));
  }, [language, user.name]);

  // Multiple farms
  const [farms, setFarms] = useState<Farm[]>([]);
  const [newFarm, setNewFarm] = useState<Farm>({
    name: "",
    gps: "",
    landSize: "",
    soilReport: null,
    npkValue: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFarmChange = (
    field: keyof Farm,
    value: string | File | null
  ) => {
    setNewFarm((prev) => ({ ...prev, [field]: value }));
  };

  const addFarm = () => {
    if (!newFarm.name) return;
    setFarms([...farms, newFarm]);
    setNewFarm({ name: "", gps: "", landSize: "", soilReport: null, npkValue: "" });
  };

  const profileFields = [
    { key: "name", label: t("name"), icon: User },
    { key: "age", label: t("age"), icon: User },
    { key: "village", label: t("village"), icon: MapPin },
    { key: "district", label: t("district"), icon: MapPin },
    { key: "landSize", label: t("landSize"), icon: Leaf },
    { key: "soilType", label: t("soilType"), icon: Leaf },
    { key: "crops", label: t("crops"), icon: Leaf },
    { key: "irrigation", label: t("irrigation"), icon: Leaf },
    { key: "phone", label: t("phone"), icon: Phone },
    { key: "email", label: t("email"), icon: Mail },
    {
      key: "kisanId",
      label: language === "en" ? "Kisan ID" : "കിസാൻ ഐഡി",
      icon: Hash,
    },
    {
      key: "npkValue",
      label: language === "en" ? "NPK Test Value" : "എൻപികെ ടെസ്റ്റ് മൂല്യം",
      icon: FlaskConical,
    },
    {
      key: "improvementStatus",
      label:
        language === "en"
          ? "Crop Improvement Status"
          : "വിള മെച്ചപ്പെടുത്തൽ നില",
      icon: Leaf,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      <Header title={t("profile")} onBack={onBack} />

      <div className="p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {formData.name}
                </h2>
                <p className="text-gray-600">
                  {formData.village}, {formData.district}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-3 rounded-full transition-all ${
                isEditing
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isEditing ? (
                <Save className="w-5 h-5" />
              ) : (
                <Edit3 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {profileFields.map((field) => (
            <div key={field.key} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-2">
                <field.icon className="w-5 h-5 text-gray-500" />
                <label className="font-medium text-gray-700">
                  {field.label}
                </label>
              </div>

              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14"
                  />
                  <VoiceButton
                    onVoiceInput={(text) => handleInputChange(field.key, text)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              ) : (
                <p className="text-gray-800 text-lg bg-gray-50 px-4 py-3 rounded-lg">
                  {formData[field.key as keyof typeof formData]}
                </p>
              )}
            </div>
          ))}

          {/* Lab Suggestion if no improvement */}
          {formData.improvementStatus.toLowerCase() === "no" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
              <p className="text-red-700 font-semibold">
                {language === "en"
                  ? "No improvement observed. We suggest visiting the lab for advanced testing."
                  : "മെച്ചപ്പെടുത്തൽ കണ്ടില്ല. കൂടുതൽ പരിശോധനയ്ക്ക് ലാബ് സന്ദർശിക്കാൻ ശുപാർശ ചെയ്യുന്നു."}
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                {language === "en"
                  ? "Book Online Appointment"
                  : "ഓൺലൈൻ അപോയ്‌മെന്റ് ബുക്ക് ചെയ്യുക"}
              </button>
            </div>
          )}
        </div>

        {/* Multi-farm section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">
            {language === "en" ? "My Farms" : "എന്റെ ഫാമുകൾ"}
          </h3>

          {farms.map((farm, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg mb-2">
              <p className="font-semibold">{farm.name}</p>
              <p className="text-sm">{farm.gps}</p>
              <p className="text-sm">
                {farm.landSize} {language === "en" ? "acres" : "ഏക്കർ"}
              </p>
              {farm.npkValue && (
                <p className="text-sm text-blue-700">
                  {language === "en"
                    ? `NPK Value: ${farm.npkValue}`
                    : `എൻപികെ മൂല്യം: ${farm.npkValue}`}
                </p>
              )}
              {farm.soilReport && (
                <p className="text-sm text-green-700">
                  {language === "en"
                    ? "Soil report uploaded"
                    : "മണ്ണ് റിപ്പോർട്ട് അപ്ലോഡ് ചെയ്തു"}
                </p>
              )}
            </div>
          ))}

          {isEditing && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder={language === "en" ? "Farm name" : "ഫാം പേര്"}
                value={newFarm.name}
                onChange={(e) => handleFarmChange("name", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={
                  language === "en" ? "GPS location" : "ജിപിഎസ് സ്ഥാനം"
                }
                value={newFarm.gps}
                onChange={(e) => handleFarmChange("gps", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Land area (auto-calculated in acres)"
                    : "ഭൂമി വലുപ്പം (ഓട്ടോ-കാൽക്കുലേറ്റ് ചെയ്ത ഏക്കർ)"
                }
                value={newFarm.landSize}
                onChange={(e) => handleFarmChange("landSize", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "NPK Test Value"
                    : "എൻപികെ ടെസ്റ്റ് മൂല്യം"
                }
                value={newFarm.npkValue}
                onChange={(e) => handleFarmChange("npkValue", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div>
                <label className="block text-sm mb-1">
                  {language === "en" ? "Soil Report" : "മണ്ണ് റിപ്പോർട്ട്"}
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFarmChange("soilReport", e.target.files?.[0] || null)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={addFarm}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                <PlusCircle className="w-4 h-4" />
                <span>
                  {language === "en" ? "Add Farm" : "ഫാം ചേർക്കുക"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
