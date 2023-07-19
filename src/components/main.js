import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "C:/Users/pablo/react/final-prog-mysql/src/styles/main.css";

function Listado() {
  const Url = "http://localhost:4000/atracciones";

  const GetList = async () => {
    const response = await axios.get(Url);
    return response;
  }

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    GetList().then((response) => {
      setList(response.data);
      setFilteredList(response.data);
    });
  }, []);

  useEffect(() => {
    const filtered = list.filter((item) => {
      if (selectedOption === "natural") {
        return item.caracteristica === "natural";
      } else if (selectedOption === "urbano") {
        return item.caracteristica === "urbano";
      } else {
        return true; // Si no se selecciona ninguna opción, mostrar todos los elementos
      }
    });
    setFilteredList(filtered);
    //estos arreglos se aseguran de que se actualice cada vez que haya cambio en esos estados
  }, [list, selectedOption]);
//aqui filteredlist ya tiene lo que quiero que se muestre, es decir solo las atracciones naturales o urbanas
  const content = filteredList.map((card) => (
    <div className="container" key={card.id}>
      <div className="card" key={card.id}>
        <h3>{card.name}</h3>
        <h5>{card.caracteristica}</h5>
        <img alt="notFOUND" width="100%" src={card.img}></img>
        <p>{card.direccion}</p>
        <button
          onClick={(del) => { 
            axios.delete(Url + "/" + card.id).then((response) => {
              if (response.status === 200) {
                alert(card.name + " se borró exitosamente");
                window.location.reload();
              }
            });
          }}
        >
          Borrar
        </button>
        <Link to={`/atracciones/${card.id}`}>
          <button>Mostrar atracción</button>
        </Link>
        <Link to={"/Edit"}>
          <button>Editar</button>
        </Link>
        <br></br>
      </div>
    </div>
    
  ));

  return (
    
    <div>
      <div>
  <label htmlFor="filterSelect">Filtrar por:</label>
  <select id="filterSelect" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
    <option value="">Todos</option>
    <option value="natural">Natural</option>
    <option value="urbano">Urbano</option>
  </select>
</div>
      <div>
        <Link to="/atraccion">
          <button>Agregar atracción</button>
        </Link>
        {content}
      </div>
    </div>
  );
}

export default Listado;
