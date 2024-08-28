import { useState } from 'react';

const TextArea = ({ required, errorMsg }) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const handleStartInteraction = () => {
    setTouched(true);
  };

  const handleEndInteraction = (e) => {
    const value = e.target.value.trim();
    if (touched && required && !value) {
      setError(errorMsg || 'This field is required.');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <textarea
        rows="3"
        // className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} focus:border-gray-300`}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${error ? 'border-red-500' : 'border-none'} leading-tight focus:outline-none focus:shadow-outline text-sm`}
        required={required}
        onFocus={handleStartInteraction}
        onBlur={handleEndInteraction}
      ></textarea>
     
    </div>
  );
};

export default TextArea;
