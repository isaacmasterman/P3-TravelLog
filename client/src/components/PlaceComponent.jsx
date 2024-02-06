import React, { useState, useEffect } from 'react';

const PlaceComponent = ({ placeId, apiKey }) => {
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    console.log('Current placeId in PlaceComponent:', placeId);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`);

        if (!response.ok) {
          console.error(`Failed to fetch place details. Status: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        console.log('Place details data:', data);
        setPlaceDetails(data.result);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchData();
  }, [placeId]);

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  const hasPhotos = placeDetails.photos && placeDetails.photos.length > 0;

  return (
    <div>
      <h2>{placeDetails.name}</h2>
      <p>{placeDetails.description || 'No description available'}</p>
      {hasPhotos && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${placeDetails.photos[0].photo_reference}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`}
          alt="Place Photo"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      )}
    </div>
  );
};

export default PlaceComponent;