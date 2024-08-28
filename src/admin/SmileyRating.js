import React, { useState } from 'react';
import SmileyOne from '../assetts/smile-1.svg';
import SmileyTwo from '../assetts/smile-2.svg';
import SmileyThree from '../assetts/smile-3.svg';
import SmileyFour from '../assetts/smile-4.svg';
import SmileyFive from '../assetts/smile-5.svg';
const SmileyRating = ({ onRatingSelect }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const smileys = [SmileyOne, SmileyTwo, SmileyThree, SmileyFour, SmileyFive];

  const handleSmileyRatingClick = (rating) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div className="flex space-x-2">
      {smileys.map((smiley, index) => (
        <div
            key={index}
            className={`cursor-pointer w-12 h-12 transition-transform transform ${
                (hoveredRating || selectedRating) >= index + 1 ? 'scale-125' : 'scale-100 opacity-50'
            }`}
            onClick={() => handleSmileyRatingClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            >
            <img
            src={smiley}
            alt={`Smiley ${index + 1}`}
            />
        </div>
      ))}
    </div>
  );
};

export default SmileyRating;
