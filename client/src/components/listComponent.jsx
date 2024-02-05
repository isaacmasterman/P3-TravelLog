import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LISTS } from '../utils/queries';
import { CREATE_LIST } from '../utils/mutations';

const ListComponent = () => {
    const [newListTitle, setNewListTitle] = useState('');
    const { loading, data } = useQuery(GET_LISTS);
    const [createList] = useMutation(CREATE_LIST);
    const handleCreateList = async () => {
      await createList({ variables: { title: newListTitle } });
      setNewListTitle('');
    };
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        {data.lists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            {/* Display locations if any */}
          </div>
        ))}
        <input value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} />
        <button onClick={handleCreateList}>Create New List</button>
      </div>
    );
  };
  export default ListComponent;