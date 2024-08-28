import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import NumericRating from './NumericRating';
import StarRating from './StarRating';
import SmileyOne from '../assetts/smile-1.svg';
import SmileyTwo from '../assetts/smile-2.svg';
import SmileyThree from '../assetts/smile-3.svg';
import SmileyFour from '../assetts/smile-4.svg';
import SmileyFive from '../assetts/smile-5.svg';
import SmileyRating from './SmileyRating';
import { Button } from '@mui/material';
import TextArea from './TextArea';

const MyGrid = ({ items, onDelete, onEdit, setFields }) => {
  const layout = items.map((item, index) => ({
    i: String(index), // Use index as a string for the layout identification
    x: 0,
    y: index * 2, 
    w: 1,
    h: 2,
  }));

  const smileyImages = [SmileyOne, SmileyTwo, SmileyThree, SmileyFour, SmileyFive];

  const onLayoutChange = (newLayout) => {
    const newItemsOrder = newLayout.map((layoutItem) => items[parseInt(layoutItem.i)]);
    setFields(newItemsOrder);
  };

  const [rating, setRating] = useState(null);
  const handleRatingSelect = (selectedRating) => setRating(selectedRating);

  const [starRating, setStarRating] = useState(null);
  const handleStarRatingSelect = (selectedRating) => setStarRating(selectedRating);

  const [smileyRating, setSmileyRating] = useState(null);
  const handleSmileyRatingSelect = (selectedRating) => setSmileyRating(selectedRating);

  const [isDraggable, setIsDraggable] = useState(true);
  const handleStartInteraction = () => setIsDraggable(false);
  const handleEndInteraction = () => setIsDraggable(true);

  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (e) => setSelectedOption(e.target.value);

  const [category, setCategory] = useState('');
  const handleCategoryClick = (e, item) => setCategory(item);

  return (                                                                                
    <div style={{ width: 400, height: 'fit-content', overflow: 'hidden' }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={1}
        width={400}
        onLayoutChange={onLayoutChange}
        isBounded={true}
        rowHeight={80}
        verticalCompact={true}
        isDraggable={isDraggable}
        isResizable={false}
        useCSSTransforms={false}
      >
        {items.map((item, index) => (
          <div key={index} className="shadow-lg p-3 rounded-md">
            <div className="flex flex-col h-[100%]">
              <p className="text-[14px] mb-1">{item.label}</p>
              {item.field === 'Textarea' && (
                <TextArea required={item.required} errorMsg={item.errorMsg} />
              )}
              {item.field === 'Numeric Rating' && (
                <NumericRating onRatingSelect={handleRatingSelect} onInteractionStart={handleStartInteraction} onInteractionEnd={handleEndInteraction} />
              )}
              {item.field === 'Star Rating' && (
                <StarRating totalStars={5} onRatingSelect={handleStarRatingSelect} onInteractionStart={handleStartInteraction} onInteractionEnd={handleEndInteraction} />
              )}
              {item.field === 'Smiley Rating' && (
                <SmileyRating  onRatingSelect={handleSmileyRatingSelect} onInteractionStart={handleStartInteraction} onInteractionEnd={handleEndInteraction} />
              )}
              {item.field === 'Single line input' && (
                <input
                  type="text"
                  onFocus={handleStartInteraction}
                  onBlur={handleEndInteraction}
                  className="w-full border border-gray-300 focus:border-gray-300"
                />
              )}
              {item.field === 'Radio Button' && (
                <div>
                  {item.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${idx}`}
                        name="options"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleRadioChange}
                        onFocus={handleStartInteraction}
                        onBlur={handleEndInteraction}
                      />
                      <label htmlFor={`option-${idx}`} className="ml-2 text-[14px]">{option}</label>
                    </div>
                  ))}
                </div>
              )}
              {item.field === 'Categories' && (
                <div className="flex gap-2">
                  {item.options.map((option, idx) => (
                    <Button 
                      key={idx}
                      onFocus={handleStartInteraction} 
                      onBlur={handleEndInteraction} 
                      onClick={(e) => handleCategoryClick(e, option)}
                      variant="contained"
                      style={{
                        backgroundColor: category === option ? 'gray' : 'white',
                        color: 'black'
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
              <div className="flex gap-3 float-right items-center mt-auto justify-end text-[#7a7a7a] mb-2">
                <Button 
                  onClick={() => onEdit(index)}
                  onFocus={handleStartInteraction} 
                  onBlur={handleEndInteraction} 
                  style={{
                    color: '#7a7a7a',
                    minWidth: '28px',
                    padding: 0
                  }}
                >
                  <MdModeEdit size={20} />
                </Button>
                <Button 
                  onClick={() => onDelete(index)}
                  onFocus={handleStartInteraction} 
                  onBlur={handleEndInteraction} 
                  style={{
                    color: '#7a7a7a',
                    minWidth: '28px'
                  }}
                >
                  <FaTrash size={17} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default MyGrid;
