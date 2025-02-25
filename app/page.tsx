"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FilterPopup from "../components/FilterPopup";
import TourCard from "../components/TourCard";
import { mockTours } from "../data/mockData";

interface FilterState {
  price: number;
  selectedCategory: string;
  selectedTheme?: string;
  startTime?: number;
  groupSize?: number;
}

export default function HomePage() {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState(mockTours);

  const handleApplyFilters = (filters: FilterState) => {
    const filtered = mockTours.filter(
      (tour) =>
        tour.price <= filters.price &&
        tour.category === filters.selectedCategory &&
        (filters.selectedTheme ? tour.theme === filters.selectedTheme : true)
    );
    setFilteredTours(filtered);
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
