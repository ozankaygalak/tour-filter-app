import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {useState} from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
const FaHeart = dynamic(() => import("react-icons/fa").then((mod) => mod.FaHeart), {
  ssr: false, // Sunucu tarafında render etme
});

interface Tour {
  id: number;
  name: string;
  image: string;
  location: string;
  oldPrice: number;
  price: number;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
  description?: string;
}

interface TourCardProps {
  tour: Tour;
  isFavorite: boolean;                  // Favori durumu
  onToggleFavorite: (id: number) => void;
}

export default function TourCard({ tour,isFavorite, onToggleFavorite }: TourCardProps) {
  const { name, image, location, oldPrice, price, rating, reviews, discount, category,description } = tour;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Resim Alanı */}
      <div className="relative w-full h-56">
        {/* Tour Etiketi - Resmin Üstünde */}
        <div className="absolute bottom-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded z-20">
          {category}
        </div>

        {/* İndirim Rozeti */}
        {discount && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-20">
            {discount}% OFF
          </div>
        )}

        {/* Favori Butonu */}
        <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500 z-20" onClick={() => onToggleFavorite(tour.id)}>
        <FaHeart className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
        </button>

        {/* Resim */}
        <Image
          src={`/images/${image}`}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Kart İçeriği */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Puan ve Konum Satırı */}
        <div className="flex justify-between items-center mb-2">
          {/* Puan */}
          <div className="flex items-center text-sm text-gray-600">
            <FaStar className="text-yellow-400 mr-1" />
            {rating} ({reviews})
          </div>

          {/* Konum */}
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-1 text-red-500" />
            {location}
          </div>
        </div>

        {/* Tur İsmi */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          {oldPrice && (
            <span className="text-xs text-red-500 line-through">THB {oldPrice}</span>
          )}
        </div>

        {/* Fiyat */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setShowDetails(true)}
            className="text-primary-500 underline">Details <span>&#8594;</span></button>
          <span className="text-primary-600 font-bold text-lg">THB {price}</span>
        </div>

        {/* Book Now Butonu */}
        <button className="mt-auto w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600">
          Book Now
        </button>
      </div>
      {/* 🟠 Modal: Details Popup */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">{name} - Details</h2>

            {/* 📖 Tur Açıklaması */}
            <p className="mb-4 text-gray-700">
              {description || "No additional details available for this tour."}
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Close
              </button>

              <button
                className="bg-primary-500 text-white px-4 py-2 rounded"
                onClick={() => alert(`Booked: ${name}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
