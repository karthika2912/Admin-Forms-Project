import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ totalStars = 5, onRatingSelect }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalStars }, (_, index) => index + 1).map((rating) => (
        <FaStar
          key={rating}
          size={24}
          className={`cursor-pointer ${
            (hoveredRating || selectedRating) >= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => handleRatingClick(rating)}
          onMouseEnter={() => handleMouseEnter(rating)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default StarRating;
