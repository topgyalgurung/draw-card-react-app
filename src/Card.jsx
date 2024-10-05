import React, { useState } from "react";

const Card = ({ name, image }) => {
  // single object containing three properties
  // values randomly generated within specific range to simulate random position and rotation
  const [{ angle, randomX, randomY }] = useState({
    angle: Math.random() * 90 - 45,
    randomX: Math.random() * 40 - 20,
    randomY: Math.random() * 40 - 20,
  });

  const transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;

  return (
    <img
      className="absolute z-[100] m-auto left-0 right-0"
      alt={name}
      src={image}
      style={{ transform }}
    />
  );
};

export default Card;
