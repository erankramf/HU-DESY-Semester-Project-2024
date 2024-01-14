import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TelescopesList.css';

interface Telescope {
  id: number;
  name: string;
  parameter: string;
  version: string;
  type: string;
  value:string;
  file: boolean; 
}

const TelescopesList: React.FC = () => {
  const [telescopes, setTelescopes] = useState<Telescope[]>([]);
  const [selectedTelescope, setSelectedTelescope] = useState<Telescope | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<Telescope[]>('http://localhost:8000/Telescopes/Names');
      setTelescopes(response.data);
    } catch (error) {
      console.error('Error NO DATA:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  const handleTelescopeClick = (telescope: Telescope) => {
    setSelectedTelescope(telescope);
  };

  return (
    <div>
      <h2>List of Telescopes</h2>
      <div className="telescope-list">
        {telescopes.map(telescope => (
          <div
            key={telescope.id}
            onClick={() => handleTelescopeClick(telescope)}
            className={`telescope-block ${selectedTelescope?.id === telescope.id ? 'telescope-selected' : ''}`}
          >
            {telescope.name}
          </div>
        ))}
      </div>

      {selectedTelescope && (
        <div>
          <h3>Selected telescope {selectedTelescope.name}</h3>         
        </div>
      )}
    </div>
  );
};

export default TelescopesList;