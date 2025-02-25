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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Favoriye ekleme/çıkarma
  const toggleFavorite = (tourId: number) => {
    setFavorites((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    );
  };

  // Favori turları filtreleme
  const favoriteTours = mockTours.filter((tour) => favorites.includes(tour.id));

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
      <Navbar 
      onFilter={() => setFilterOpen(true)}
      onShowFavorites={() => setShowFavorites(true)}
      />

      {isFilterOpen && (
        <FilterPopup
          isOpen={isFilterOpen}
          onClose={() => setFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      )}

      {/* Favoriler Modalı */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Favorite Tours</h2>

            {favoriteTours.length > 0 ? (
              favoriteTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  isFavorite={favorites.includes(tour.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <p>No favorites yet.</p>
            )}

            <button
              onClick={() => setShowFavorites(false)}
              className="bg-primary-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} isFavorite={favorites.includes(tour.id)}
          onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}
