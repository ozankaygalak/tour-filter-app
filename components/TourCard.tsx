import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
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
}

interface TourCardProps {
  tour: Tour;
  isFavorite: boolean;                  // Favori durumu
  onToggleFavorite: (id: number) => void;
}

export default function TourCard({ tour,isFavorite, onToggleFavorite }: TourCardProps) {
  const { name, image, location, oldPrice, price, rating, reviews, discount, category } = tour;

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
        <h3 className="text-lg font-semibold mb-1">{name}</h3>

        {/* Fiyat */}
        <div className="flex justify-between items-center mb-4">
          {oldPrice && (
            <span className="text-xs text-red-500 line-through">THB {oldPrice}</span>
          )}
          <span className="text-primary-600 font-bold text-lg">THB {price}</span>
        </div>

        {/* Book Now Butonu */}
        <button className="mt-auto w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600">
          Book Now
        </button>
      </div>
    </div>
  );
}
