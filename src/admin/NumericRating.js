import React, { useState } from 'react';

const NumericRating = ({ onRatingSelect, onInteractionStart, onInteractionEnd }) => {
    const [selectedRating, setSelectedRating] = useState(null);
  
    const handleRatingClick = (e, rating) => {
      e.stopPropagation();
      setSelectedRating(rating);
      onRatingSelect(rating);
    };
  
    return (
      <div
        className="flex space-x-2"
        onMouseDown={onInteractionStart}
        onMouseUp={onInteractionEnd}
      >
        {Array.from({ length: 10 }, (_, index) => index + 1).map((rating) => (
          <button
            key={rating}
            className={`p-2 border rounded ${
              selectedRating === rating ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
            onClick={(e) => handleRatingClick(e, rating)}
          >
            {rating}
          </button>
        ))}
      </div>
    );
  };
  
  
export default NumericRating;