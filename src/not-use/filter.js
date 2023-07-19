import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Filter() {
  const url = 'http://localhost:4000/atracciones'

  const getAtracciones = async () => {
    const response = await axios.get(url);
    return response.data;
  };

  const [list, setList] = useState([]);
  const [caracteristica, setCaract] = useState('');

  useEffect(() => {
    getAtracciones().then(data => {
      setList(data);
    });
  }, []);

  const handleCaracteristica = (e) => {
    setCaract(e.target.id);
  };

  const filteredAtracciones = list.filter(card => card.caract === caracteristica);

  const content = filteredAtracciones.map(card => (
    <div className='container' key={card.id}>
      <div className='card'>
        <h3>{card.name}</h3>
      </div>
    </div>
  ));

  return (
    <div>
      <ul>
        <button onClick={handleCaracteristica} id='urbano' > URBANO</button>
        <li onClick={handleCaracteristica} id="natural">NATURAL</li>
      </ul>
      <div>
        {content}
      </div>
    </div>
  )
}

export default Filter;
