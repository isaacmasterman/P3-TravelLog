// PlaceInfo.js
import React from 'react';

const PlaceInfo = ({ name, description, rating, photos, onButtonClick }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      {rating && <p>Rating: {rating}</p>}
      {photos && photos.length > 0 && (
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`} alt="Place" />
      )}
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
};

export default PlaceInfo;
