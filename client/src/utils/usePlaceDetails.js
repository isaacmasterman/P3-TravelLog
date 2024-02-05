import { useState, useEffect } from 'react';

const usePlaceDetails = (placeId, apiKey) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeId || !apiKey) return;

    const fetchPlaceDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            console.log("Fetched place details:", data.result);
            setPlaceDetails(data.result);
        } else {
            setError(data.error_message || 'Failed to fetch place details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placeId, apiKey]);

  return { placeDetails, isLoading, error };
};

export default usePlaceDetails;
