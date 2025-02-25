"use client";
import React from "react";
import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

interface NavbarProps {
  onFilter: () => void;           // Filtre butonu için prop
  onShowFavorites: () => void;    // Favori butonu için prop
}

export default function Navbar({ onFilter, onShowFavorites }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Sol: Menü Butonu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onFilter}
          className="text-primary-500 text-xl"
          aria-label="Open Filter"
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-bold">TripKolic</h1>
      </div>

      {/* Sağ: Favori, Sepet, Profil */}
      <div className="flex items-center gap-4">
        {/* ❤️ Favori Butonu */}
        <button
          onClick={onShowFavorites}  // Favori listesini açar
          className="relative text-gray-600 hover:text-red-500"
          aria-label="Show Favorites"
        >
          <FaHeart className="text-2xl" />
        </button>

        {/* 🛒 Sepet Butonu */}
        <button className="text-gray-600 hover:text-primary-500" aria-label="Cart">
          <FaShoppingCart className="text-2xl" />
        </button>

        {/* 👤 Kullanıcı Profili */}
        <button className="text-gray-600 hover:text-primary-500" aria-label="User Profile">
          <FaUser className="text-2xl" />
        </button>
      </div>
    </nav>
  );
}
