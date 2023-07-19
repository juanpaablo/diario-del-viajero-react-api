import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AtraccionDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getDetalles = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:4000/atracciones/${id}`);
        setDetalles(response.data[0]);
      } catch (error) {
        console.error("Error al obtener los detalles de la atracción:", error);
      }

      setIsLoading(false);
    };

    getDetalles();
  }, [id]);

  useEffect(() => {
    console.log(detalles);
  }, [detalles]);

  if (isLoading) {
    return <p>Cargando detalles...</p>;
  }

  return (
    <div>
      <h1>la atraccion numero {id} </h1>
      {detalles ? (
        <>
          <h1>Detalles de la atracción: {detalles.name}</h1>
          <h2>{detalles.name}</h2>
          <img src={detalles.img} alt="Imagen de la atracción" />
          <p>{detalles.direccion}</p>
          {console.log(detalles.name)}
        </>
      ) : (
        <p>No se encontraron detalles de la atracción.</p>
      )}
  
      <Link to="/">Volver a la lista de atracciones</Link>
    </div>
  );
};

export default AtraccionDetalles;
