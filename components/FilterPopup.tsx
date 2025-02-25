import React, { useState } from "react";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  location: string;
  theme: string;
  activity: string;
  price: number;
  startTime: number;
  groupSize: number;
  vehicle: string;
  features: string;
}

export default function FilterPopup({ isOpen, onClose, onApply }: FilterPopupProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    theme: "Island Tour",
    activity: "",
    price: 12500,
    startTime: 17,
    groupSize: 40,
    vehicle: "Catamaran",
    features: "Halal Food",
  });

  if (!isOpen) return null;

  const handleInputChange = (key: keyof FilterState, value: string | number) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Filter</h2>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            placeholder="Where do you want to visit?"
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Theme */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Theme</label>
          <div className="flex gap-2 flex-wrap">
            {["Island Tour", "Land Tour", "Safari"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleInputChange("theme", theme)}
                className={`px-3 py-1 rounded-full ${
                  filters.theme === theme ? "bg-primary-500 text-white" : "border border-gray-300"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Activity</label>
          <div className="flex gap-2 flex-wrap">
            {["Swimming", "Running", "Elephant care", "Snorkelling"].map((activity) => (
              <button
                key={activity}
                onClick={() => handleInputChange("activity", activity)}
                className={`px-3 py-1 rounded-full ${
                  filters.activity === activity ? "bg-primary-500 text-white" : "border border-gray-300"
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="range"
            min="1000"
            max="20000"
            value={filters.price}
            onChange={(e) => handleInputChange("price", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{filters.price} THB</div>
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Start Time</label>
          <input
            type="range"
            min="0"
            max="23"
            value={filters.startTime}
            onChange={(e) => handleInputChange("startTime", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{filters.startTime}:00</div>
        </div>

        {/* Group Size */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Group Size</label>
          <input
            type="range"
            min="1"
            max="100"
            value={filters.groupSize}
            onChange={(e) => handleInputChange("groupSize", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{filters.groupSize} People</div>
        </div>

        {/* Vehicle */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle</label>
          <div className="flex gap-2 flex-wrap">
            {["Yacht", "Speedboat", "Safari", "Catamaran", "Speedcatamaran"].map((vehicle) => (
              <button
                key={vehicle}
                onClick={() => handleInputChange("vehicle", vehicle)}
                className={`px-3 py-1 rounded-full ${
                  filters.vehicle === vehicle ? "bg-primary-500 text-white" : "border border-gray-300"
                }`}
              >
                {vehicle}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Features</label>
          <div className="flex gap-2 flex-wrap">
            {["Transfer", "Halal Food", "Vegetarian Food"].map((feature) => (
              <button
                key={feature}
                onClick={() => handleInputChange("features", feature)}
                className={`px-3 py-1 rounded-full ${
                  filters.features === feature ? "bg-primary-500 text-white" : "border border-gray-300"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Reset & Search Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() =>
              setFilters({
                location: "",
                theme: "Island Tour",
                activity: "",
                price: 12500,
                startTime: 17,
                groupSize: 40,
                vehicle: "Catamaran",
                features: "Halal Food",
              })
            }
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            onClick={() => onApply(filters)}
            className="bg-primary-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
