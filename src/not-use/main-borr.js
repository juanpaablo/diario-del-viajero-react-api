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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Variable de estado para almacenar la tarjeta seleccionada

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
  }, [list, selectedOption]);

  const confirmarBorrado = (card) => {
    setSelectedCard(card); // Almacenar la tarjeta seleccionada en la variable de estado
    setShowConfirmation(true);
  };

  const borrarElemento = () => {
    if (selectedCard) {
      axios.delete(Url + "/" + selectedCard.id).then((response) => {
        if (response.status === 200) {
          alert(selectedCard.name + " se borró exitosamente");
          window.location.reload();
        }
      });
    }
  };

  const content = filteredList.map((card) => (
    <div className="container" key={card.id}>
      <div className="card" key={card.id}>
        <h3>{card.name}</h3>
        <h5>{card.caracteristica}</h5>
        <img alt="notFOUND" width="100%" src={card.img}></img>
        <p>{card.direccion}</p>
        <button onClick={() => confirmarBorrado(card)}>Borrar</button> {/* Pasar la tarjeta seleccionada como argumento */}
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
        <select
          id="filterSelect"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
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

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>¿Estás seguro de que deseas borrar?</p>
          <button onClick={borrarElemento}>Confirmar</button>
          <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Listado;
