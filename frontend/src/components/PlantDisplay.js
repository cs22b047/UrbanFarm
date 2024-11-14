// PlantList.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import './PlantList.css'; // Optional CSS file for styling

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plant data when component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:8080/plants'); // Assuming your Node.js server is running on the same domain
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlants(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return <div class="w-12 h-12 rounded-full animate-spin
    border border-solid border-black mt-20 mb-[70vh] mx-auto border-t-transparent"></div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex mt-20 w-3/4">
      <h1></h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mx-20">
        {plants.map((plant) => (
          <div key={plant.id} className=" shadow-xl rounded-lg w-52 h-fit p-4">
            <img
              src={plant.image_url || 'https://via.placeholder.com/150'}
              alt={plant.common_name || 'Unknown Plant'}
              className="w-52 rounded-lg h-52 object-cover mx-auto"
            />
            <h2>{plant.common_name || 'Unknown Plant'}</h2>
            <p><strong>Scientific Name:</strong> {plant.scientific_name || 'N/A'}</p>
            <button className='px-2 w-full py-2 bg-green-500 text-black border-[1px] font-semibold rounded-lg hover:bg-green-400'>Growing instructions <FontAwesomeIcon className='px-1 w-3 my-auto' icon={faArrowRight}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantList;
