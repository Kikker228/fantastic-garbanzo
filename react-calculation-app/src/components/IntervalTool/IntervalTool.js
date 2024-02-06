import React, { useState } from 'react';
// import './LikertTool.css';

const likertOptions = ["Strongly disagree", "Rather disagree", "Neutral", "Rather agree", "Strongly agree"];

const LikertTool = () => {
  const [selection, setSelection] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/likert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selection }),
    });

    if (response.ok) {
      // Обработайте успешную отправку данных
      console.log('Data sent successfully');
    } else {
      // Обработайте ошибку
      console.error('Failed to send data');
    }
  };

  return (
    <form className="likert-tool" onSubmit={handleSubmit}>
      {likertOptions.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`likert-${option}`}
            name="likert"
            value={option}
            onChange={(e) => setSelection(e.target.value)}
          />
          <label htmlFor={`likert-${option}`}>{option}</label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LikertTool;
