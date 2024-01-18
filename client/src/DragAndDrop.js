import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import axios from 'axios';
import './DragAndDropSection.css';
import { FaPlusCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';



const DragAndDrop = ({ cards }) => {
  const [droppedCards, setDroppedCards] = useState([]);
  const [safetyCheckResult, setSafetyCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      setDroppedCards((prevCards) => [...prevCards, item.post]);
    },
  });

  const handleRemoveCard = (index) => {
    setDroppedCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  const handleCheckForSafety = () => {
    setLoading(true);
    axios.post('http://localhost:8000/api/checkForSafety', { droppedCards })
      .then(response => {
        setSafetyCheckResult(response.data.success);
      })
      .catch(error => {
        console.error('Error checking for safety:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
    <div className="drag-container" ref={drop}>
    <div className="plus-icon">
    <FaPlusCircle size={64} color='green' />
  </div>
      <div className="drag-card-container">
      </div>
      <div className="dropped-cards">
        <h3>Drag and drop one of the ads here</h3>
        {droppedCards.map((droppedCard, index) => (
          <div key={index} className="dropped-card">
            <p>Title: {droppedCard.title}</p>
            {droppedCard.thumbnail && <img src={droppedCard.thumbnail} alt="Thumbnail" />}
            <div style={{ align: 'center' }}>
            <button onClick={() => handleRemoveCard(index)}
            style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px',
                border: 'none',
                fontSize: '16px',
              }}
            >Remove</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="check-button-container" style={{ width: '100%', textAlign: 'center' }}>
      <button
      onClick={handleCheckForSafety}
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        border: 'none',
        fontSize: '16px',
      }}
    >
      Check for Safety
    </button>
    {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )}
    {safetyCheckResult !== null && (
      <div className={`safety-check-result ${safetyCheckResult ? 'safety-passed' : 'safety-failed'}`}>
        {safetyCheckResult ? 'You can post this ad as it doesn\'t contain malware or adult materials' : 'You cannot post this ad as it contains malware or adult materials'}
      </div>
    )}
</div>
    </div>
  );
};

export default DragAndDrop;
