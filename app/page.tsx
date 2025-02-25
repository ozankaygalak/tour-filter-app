"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FilterPopup from "../components/FilterPopup";
import TourCard from "../components/TourCard";
import { mockTours } from "../data/mockData";

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
}

export default function HomePage() {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState(mockTours);

  const handleApplyFilters = (filters: FilterState) => {
    const filtered = mockTours.filter((tour) => {
      return (
        (!filters.category || tour.category === filters.category) &&
        (!filters.theme || tour.theme === filters.theme) &&
        (!filters.activity || tour.activity === filters.activity) &&
        (!filters.vehicle || tour.vehicle === filters.vehicle) &&
        (!filters.price || tour.price <= filters.price) &&
        (!filters.startTime || tour.startTime <= filters.startTime) &&
        (!filters.groupSize || tour.groupSize <= filters.groupSize) &&
        (!filters.eventType || tour.eventType === filters.eventType) &&
        (!filters.location || tour.location?.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });

    setFilteredTours(filtered);
    setFilterOpen(false);
  };

  return (
    <div>
      <Navbar onFilter={() => setFilterOpen(true)} />

      {isFilterOpen && (
        <FilterPopup
          isOpen={isFilterOpen}
          onClose={() => setFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      )}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
