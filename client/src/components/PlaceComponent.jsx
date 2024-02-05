// PlaceComponent.js
import React, { useState, useEffect } from 'react';

const PlaceComponent = ({ placeId, apiKey }) => {
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    // Fetch place details using the Google Places API
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4`)
      .then(response => response.json())
      .then(data => {
        setPlaceDetails(data.result);
      })
      .catch(error => console.error('Error fetching place details:', error));
  }, [placeId, apiKey]);

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
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${placeDetails.photos[0].photo_reference}&key=AIzaSyDIuxBMcKkqEuKFRKztTtkIWXX6gnt-Lf4`}
          alt="Place Photo"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      )}
    </div>
  );
};

export default PlaceComponent;


// 1. The component takes placeId and apiKey as props.
// 2. It uses the useEffect hook to make an API request to fetch place details when the component mounts or when placeId or apiKey changes.
// 3. The fetched data is stored in the placeDetails state.
// 4. The component checks if the place has photos (hasPhotos) by verifying if the placeDetails.photos array exists and has at least one element.
// 5. If there are photos, it renders an img element with the photo reference obtained from placeDetails.photos[0].photo_reference.