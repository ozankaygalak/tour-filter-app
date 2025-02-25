"use client";
import React from "react";
import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

interface NavbarProps {
  onFilter: () => void;
}

export default function Navbar({ onFilter }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onFilter}
          className="text-primary-500 font-medium hover:underline"
        >
          Apply Filter
        </button>

        {/* Filtre İkonu */}
        <button onClick={onFilter} className="text-primary-500 text-xl">
          <FaBars />
        </button>
      </div>

      <div className="text-xl font-bold">Traveller s Local Market</div>

      <div className="flex items-center gap-4">
        <button className="text-primary-500 hover:text-primary-600">
          <FaHeart size={20} />
        </button>
        <button className="text-primary-500 hover:text-primary-600">
          <FaShoppingCart size={20} />
        </button>
        <button className="text-primary-500 hover:text-primary-600">
          <FaUser size={20} />
        </button>
      </div>
    </nav>
  );
}
