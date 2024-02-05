import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LIST } from '../utils/queries';

const SingleListComponent = ({ listId }) => {
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id: listId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { list } = data;

  return (
    <div>
      <h2>{list.title}</h2>
      <p>{list.description}</p>
      <ul>
        {list.locations.map((location) => (
          <li key={location._id}>
            <strong>{location.name}</strong> - {location.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleListComponent;