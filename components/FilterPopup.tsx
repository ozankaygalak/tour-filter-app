import React, { useState } from "react";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  theme?: string;
  activity?: string;
  eventType?: string;
  vehicle?: string;
  price?: number;
  startTime?: number;
  groupSize?: number;
  rentalPeriod?: string;
  location?: string;
  features?: string;
  search?: string;
}

export default function FilterPopup({ isOpen, onClose, onApply }: FilterPopupProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
  });

  const handleCategoryChange = (category: string) => {
    setFilters({ category });
  };

  const handleSelect = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const renderFilters = () => {
    switch (filters.category) {
      case "Tours":
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Search Tour</h3>
              <input
                type="text"
                placeholder="Search by name or location"
                value={filters.search || ""}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Theme</h3>
              {["Island Tour", "City Tour", "Safari", "Land Tour"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSelect("theme", theme)}
                  className={`px-3 py-1 rounded-full ${
                    filters.theme === theme ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Activity</h3>
              {["Swimming", "Running", "Snorkelling", "Elephant Care"].map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleSelect("activity", activity)}
                  className={`px-3 py-1 rounded-full ${
                    filters.activity === activity ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Start Time</h3>
              <input
                type="range"
                min="0"
                max="23"
                value={filters.startTime || 12}
                onChange={(e) => setFilters({ ...filters, startTime: Number(e.target.value) })}
                className="w-full"
              />
              <div>{filters.startTime || 12}:00</div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Vehicle</h3>
              {["Speedboat", "Bus", "Catamaran", "Yacht"].map((vehicle) => (
                <button
                  key={vehicle}
                  onClick={() => handleSelect("vehicle", vehicle)}
                  className={`px-3 py-1 rounded-full ${
                    filters.vehicle === vehicle ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {vehicle}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Features</h3>
              {["Halal Food", "Vegetarian Food", "Transfer"].map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleSelect("features", feature)}
                  className={`px-3 py-1 rounded-full ${
                    filters.features === feature ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Group Size</h3>
              <input
                type="range"
                min="1"
                max="100"
                value={filters.groupSize || 10}
                onChange={(e) => setFilters({ ...filters, groupSize: Number(e.target.value) })}
                className="w-full"
              />
              <div>{filters.groupSize || 10} People</div>
            </div>
          </>
        );

      case "Rent":
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Vehicle Type</h3>
              {["Car", "Bike", "Scooter"].map((vehicle) => (
                <button
                  key={vehicle}
                  onClick={() => handleSelect("vehicle", vehicle)}
                  className={`px-3 py-1 rounded-full ${
                    filters.vehicle === vehicle ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {vehicle}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Start Time</h3>
              <input
                type="range"
                min="0"
                max="23"
                value={filters.startTime || 12}
                onChange={(e) => setFilters({ ...filters, startTime: Number(e.target.value) })}
                className="w-full"
              />
              <div>{filters.startTime || 12}:00</div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Rental Period</h3>
              {["Daily", "Weekly", "Monthly"].map((period) => (
                <button
                  key={period}
                  onClick={() => handleSelect("rentalPeriod", period)}
                  className={`px-3 py-1 rounded-full ${
                    filters.rentalPeriod === period ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </>
        );

      case "Tickets":
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Event Type</h3>
              {["Concert", "Museum", "Theater"].map((eventType) => (
                <button
                  key={eventType}
                  onClick={() => handleSelect("eventType", eventType)}
                  className={`px-3 py-1 rounded-full ${
                    filters.eventType === eventType ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {eventType}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Location</h3>
              <input
                type="text"
                placeholder="Enter event location"
                value={filters.location || ""}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        );

      case "Transfer":
        return (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Transfer Type</h3>
              {["Airport", "Hotel", "City"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelect("features", type)}
                  className={`px-3 py-1 rounded-full ${
                    filters.features === type ? "bg-primary-500 text-white" : "border border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Start Time</h3>
              <input
                type="range"
                min="0"
                max="23"
                value={filters.startTime || 12}
                onChange={(e) => setFilters({ ...filters, startTime: Number(e.target.value) })}
                className="w-full"
              />
              <div>{filters.startTime || 12}:00</div>
            </div>
          </>
        );

      default:
        return <p>Please select a category to see filters.</p>;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Filter Options</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Category</h3>
          <div className="flex gap-2">
            {["Tours", "Tickets", "Rent", "Transfer"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full ${
                  filters.category === category ? "bg-primary-500 text-white" : "border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {renderFilters()}

        {filters.category && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            <input
              type="range"
              min="100"
              max="20000"
              value={filters.price || 10000}
              onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
              className="w-full"
            />
            <div>{filters.price || 10000} THB</div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
          <button
            onClick={() => onApply(filters)}
            disabled={!filters.category}
            className={`px-4 py-2 rounded ${filters.category ? "bg-primary-500 text-white" : "bg-gray-300"}`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
