import React from 'react';
import { useDrag } from 'react-dnd';
import './Card.css';

const Card = ({ post }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { post },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      <h3>{post.title}</h3>
      {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" />}
    </div>
  );
};

export default Card;
