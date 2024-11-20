import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plant data when component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('https://urbanfarm.onrender.complants'); // Assuming your Node.js server is running on the same domain
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
    return (
      <div className="mt-20 w-fuxll">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
          Explore Our Plant Collection 🌱
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-10">

          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-52 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  return (
    <div className="mt-20 w-full">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
        Explore Our Plant Collection 🌱
      </h1>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={plant.image_url || 'https://via.placeholder.com/150'}
              alt={plant.common_name || 'Unknown Plant'}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {plant.common_name || 'Unknown Plant'}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Scientific Name:</strong> {plant.scientific_name || 'N/A'}
              </p>
              <button className="mt-4 w-full py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-400">
                Growing Instructions <FontAwesomeIcon className="ml-1" icon={faArrowRight} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantList;
